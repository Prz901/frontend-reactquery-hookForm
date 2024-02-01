import { IoMdClose } from "react-icons/io";

import { useForm } from "react-hook-form"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type ModalProps = {
  open: boolean;
  modalTitle: string;
  onClose: () => void;
  onCreate?: () => void;
}


export function ModalCreate({ open, modalTitle, onClose, onCreate }: ModalProps) {
  const queryClient = useQueryClient()


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0
    }
  })


  // Funções de useMutation do React Query serve para requsições do tipo Post, Put, Patch,Delete
  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(data, variables) {
      const cached = queryClient.getQueryData(['products'])
      const idProduct = data.id
      queryClient.setQueryData(['products'], (data: any) => {
        return [...data, {
          id: idProduct,
          name: variables.name,
          price: variables.price,
          quantity: variables.quantity
        }]
      })

    }
  })

  async function createProduct(data: any) {
    const result = await axios.post('http://localhost:3000/products', { name: data.name, price: parseInt(data.price), quantity: parseInt(data.quantity) })
    if (result) {
      return result.data
    }
  }

  function onSubmit(data: any) {
    createProductFn(data)
    reset()
    onClose()
  }


  return (
    <>
      {
        open &&
        <div className="w-1/2 h-[500px] bg-zinc-200 z-50 fixed top-[20vh] right-0 left-[50vh] overflow-y-auto overflow-x-hidden text-black rounded-lg">
          <div className="p-10 flex items-center justify-between">
            <span className="text-2xl">{modalTitle}  </span>
            <IoMdClose size={28} onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="flex justify-center items-center" >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 justify-between">
              <label htmlFor="name" className="py-2">Nome</label>
              <input id="name" type="text" {...register("name")} className="p-1 rounded-sm outline-none" />
              <label htmlFor="price" className="py-2 " >Preço</label>
              <input type="number" id="price"  {...register("price")} className="p-1 rounded-sm outline-none" />
              <label htmlFor="quantity" className="py-2">Quantidade</label>
              <input type="number" id="quantity"  {...register('quantity')} className="p-1 rounded-sm outline-none" />

              <button type="submit" className="w-full p-1 bg-blue-500 text-white mt-10">Enviar</button>
            </form>
          </div>
        </div>
      }
    </>
  )
}