import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const subscriptions = [
  { name: 'The New York Times', price: 17 },
  { name: 'The Wall Street Journal', price: 39 },
  { name: 'The Washington Post', price: 10 },
  { name: 'The Economist', price: 19 },
  { name: 'Financial Times', price: 39 },
  { name: 'Paywall Skip', price: 0 },
];

export default function PricingComparisonSection() {
  return (
    <section className='py-12 bg-stone-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-8'>
          Pricing Comparison
        </h2>
        <p className='text-center mb-8 max-w-2xl mx-auto text-stone-600'>
          Quality journalism comes at a price, but access to information
          shouldn't break the bank. Compare the monthly subscription costs of
          top news sites with our free Paywall Skip service.
        </p>

        <div className='max-w-2xl mx-auto'>
          <Table>
            <TableCaption>
              Monthly subscription prices as of August 2024. Prices may vary
              based on promotions and regions.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[250px]'>News Site</TableHead>
                <TableHead className='text-right'>
                  Monthly Price (USD)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow
                  key={sub.name}
                  className={sub.name === 'Paywall Skip' ? 'bg-green-50' : ''}
                >
                  <TableCell className='font-medium'>
                    {sub.name}
                    {sub.name === 'Paywall Skip' && (
                      <Badge className='ml-2 bg-stone-800 rounded-md'>
                        Free
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {sub.price === 0 ? (
                      <span className='font-bold text-green-600'>$0.00</span>
                    ) : (
                      `$${sub.price.toFixed(2)}`
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-sm text-stone-500'>
            Paywall Skip provides access to articles from various sources
            without individual subscriptions. However, we encourage supporting
            quality journalism when possible.
          </p>
        </div>
      </div>
    </section>
  );
}
