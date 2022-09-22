import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import Link from 'next/link'

const Scanner: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState<Html5Qrcode>()

  function onScanSuccess(result: any) {
    console.log(result)
  }

  function onScanFailure(error: any) {
    if (error.includes('No MultiFormat Readers were able to detect the code')) return
    console.warn(`Code scan error = ${error}`)
  }

  useEffect(() => {
    if (!previewRef.current) return
    const scanner = new Html5Qrcode(previewRef.current.id)
    setHtml5QrcodeScanner(scanner)
    const didStart = scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10 },
        (_, { result }) => {
          onScanSuccess(result)
        },
        (_, error) => {
          onScanFailure(error)
        }
      )
      .then(() => true)
    return () => {
      didStart
        .then(() => scanner.stop())
        .catch(() => {
          console.log('Error stopping scanner')
        })
    }
  }, [previewRef])

  return (
    <div>
      <div className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        <div
          id="preview"
          ref={previewRef}
        >
        </div>
        <Link href={'/'}>
          <a>Go to Home</a>
        </Link>
      </div>
    </div>
  )
}

export default Scanner
