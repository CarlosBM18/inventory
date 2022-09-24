import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inventory Scanner</title>
        <meta name="description" content="Inventory Scanner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="font-bold text-2xl mb-4">Inventory Software</h1>
        <h2 className="font-medium text-l mb-4">Scan, link, visualize and more...</h2>
        <Link href='/inventory'>
          <a className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Go to Inventory</a>
        </Link>
        <div className="h-2" />
        <Link href='/scanner'>
          <a className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Go to Scanner</a>
        </Link>
      </main>
    </>
  )
}

export default Home
