import Head from "next/head"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Item } from "@prisma/client"

let scanner: Html5QrcodeScanner

const Scanner: React.FC = () => {
  const router = useRouter()
  const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState<Html5QrcodeScanner>()
  const [paused, setPaused] = useState(false)

  function onScanSuccess(decodedText: string) {
    console.log(`Code matched = ${decodedText}`)
    if (html5QrcodeScanner?.getState() === 2) {
      html5QrcodeScanner.pause()
      setPaused(true)
    }
    const data = JSON.parse(decodedText) as Item
    router.push(`/inventory/item/${data.id}`)
  }

  function onScanFailure(error: string) {
    if (error.includes('No MultiFormat Readers were able to detect the code')) return
    console.warn(`Code scan error = ${error}`)
  }

  useEffect(() => {
    scanner = new Html5QrcodeScanner("reader-qrcode", { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [] }, false)
    scanner.render(onScanSuccess, onScanFailure)
    setHtml5QrcodeScanner(scanner)
    return () => {
      scanner.clear()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Scanner</title>
        <meta name="description" content="Scanner page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div id="reader-qrcode" className="w-96"></div>
        {paused && <button onClick={() => {
          html5QrcodeScanner?.resume()
          setPaused(false)
        }}>Resume</button>}
        <div className="h-2" />
        <Link href='/'>
          <a type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
            Go back
          </a>
        </Link>
      </div>
    </>
  )
}

export default Scanner
