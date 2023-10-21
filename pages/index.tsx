import { Inter } from 'next/font/google';

import Head from 'next/head';

import HomePage from '@/pages/api/home';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`${inter.className}`}>
        <Head>
          <title>Lime Companion</title>
        </Head>
        <HomePage />
    </main>
  )
}
