import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <BookOpen className="h-6 w-6 text-stone-800" />
        <span className="ml-2 text-lg font-bold text-stone-800">
          PaywallSkip
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 text-stone-700"
          href="#"
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 text-stone-700"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 text-stone-700"
          href="/blacklist"
        >
          Blacklist
        </Link>
      </nav>
    </header>
  );
}
