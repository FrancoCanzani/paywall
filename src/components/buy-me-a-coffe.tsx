import Image from 'next/image';

export default function BuyMeACoffee() {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://buymeacoffee.com/francocanzani'
      title='Buy me a coffe'
      className='fixed right-0 z-50 bottom-0 text-xs uppercase bg-yellow-100 p-2 rounded-tl-md shadow-md hover:bg-yellow-50 transition-colors duration-300'
    >
      <Image
        height={20}
        width={20}
        alt='Buy me a coffe'
        src={'/buy-me-a-coffee.png'}
      />
    </a>
  );
}
