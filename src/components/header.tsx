import React from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Header({
  showAnchor = false,
}: {
  showAnchor?: boolean;
}) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/" id="anchor">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2rem"
          height="1.2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 16h9v5H3zm-1-6h6v5H2zm7 0h6v5H9zm7 0h6v5h-6zm-3 6h8v5h-8zM3 4h8v5H3zm9 0h9v5h-9z"
          />
        </svg>
        <span className="ml-1.5 text-lg font-bold text-stone-800">
          PaywallSkip
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 text-stone-700"
          href="/posts/how-it-works"
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 text-stone-700"
          href="/blacklist"
        >
          Blacklist
        </Link>
      </nav>
      {showAnchor && (
        <a
          href="#anchor"
          className="fixed bottom-2 right-2 bg-stone-800 text-white p-0.5 rounded-full"
        >
          <ArrowUp size={16} />
          <span className="sr-only">Scroll to top</span>
        </a>
      )}
    </header>
  );
}
