"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function BlacklistTablePagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8 text-slate-500 text-sm">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)} className="hover:underline">
          Previous
        </Link>
      )}
      <span className="font-medium">
        Page {currentPage}/{totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)} className="hover:underline">
          Next
        </Link>
      )}
    </div>
  );
}
