import Head from "next/head"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

let scanner: Html5QrcodeScanner

const Scanner: React.FC = () => {
  const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState<Html5QrcodeScanner>()
  const [paused, setPaused] = useState(false)

  function onScanSuccess(decodedText: string) {
    console.log(`Code matched = ${decodedText}`)
    if (html5QrcodeScanner?.getState() === 2) {
      html5QrcodeScanner.pause()
      setPaused(true)
    }
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
      </div>
    </>
  )
}

export default Scanner
