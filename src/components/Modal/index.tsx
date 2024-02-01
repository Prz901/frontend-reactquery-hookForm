import { IoMdClose } from "react-icons/io";

import { useForm } from "react-hook-form"

type ModalProps = {
  open: boolean;
  modalTitle: string;
  onClose: () => void;
  product?: {
    id: string,
    name: string,
    price: number;
    quantity: number;
  }
}


export function Modal({ open, modalTitle, onClose, product }: ModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
      mode: 'onChange',
    }
  )

  function onSubmit(data: any) {
    console.log("data", data)
    onClose()
  }

  // setValue('name', product?.name)
  // setValue('price', product?.price)
  // setValue('quantity', product?.quantity)

  return (
    <>
      {
        open &&
        <div className="w-1/2 h-[400px] bg-zinc-200 z-50 fixed top-[20vh] right-0 left-[50vh] overflow-y-auto overflow-x-hidden text-black rounded-lg">

          <div className="p-10 flex items-center justify-between">
            <span className="text-2xl">{modalTitle}  </span>
            <IoMdClose size={28} onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-1/2">

              <label htmlFor="name" className="py-2">Nome</label>
              <input id="name" type="text" {...register("name")} />
              <label htmlFor="price" className="py-2" >Preço</label>
              <input id="price"  {...register("price")} />
              <label htmlFor="quantity" className="py-2">Quantidade</label>
              <input id="quantity"  {...register('quantity')} />

              <button type="submit">Enviar</button>

            </form>
          </div>
        </div>
      }
    </>
  )
}