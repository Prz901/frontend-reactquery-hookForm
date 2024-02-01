import { IoMdClose } from "react-icons/io";



import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type ModalProps = {
  open: boolean;
  modalTitle: string;
  onClose: () => void;
  idProduct: string;
}


export function ModalDelete({ open, modalTitle, onClose, idProduct }: ModalProps) {
  const queryClient = useQueryClient()


  // Funções de useMutation do React Query serve para requsições do tipo Post, Put, Patch,Delete
  const { mutateAsync: deleteMutateFn } = useMutation({
    mutationFn: deleteProduct,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(['products'])

      queryClient.setQueryData(['products'], (data: any) => {
        const result = data.filter((element: any) => {
          return element.id !== idProduct
        })
        return result
      })

    }
  })

  async function deleteProduct(id: string) {
    const result = await axios.delete(`http://localhost:3000/products/${id}`)
  }

  function handleConfirm() {
    deleteMutateFn(idProduct)
    onClose()
  }


  return (
    <>
      {
        open &&
        <div className="w-1/2 h-[300px] bg-zinc-200 z-50 fixed top-[20vh] right-0 left-[50vh] overflow-y-auto overflow-x-hidden text-black rounded-lg">
          <div className="p-10 flex items-center justify-between flex-col w-full h-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl">{modalTitle}  </span>
              <IoMdClose size={28} onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="w-full flex items-center justify-end" >
              <button className="w-1/3 bg-red-500 rounded-sm p-3 font mr-4 cursor-pointer hover:bg-red-700" onClick={onClose}>Cancelar</button>
              <button className="w-1/3 bg-green-500 rounded-sm p-3 font cursor-pointer hover:bg-green-700" onClick={handleConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}