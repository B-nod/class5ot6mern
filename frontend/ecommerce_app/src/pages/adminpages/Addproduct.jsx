import React, {useState, useEffect} from 'react'
import { isAutheticated } from '../../auth'
import axios from 'axios'

const Addproduct = () => {
  const[category, setCategory] = useState([])
  useEffect(()=>{
    axios.get(`/api/categorylist`)
    .then(res=>{
      setCategory(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  const{token} = isAutheticated()
  const[product,setProduct]=useState({
    product_name:'',
    product_price:'',
    product_description:'',
    countInStock:'',
    category:'',
    product_image:""
  })

  const{product_name, product_price, product_description, countInStock}=product
  const[success, setSuccess] = useState(false)
  const[error, setError] = useState('')

  const onHandleSubmit = (name)=>(e)=>{
    setProduct({
      ...product,
      error:false,
      [name]:e.target.value
    })
  }

  //files
  const onHandleImage =(e)=>{
    setProduct({
      ...product,
      product_image:e.target.files[0]
    })
  }

  const handleSubmit = async event =>{
    event.preventDefault()
    try{
      const formData = new FormData()
      formData.append('product_name', product.product_name)
      formData.append('product_price', product.product_price)
      formData.append('product_description', product.product_description)
      formData.append('countInStock', product.countInStock)
      formData.append('product_image', product.product_image)
      formData.append('category', product.category)

      const config = {
        headers:{
          'Content_Type':'mutlipart/form-data',
          Authorization:`Bearer ${token}`
        }
      }

      const response = await axios.post(`/api/postproduct`, formData, config)
      setSuccess(true)
      setError(false)
      setProduct({
        product_name:'',
        product_price:'',
        countInStock:'',
        product_description:'',
        product_image:'',
        category:''
      })
    }

    catch(err){
      setError(err.response.data.error)
      setSuccess(false)
    }
  }
  console.log(product)

  // to show error Message 
  const showError = ()=>{
    return (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg" style={{ display:error ? "":'none'}} role='alert'>
            <strong className='font-bold text-sm mr-2'>Error!</strong>
            <span className="block text-sm sm:inline max-sm:mt-2">{error}</span>
        </div>
    )
}

const showSuccess = ()=>{
    return (
        <div className="bg-green-100 text-greens-800 p-4 rounded-lg" style={{display:success ? "":'none'}} role='alert'>
        <strong className='font-bold text-sm mr-2'>Success!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">Product has been added successfully !</span>
    </div>
    )
}


  return (
    <>
      <form action="" className="lg:p-16 p-6">
        {showSuccess()}
        {showError()}
<div className="relative mb-6">
 <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Product Name<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
   </svg>
 </label>
 <input 
 type="text"
  id="default-search"
  onChange={onHandleSubmit('product_name')}
  value = {product_name}
  className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="Name..." required="" />
</div>
<div className="relative mb-6">
 <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Product Price<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
   </svg>
 </label>
 <input type="number"
  id="default-search"
  onChange={onHandleSubmit('product_price')}
  value={product_price}
   className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="Email address..." required=""/>
</div>
<div className="relative mb-6">
 <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Quantity<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
   </svg>
 </label>
 <input type="number" 
 id="default-search"
 onChange={onHandleSubmit('countInStock')}
 value={countInStock}
  className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="Email address..." required=""/>
</div>
<div className="relative mb-6">
 <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Product Description<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
   </svg>
 </label>
  <textarea name="des"
   id="des" 
   placeholder='type here ....' 
   onChange={onHandleSubmit('product_description')}
   value={product_description}
   className='block w-full  px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="Email address..." required=""/>
</div>'></textarea>
</div>
<div className="relative mb-6">
 <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Product Image<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
   </svg>
 </label>
 <input type="file"
 accept='image/*'
  id="default-search"
  onChange={onHandleImage}
  className="block w-full px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs "required=""/>
</div>
<div className="relative mb-6">
 <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Category<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
   </svg>
 </label>
 <select name="" id="" 
 onChange={onHandleSubmit('category')}
 className='block w-full  px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none'>
  {category.map((c,i)=>(
        <option value={c.id} key={i}>{c.category_name}</option>
  ))}

 </select>
</div>
<button 
onClick={handleSubmit}
className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
>Add Product</button>
</form>
    </>
  )
}

export default Addproduct