export type Role = "STUDENT" | "MENTOR" | "ADMIN";
export type ProjectStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  repoUrl: string;
  liveLink: string | null;
  description: string;
  status: ProjectStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  reviewedById: string | null;
  studentId: string;
  createdAt: string;
  updatedAt: string;
  student?: { id: string; name: string; email: string };
  reviewedBy?: { id: string; name: string } | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ path: string; message: string }>;
  };
}

export interface StatsResponse {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}
