import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { trpc } from "../../../utils/trpc"

const ItemPageContent: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const { data } = trpc.useQuery(['items.get-by-id', { id }])
  const { mutate, isLoading } = trpc.useMutation('items.delete', {
    onSuccess: () => {
      router.replace('/inventory')
    }
  })

  if (!data || !data?.name) {
    return <div>Item not found</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        {data.id}
      </div>
      <div className="h-2" />
      <div>
        {data.name}
      </div>
      <div className="h-2" />
      <button type="button" disabled={isLoading} onClick={() => {
        if (!isLoading) {
          mutate({ id: data.id })
        }
      }} className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        {isLoading ? 'Deleting' : 'Delete'}
      </button>
      <div className="h-2" />
      <Link href='/inventory'>
        <a type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Go back
        </a>
      </Link>
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