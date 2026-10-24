"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounced } from "@/hooks/use-debounced";
import type { ProjectStatus } from "@/types/api";

const STATUS_OPTIONS: { value?: ProjectStatus; label: string }[] = [
  { value: undefined, label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export function ProjectFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  const currentStatus = sp.get("status") ?? "";
  const currentSearch = sp.get("search") ?? "";

  const [localSearch, setLocalSearch] = useState(currentSearch);
  const debouncedSearch = useDebounced(localSearch, 300);

  // Push debounced search into URL (skip if unchanged — avoids effect loops)
  useEffect(() => {
    const target = debouncedSearch.trim();
    if ((sp.get("search") ?? "") === target) return;

    const params = new URLSearchParams(sp.toString());
    if (target) params.set("search", target);
    else params.delete("search");
    params.set("page", "1");
    router.replace(`/mentor?${params.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, router]);

  const setStatus = (status?: ProjectStatus) => {
    const params = new URLSearchParams(sp.toString());
    if (status) params.set("status", status);
    else params.delete("status");
    params.set("page", "1");
    router.replace(`/mentor?${params.toString()}`);
  };

  const clearAll = () => {
    setLocalSearch("");
    router.replace("/mentor");
  };

  const hasFilters = !!currentStatus || !!currentSearch;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div
        role="tablist"
        aria-label="Filter by status"
        className="flex flex-wrap gap-1"
      >
        {STATUS_OPTIONS.map(({ value, label }) => {
          const isActive = (value ?? "") === currentStatus;
          return (
            <Button
              key={label}
              type="button"
              role="tab"
              aria-selected={isActive}
              size="sm"
              variant={isActive ? "default" : "ghost"}
              onClick={() => setStatus(value)}
            >
              {label}
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search name, description, student…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-8"
            aria-label="Search projects"
          />
        </div>
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAll}
            aria-label="Clear filters"
          >
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
