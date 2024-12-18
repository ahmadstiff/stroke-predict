import { Providers } from '@/components/provider/providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Stroke Prediction App',
  description: 'Predict stroke risk using a machine learning model',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className='flex-1 min-h-screen'>
            <Navbar />
            <main className='bg-background'>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
