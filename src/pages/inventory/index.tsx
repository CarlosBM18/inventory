import Link from "next/link"
import { trpc } from "../../utils/trpc"

const Inventory: React.FC = () => {
  const { data } = trpc.useQuery(['items.get-all'])

  return (
    <div className="flex flex-col p-2">
      <div>Inventory</div>
      {data?.map((item) => <div key={item.id}>{item.name}</div>) ?? <div>Loading</div>}
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

export default Inventory