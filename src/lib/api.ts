import { getToken, clearToken } from "./auth-storage";
import type { ApiErrorBody, ApiSuccess, PaginationMeta } from "@/types/api";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
const UNAUTHORIZED_EVENT = "auth:unauthorized";
const DEFAULT_TIMEOUT_MS = 15_000;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: Array<{ path: string; message: string }>;

  constructor(
    status: number,
    code: string,
    message: string,
    details?: Array<{ path: string; message: string }>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  isValidationError(): boolean {
    return this.code === "BAD_REQUEST" && !!this.details?.length;
  }
}

export function onUnauthorized(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(UNAUTHORIZED_EVENT, handler);
  return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler);
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  skipAuth?: boolean;
}

const AUTH_PATHS_EXEMPT_FROM_AUTO_LOGOUT = ["/auth/login", "/auth/register"];

async function request<T>(
  path: string,
  opts: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  const { body, skipAuth, headers, ...rest } = opts;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (!skipAuth) {
    const token = getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError(
        0,
        "TIMEOUT",
        "Request timed out. Check your connection.",
      );
    }
    throw new ApiError(
      0,
      "NETWORK_ERROR",
      "Cannot reach the server. Is the backend running?",
    );
  }
  clearTimeout(timeoutId);

  let payload: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      // Non-JSON response (e.g. HTML error page from proxy)
    }
  }

  if (!response.ok) {
    const shouldAutoLogout =
      response.status === 401 &&
      !AUTH_PATHS_EXEMPT_FROM_AUTO_LOGOUT.some((p) => path.startsWith(p));

    if (shouldAutoLogout) {
      clearToken();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    const errPayload = payload as ApiErrorBody | null;
    throw new ApiError(
      response.status,
      errPayload?.error?.code ?? "UNKNOWN",
      errPayload?.error?.message ?? `Request failed (${response.status})`,
      errPayload?.error?.details,
    );
  }

  return payload as ApiSuccess<T>;
}

export async function fetchApi<T>(
  path: string,
  opts?: RequestOptions,
): Promise<T> {
  const res = await request<T>(path, opts);
  return res.data;
}

export async function fetchApiPaginated<T>(
  path: string,
  opts?: RequestOptions,
): Promise<{ data: T; meta: PaginationMeta }> {
  const res = await request<T>(path, opts);
  return {
    data: res.data,
    meta: res.meta ?? {
      page: 1,
      limit: 0,
      total: 0,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };
}
