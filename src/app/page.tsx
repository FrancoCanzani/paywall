'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaywallSkipper() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url) {
      router.push(`/article?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-stone-50'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link className='flex items-center justify-center' href='#'>
          <BookOpen className='h-6 w-6 text-stone-800' />
          <span className='ml-2 text-lg font-bold text-stone-800'>
            PaywallSkipper
          </span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 text-stone-700'
            href='#'
          >
            How It Works
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 text-stone-700'
            href='#'
          >
            Pricing
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 text-stone-700'
            href='#'
          >
            About
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
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
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-stone-100'>
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
                  How does PaywallSkipper work?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  PaywallSkipper uses advanced techniques to bypass paywalls on
                  news websites and academic journals. Simply paste the URL of
                  the article you want to read, and our system will attempt to
                  retrieve the full content for you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='text-left text-stone-800'>
                  Is using PaywallSkipper legal?
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
                  Which websites does PaywallSkipper support?
                </AccordionTrigger>
                <AccordionContent className='text-stone-600'>
                  PaywallSkipper supports a wide range of popular news websites
                  and academic journals. However, due to the constantly changing
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
                  Free accounts have a daily limit of 5 articles. For unlimited
                  access, consider upgrading to our premium plan. This helps us
                  maintain the service and improve our bypassing techniques.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-stone-300'>
        <p className='text-xs text-stone-500'>
          © {new Date().getFullYear()} PaywallSkipper. All rights reserved.
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
