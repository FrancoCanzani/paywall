'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Clipboard, ClipboardCheck, ClipboardX } from 'lucide-react';
import { copyToClipboard } from '@/lib/helpers/copy-to-clipboard';

export default function LandingFormSection() {
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
    <>
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
            <span className='sr-only'>Copy</span>
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
    </>
  );
}
