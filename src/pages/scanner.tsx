import Head from "next/head"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useRef, useState } from "react"

let scanner: Html5QrcodeScanner

const Scanner: React.FC = () => {
  const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState<Html5QrcodeScanner>()
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>()

  function onScanSuccess(decodedText: any, decodedResult: any) {
    console.log(`Code matched = ${decodedText}`, decodedResult)
    if (html5QrcodeScanner?.getState() === 2) {
      html5QrcodeScanner.pause()
      setPaused(true)
    }
  }

  function onScanFailure(error: any) {
    if (error.includes('No MultiFormat Readers were able to detect the code')) return
    console.warn(`Code scan error = ${error}`)
  }

  function toggleScanner() {
    setOpen(prevState => !prevState)
  }

  function startScanning() {
    toggleScanner()
    const scanner = new Html5QrcodeScanner("reader-qrcode", { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [] }, false)
    scanner.render(onScanSuccess, onScanFailure)
    setTimeout(() => {
      scanner.clear
    }, 5000)
  }

  useEffect(() => {
    scanner = new Html5QrcodeScanner("reader-qrcode", { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [] }, false)
    scanner.render(onScanSuccess, onScanFailure)
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
        {!open && <button onClick={startScanning}>Start scanning</button>}
        {/* {open && <button onClick={toggleScanner}>End scanning</button>} */}
        <div id="reader-qrcode" className="w-96"></div>
        {/* {paused && <button onClick={onClick}>Resume</button>} */}
      </div>
    </>
  )
}

export default Scanner

// import { useEffect, useRef, useState } from 'react'
// import { Html5Qrcode } from 'html5-qrcode'
// import Link from 'next/link'

// const Scanner: React.FC = () => {
//   const previewRef = useRef<HTMLDivElement>(null)
//   const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState<Html5Qrcode>()

//   function onScanSuccess(result: any) {
//     console.log(result)
//   }

//   function onScanFailure(error: any) {
//     if (error.includes('No MultiFormat Readers were able to detect the code')) return
//     console.warn(`Code scan error = ${error}`)
//   }

//   useEffect(() => {
//     if (!previewRef.current) return
//     const scanner = new Html5Qrcode(previewRef.current.id)
//     setHtml5QrcodeScanner(scanner)
//     const didStart = scanner
//       .start(
//         { facingMode: 'environment' },
//         { fps: 10 },
//         (_, { result }) => {
//           onScanSuccess(result)
//         },
//         (_, error) => {
//           onScanFailure(error)
//         }
//       )
//       .then(() => true)
//     return () => {
//       didStart
//         .then(() => scanner.stop())
//         .catch(() => {
//           console.log('Error stopping scanner')
//         })
//     }
//   }, [previewRef])

//   return (
//     <div>
//       <div className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
//         <div
//           id="preview"
//           ref={previewRef}
//         >
//         </div>
//         <Link href={'/'}>
//           <a>Go to Home</a>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Scanner
