import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Welcome to Stroke Prediction</h1>
      <p>
        This application helps predict the risk of stroke based on medical data.
        Navigate to the &quot;Prediction&quot; page to get started.
      </p>
      <div className='mt-8'>
        <Image
          width={200}
          height={200}
          src='/amba.jpg'
          alt='Stroke Icon'
          className='w-48 mx-auto'
        />
      </div>
    </div>
  );
}
