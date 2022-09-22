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
        <Link href={'/inventory'}>
          <a>Go to Inventory</a>
        </Link>
        <Link href={'/scanner'}>
          <a>Go to Scanner</a>
        </Link>
      </main>
    </>
  )
}

export default Home
