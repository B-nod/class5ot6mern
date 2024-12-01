import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isAutheticated } from '../../auth'
import { FaTrashAlt } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";


const ProductList = () => {
    const{token} = isAutheticated()
    const[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get(`/api/productlist`)
        .then(res=>(
            setProduct(res.data)
        ))
        .catch(err=>console.log(err))
    }, [])
  return (
    <>
    
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            {product && product.map((p,i)=>(
                <>
                 <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {p.product_name}
                </th>
                <td className="px-6 py-4">
                    Rs. {p.product_price}
                </td>
                <td className="px-6 py-4">
                    {p.countInStock}
                </td>
                <td className="px-6 py-4">
                    {p.product_description}
                </td>
                <td className="px-6 py-4">
                    <img src={`http://localhost:8080/${p.product_image}`} alt={p.product_name} className='w-[200px]' />
                </td>
                <td className="px-6 py-4">
                    {p.category.category_name}
                </td>
                <td className="px-6 py-4">
                    <Link to="#" className="font-medium text-blue-600 text-2xl dark:text-blue-500 hover:underline"><FaPenSquare /></Link>
                    <Link to="#" className="font-medium text-red-600 text-2xl dark:text-red-500 hover:underline"><FaTrashAlt /></Link>
                </td>
            </tr>
                </>
            ))}
           
          
        </tbody>
    </table>
</div>

    </>
  )
}

export default ProductList