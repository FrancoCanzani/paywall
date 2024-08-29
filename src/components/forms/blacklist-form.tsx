"use client";

import { addToBlacklist } from "@/lib/actions";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function BlacklistForm({ url }: { url: string }) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    toast.promise(addToBlacklist(url), {
      loading: "Loading...",
      success: (data) => {
        return `${new URL(url).hostname} has been added`;
      },
      error: "Error adding to blacklist",
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <button className="hover:underline">Add to blacklist</button>
    </form>
  );
}
