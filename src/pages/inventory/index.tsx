import { Item } from "@prisma/client"
import Link from "next/link"
import { HTMLAttributeAnchorTarget, useRef, useState } from "react"
import { trpc } from "../../utils/trpc"
// import QRCode from 'qrcode'

const Inventory: React.FC = () => {
  const { data } = trpc.useQuery(['items.get-all'])

  return (
    <div className="flex flex-col p-2">
      <div>Inventory</div>
      {data?.map((item) =>
        <Item key={item.id} {...item} />) ?? <div>Loading</div>}
      <div className="flex flex-center">
        <Link href='/inventory/new'>
          <a type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Add new item
          </a>
        </Link>
      </div>
    </div>
  )
}

const Item = (props: Item) => {
  const { mutate, isLoading } = trpc.useMutation('items.download-qr-code', {
    onSuccess: (data) => {
      console.log('data?', data)
      setDownloadName(`${props.name}.png`)
      setHref(data)
    }
  })
  const [href, setHref] = useState('#')
  const [downloadName, setDownloadName] = useState('')

  return (
    <div className="flex flex-row">
      {props.name}
      {!downloadName ? <button onClick={() => {
        mutate(props)
      }}>
        Generate
        {isLoading && <div>Loading</div>}
      </button> :
        <a href={href} download={downloadName}>
          <DownloadIcon />
        </a>}
    </div>
  )
}

const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


export default Inventory