'use client';

import Link from 'next/link';
import { FiHome, FiActivity, FiX, FiMenu } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // State untuk kontrol lebar navbar
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Home', href: '/', icon: <FiHome /> },
    { name: 'Prediction', href: '/prediction', icon: <FiActivity /> },
  ];

  const handleClick = (href: string) => {
    router.push(href);
    setIsActive(!isActive);
  };

  return (
    <nav
      className={`m-5 w-16 fixed top-0 right-0 rounded-2xl bg-green-900 text-white flex flex-col items-center py-4 transition-all duration-300 ${isActive ? 'w-40' : 'w-16'}`}
    >
      <button
        className='text-xl focus:outline-none' // Fokus tombol untuk kebaruan tampilan
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? <FiX className='text-green-100 mb-4' /> : <FiMenu className='text-green-100' />}
      </button>
      <ul
        className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${isActive ? 'block' : 'hidden'}`}
      >
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-800 relative ${pathname === item.href ? 'bg-green-800' : ''}`}
            onClick={() => handleClick(item.href)}
          >
            {item.icon}
            <Link href={item.href} className='hidden sm:block text-green-100'>
              {item.name}
            </Link>
            <div
              className={`absolute top-0 left-0 w-full h-full bg-green-800 opacity-0 hover:opacity-10 transition-all duration-300`}></div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
