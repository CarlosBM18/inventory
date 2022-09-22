import { useRouter } from "next/router"
import { useRef } from "react"
import { trpc } from "../../utils/trpc"

const NewItem = () => {
  const inputNameRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { mutate, isLoading } = trpc.useMutation("item.create", {
    onSuccess: () => {
      router.replace("/inventory")
    }
  })

  async function onSubmit() {
    mutate({ name: inputNameRef.current?.value || "" })
  }

  return (
    <div className="p-4">
      <div className="text-2xl font-bold">
        NewItem
      </div>
      <div className="my-2 xl:w-96">
        <input
          type="text"
          className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleFormControlInput1"
          placeholder="Name"
          ref={inputNameRef}
        />

      </div>
      <div className="pt-2" >
        <button onClick={onSubmit} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Create
        </button>
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  )
}
export default NewItem