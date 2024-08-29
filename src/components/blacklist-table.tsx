import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlacklistItem } from "@/lib/types";

export default function BlacklistTable({
  initialBlacklist,
}: {
  initialBlacklist: BlacklistItem[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date Added</TableHead>
          <TableHead>Hostname</TableHead>
          <TableHead>Full URL</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialBlacklist.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
            <TableCell>{item.hostname}</TableCell>
            <TableCell className="max-w-xs truncate" title={item.full_url}>
              {item.full_url}
            </TableCell>
            <TableCell>{item.works ? "Working" : "Not Working"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
