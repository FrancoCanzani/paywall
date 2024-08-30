import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/header';
import LandingFormSection from '@/components/landing-form-section';
import BuyMeACoffe from '@/components/buy-me-a-coffe';
import PricingComparisonSection from '@/components/pricing-comparison-section';
import { getTotalSuccessRate } from '@/lib/helpers/success-rate';
import { Badge } from '@/components/ui/badge';

export default async function PaywallSkip() {
  const { totalSuccesses, totalFailures, successRate } =
    await getTotalSuccessRate();

  return (
    <div className='flex flex-col min-h-screen bg-stone-50'>
      <Header />
      <BuyMeACoffe />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-28 xl:py-36'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-8 text-center'>
              <Badge className=''>{successRate}% Success Rate</Badge>
              <div className='space-y-4'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-stone-800'>
                  Skip Paywalls, Access Knowledge
                </h1>
                <p className='mx-auto max-w-[700px] text-stone-600 md:text-xl'>
                  Unlock articles behind paywalls and access the information you
                  need. Fast, easy, and reliable.
                </p>
              </div>
              <LandingFormSection />
            </div>
          </div>
        </section>
        <PricingComparisonSection />
        <section className='w-full py-12 md:py-24 lg:py-32 bg-stone-50'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-2xl font-bold text-center mb-8 text-stone-800'>
              Frequently Asked Questions
            </h2>
            <Accordion
              type='single'
              collapsible
              className='w-full max-w-3xl mx-auto'
            >
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-left text-stone-800'>
                  How does PaywallSkip work?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  PaywallSkip uses advanced techniques to bypass paywalls on
                  news websites and academic journals. Simply paste the URL of
                  the article you want to read, and our system will attempt to
                  retrieve the full content for you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='text-left text-stone-800'>
                  Is using PaywallSkip legal?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  The legality of paywall bypassing is a stone area and can vary
                  by jurisdiction. We recommend using our service for personal,
                  non-commercial use only. Always consider supporting publishers
                  when possible.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger className='text-left text-stone-800'>
                  Which websites does PaywallSkip support?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  PaywallSkip supports a wide range of popular news websites and
                  academic journals. However, due to the constantly changing
                  nature of paywalls, we can&apos;t guarantee access to every
                  site. Check our updated list of supported websites for more
                  details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger className='text-left text-stone-800'>
                  Is my browsing data kept private?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  Yes, we take your privacy seriously. We do not store the URLs
                  or content of the articles you access. Our servers act as a
                  proxy to retrieve the content, and no personal data is
                  retained after your session.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-5'>
                <AccordionTrigger className='text-left text-stone-800'>
                  Are there any usage limits?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  Ip adresses have a daily limit of 50 articles to avoid bot
                  spam and atacks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-stone-300'>
        <p className='text-xs text-stone-500'>
          © {new Date().getFullYear()} PaywallSkip. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-xs hover:underline underline-offset-4 text-stone-500'
            href='#'
          >
            Terms of Service
          </Link>
          <Link
            className='text-xs hover:underline underline-offset-4 text-stone-500'
            href='#'
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
