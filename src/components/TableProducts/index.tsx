import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { FaPencilAlt } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { Modal } from '../Modal';
import { ModalCreate } from '../ModalCreate';
import { ModalDelete } from '../ModalDelete';


type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number
}


export function TableProducts() {
  const [openModal, setOpenModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined)
  const [deleteProduct, setDeleteProduct] = useState('')


  async function getProducts() {
    const result = await axios.get('http://localhost:3000/products');
    return result.data;
  }

  function handleModalClose() {
    setEditProduct(undefined)
    setOpenModal(false)
  }

  function handleEditProduct(product: Product) {
    setEditProduct(product)
    setOpenModal(!openModal)
  }

  function handleAddProduct() {
    setCreateModal(!createModal)
  }

  function handleCloseModalCreate() {
    setCreateModal(false)
  }

  function handleDeleteProduct(id: string) {
    setDeleteProduct(id)
    setDeleteModal(!deleteModal)
  }

  function handleDeleteClose() {
    setDeleteModal(false)
  }

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;


  return (
    <div className="w-full h-full z-10" >
      {/* <div className="absolute bg-black opacity-80 inset-0 z-0"></div> */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>Produtos</h1>
        <IoMdAdd size={25} className='cursor-pointer' onClick={handleAddProduct} />
      </div>

      <div className='w-full pt-20'>
        <table className='w-full pt-20'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody className='w-full py-5'>
            {products.map((product: Product) => {
              return (
                <tr key={product.id} className='text-center' >
                  <td className='py-5'>{product.name}</td>
                  <td className='py-5'>{product.price.toLocaleString("pt-br", { style: 'currency', currency: "brl" })}</td>
                  <td className='py-5'>{product.quantity}</td>
                  <td className='py-5 flex items-center justify-between'>
                    <FaPencilAlt size={20} className='cursor-pointer' onClick={() => handleEditProduct(product)} />
                    <CiCircleRemove size={20} className='cursor-pointer' onClick={() => handleDeleteProduct(product.id)} />
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      <Modal open={openModal} modalTitle='Editando produto' onClose={handleModalClose} product={editProduct} />
      <ModalCreate open={createModal} modalTitle='Criando produto' onClose={handleCloseModalCreate} />
      <ModalDelete open={deleteModal} modalTitle='Deseja deletar esse Produto ?' onClose={handleDeleteClose} idProduct={deleteProduct} />
    </div >
  )
}