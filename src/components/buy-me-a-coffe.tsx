import React from 'react';

export default function BuyMeACoffee() {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://buymeacoffee.com/francocanzani'
      className='fixed right-0 top-1/2 text-xs uppercase -translate-y-1/2 bg-yellow-400 py-2 px-1 rounded-l-md shadow-md hover:bg-yellow-300 transition-colors duration-300'
      style={{
        writingMode: 'vertical-lr',
        textOrientation: 'upright',
      }}
    >
      ☕ Support
    </a>
  );
}
