import Header from "@/components/header";
import BlacklistTable from "@/components/blacklist-table";
import { sql } from "@vercel/postgres";
import { BlacklistItem } from "@/lib/types";

const ITEMS_PER_PAGE = 20;

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { rows: blacklistItems } = await sql<BlacklistItem>`
    SELECT * FROM blacklist
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset};
  `;

  const { rows: totalCountResult } = await sql`
    SELECT COUNT(*) as total FROM blacklist;
  `;

  const totalItems = totalCountResult[0].total;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Blacklisted Websites</h1>

        <div
          className="bg-yellow-50/75 border-l-2 border-yellow-300 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">What is the blacklist?</p>
          <p>
            The blacklist is a collection of websites where our Paywall Skipper
            is currently unable to bypass the paywall. We continuously work on
            improving our service, but these sites have implemented measures
            that prevent us from accessing their content.
          </p>
        </div>
        <BlacklistTable initialBlacklist={blacklistItems} />
      </div>
    </div>
  );
}
