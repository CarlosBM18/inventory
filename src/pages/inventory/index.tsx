import Link from "next/link"

const Inventory: React.FC = () => {
  return (
    <div>
      <div>Inventory</div>
      <div className="flex space-x-2 justify-center">
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