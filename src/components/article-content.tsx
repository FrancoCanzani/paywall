import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { Link } from 'lucide-react';
import { getArticleContent } from '@/lib/helpers/get-article';
import BlacklistForm from './forms/blacklist-form';

interface Article {
  title: string;
  content: string;
  byline: string | null;
}

interface ArticleResult {
  article?: Article;
  error?: string;
}

export default async function ArticleContent({ url }: { url: string }) {
  const result = await getArticleContent(url);

  if (result.error) {
    if (result.error.includes('Rate limit exceeded')) {
      return (
        <div className='max-w-3xl mx-auto text-center font-medium w-full px-4 py-8 space-y-3'>
          <p className='text-xl text-red-600'>Rate Limit Exceeded</p>
          <p>
            Sorry, you&lsquo;ve reached the maximum number of articles you can
            read today.
          </p>
          <p className='text-sm text-stone-600'>
            Please try again later or consider upgrading your account for
            unlimited access.
          </p>
        </div>
      );
    }
    return (
      <div className='max-w-3xl mx-auto text-center font-medium w-full px-4 py-8 space-y-3'>
        <p>
          Sorry, it looks like we couldn&lsquo;t skip {new URL(url).hostname}
          &lsquo;s paywall.
        </p>
        <span>Error: {result.error}</span>
        <BlacklistForm url={url} />
      </div>
    );
  }

  if (!result.article) {
    return (
      <div className='max-w-3xl mx-auto text-center font-medium w-full px-4 py-8 space-y-3'>
        <p>No article content available</p>
        <BlacklistForm url={url} />
      </div>
    );
  }

  const { article } = result;

  return (
    <>
      <div className='max-w-3xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>{article.title}</h1>
        {article.byline && (
          <p className='text-stone-600 mb-2'>{article.byline}</p>
        )}
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-stone-500 mb-2 flex items-center justify-start gap-x-1.5'
        >
          <Link size={14} />
          <span className='hover:underline'>{new URL(url).hostname}</span>
        </a>
        <article
          className='prose prose-img:rounded-sm'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
        />
      </div>
    </>
  );
}
