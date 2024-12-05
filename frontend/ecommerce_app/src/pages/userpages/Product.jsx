import React,{useEffect,useState} from 'react'
import Cards from '../../components/usercomponents/Cards'
import axios from 'axios'

const Product = () => {
  const[product,setProduct] = useState([])
  useEffect(()=>{
    axios.get(`/api/productlist`)
    .then(res=>setProduct(res.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <>
     <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 px-10 my-10">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
    {product.map((p,i)=>(
        <Cards data={p} key={i}/>
    ))}
    </div>
   
      </div>



</section>
  
  
    </>
  )
}

export default Product