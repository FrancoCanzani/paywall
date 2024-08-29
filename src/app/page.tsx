'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/header';
import { Clipboard, ClipboardCheck, ClipboardX } from 'lucide-react';
import { copyToClipboard } from '@/lib/helpers/copy-to-clipboard';
import BuyMeACoffe from '@/components/buy-me-a-coffe';
import PricingComparisonSection from '@/components/pricing-comparison-section';

export default function PaywallSkip() {
  const [url, setUrl] = useState('');
  const [copyStatus, setCopyStatus] = useState('idle');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url) {
      router.push(`/article?url=${encodeURIComponent(url)}`);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const success = await copyToClipboard(
        `www.paywallskip.com/article?url=${url}`
      );
      if (success) {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } else {
        throw new Error('Copy failed');
      }
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-stone-50'>
      <Header />
      <BuyMeACoffe />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-28 xl:py-36'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-8 text-center'>
              <div className='space-y-4'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-stone-800'>
                  Skip Paywalls, Access Knowledge
                </h1>
                <p className='mx-auto max-w-[700px] text-stone-600 md:text-xl'>
                  Unlock articles behind paywalls and access the information you
                  need. Fast, easy, and reliable.
                </p>
              </div>
              <div className='w-full max-w-lg space-y-2'>
                <form onSubmit={handleSubmit} className='w-full'>
                  <div className='flex'>
                    <Input
                      className='flex-grow rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                      required
                      placeholder='Enter article URL'
                      type='url'
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button
                      className='rounded-l-none bg-stone-800 text-white hover:bg-stone-700'
                      type='submit'
                    >
                      Skip Paywall
                    </Button>
                  </div>
                </form>
              </div>
              <div className='flex flex-col gap-y-4 max-w-sm'>
                <span className='italic text-stone-500'>- or -</span>
                <div className='flex items-center justify-center gap-x-0.5'>
                  <span
                    onClick={handleCopyToClipboard}
                    className='bg-stone-800 cursor-pointer hover:bg-stone-700 rounded-l-md h-8 truncate px-2.5 py-1 text-stone-200'
                  >
                    www.paywallskip.com/article?url=
                    {url ? url : <span className='font-medium'>your url</span>}
                  </span>
                  <button
                    onClick={handleCopyToClipboard}
                    className='px-2.5 py-0.5 h-8 bg-stone-800 hover:bg-stone-700 text-white rounded-r-md transition-colors'
                  >
                    {copyStatus === 'copied' ? (
                      <ClipboardCheck size={16} />
                    ) : copyStatus === 'error' ? (
                      <ClipboardX size={16} />
                    ) : (
                      <Clipboard size={16} />
                    )}
                  </button>
                </div>
              </div>
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
