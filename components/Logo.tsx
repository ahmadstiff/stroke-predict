import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
      <Image
        src='/logo.png'
        alt='Logo'
        width={60}
        height={51}
        className='rounded-lg'
      />
    </Link>
  );
}
