"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: (failureCount, err) => {
              if (
                err instanceof ApiError &&
                err.status >= 400 &&
                err.status < 500
              ) {
                return false;
              }
              return failureCount < 1;
            },
          },
          mutations: {
            onError: (err) => {
              if (err instanceof ApiError) {
                if (err.status === 401) return; // handled by auth provider
                toast.error(err.message);
              } else {
                toast.error("Something went wrong. Please try again.");
              }
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
