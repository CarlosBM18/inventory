import { Item } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { trpc } from "../../utils/trpc"

const Inventory: React.FC = () => {
  const { data, isLoading } = trpc.useQuery(['items.get-all'])

  if (isLoading || !data) return null

  return (

    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">Inventory</div>
        <div className="flex flex-center py-4">
          <Link href='/'>
            <a type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              Go back
            </a>
          </Link>
          <div className="w-2" />
          <Link href='/inventory/new'>
            <a type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Add new item
            </a>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    ID
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) =>
                  <Item key={item.id} {...item} />) ?? <div>Loading</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Item = (props: Item) => {
  const router = useRouter()
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
    <tr className="border-b hover:bg-slate-100 cursor-pointer" onClick={() => { router.push(`/inventory/item/${props.id}`) }}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.id}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {props.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {!downloadName ?
          <button className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              mutate(props)
            }}
          >
            {!isLoading ? <div>Generate code</div> : <div>Generating</div>}
          </button> :
          <div className=" border-blue-600 text-blue-600 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" >
            <a href={href} download={downloadName} onClick={(e) => {
              e.stopPropagation()
            }}>
              <DownloadIcon />
            </a>
          </div>
        }
      </td>
    </tr>

  )
}

const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


export default Inventory