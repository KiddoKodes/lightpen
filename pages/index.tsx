import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Head>
        <title>Light Pen</title>
      </Head>
      <Header />
      <div className="flex  justify-between p-5 max-w-7xl mx-auto items-center shadow-md shadow-slate-300 py-8">
        <div className="px-10 space-y-5">
          <h1 className="text-5xl max-w-xl"><span className="text-yellow-400 underline">Light Pen</span> is a place for you and other folks to write,read and connect </h1>
          <h2>It's easy and free to post your thinking on any topic and connect with millions of readers</h2>
        </div>

        <div>
          <img src="/thunder.png" alt="LP" className="hidden  md:inline-flex h-36 w-56 lg:h-full" />
        </div>
      </div>
    </div>
  )
}

export default Home
