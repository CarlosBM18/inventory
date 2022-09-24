import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { trpc } from "../../../utils/trpc"

const ItemPageContent: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const { data, isLoading: loadingData } = trpc.useQuery(['items.get-by-id', { id }])
  const { mutate, isLoading } = trpc.useMutation('items.delete', {
    onSuccess: () => {
      router.replace('/inventory')
    }
  })

  if (loadingData) {
    return <div>Loading...</div>
  }

  if (!data || !data?.name) {
    return <div>Item not found</div>
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{data.name}</h5>
        <p className="text-gray-700 text-base mb-4">
          ID: {data.id}
        </p>
        <button type="button" disabled={isLoading} onClick={() => {
          if (!isLoading) {
            mutate({ id: data.id })
          }
        }}
          className="inline-block px-6 py-2 mr-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          {isLoading ? 'Deleting' : 'Delete'}
        </button>
        <Link href='/inventory'>
          <a type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
            Go back
          </a>
        </Link>
      </div>
    </div>
  )
}

const ItemPage = () => {
  const { query } = useRouter()
  const { id } = query

  if (!id || typeof id !== "string") {
    return <div>No ID</div>
  }

  return <ItemPageContent id={id} />
}

export default ItemPage