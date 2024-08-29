import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BlacklistItem } from '@/lib/types';

export default function BlacklistTable({
  initialBlacklist,
}: {
  initialBlacklist: BlacklistItem[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Hostname</TableHead>
          <TableHead>Full URL</TableHead>
          <TableHead className='hidden md:block'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialBlacklist.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <a
                className='hover:underline'
                target='_blank'
                href={item.hostname}
              >
                {item.hostname}
              </a>
            </TableCell>
            <TableCell
              className='max-w-xs truncate hover:underline'
              title={item.full_url}
            >
              <a target='_blank' href={item.full_url}>
                {item.full_url}
              </a>{' '}
            </TableCell>
            <TableCell className='hidden md:block'>
              {item.works ? 'Working' : 'Not Working'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
