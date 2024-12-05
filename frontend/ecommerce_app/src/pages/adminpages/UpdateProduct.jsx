import React, {useEffect, useState} from 'react'
import { isAutheticated } from '../../auth'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const{productId} = useParams()
    const{token, user} = isAutheticated()
    console.log(token)
    console.log(user.role)
    
    const[category,setCategory]=useState([])
    const[product,setProduct] = useState({
        product_name:'',
        product_price:'',
        product_description:'',
        countInStock:'',
        product_image:'',
        category:''
    })
    const[success,setSuccess]=useState(false)
    const[error,setError] = useState('')

    const navigate = useNavigate()

    const onHandleSubmit=(e)=>{
        const{name,value} = e.target;
        setProduct(preState=>({
            ...preState,
            [name]:value
        }))
    }

    const onHandleImage = (e) => {
        setProduct(product =>({
               ...product,
               product_image:e.target.files[0]
        }))
      };

    useEffect(()=>{
        // to get category value
        axios.get(`/api/categorylist`)
        .then(res=>{
            setCategory(res.data)
        })
        .catch(err=>console.log(err))
        // to get product data to show in updateproduct form
        console.log("Fetch token : ",token)
        axios.get(`/api/productdetails/${productId}`, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            const productData = res.data
            setProduct({
                product_name: productData.product_name,
                product_price:productData.product_price,
                product_description:productData.product_description,
                countInStock:productData.countInStock,
                product_image:productData.product_image,
                category:productData.category._id


            })
        })
        .catch(err=>console.log(err))


      },[productId, token])

      const handleSubmit = async (event)=>{
        event.preventDefault()

        const formData = new FormData()
        formData.append('product_name', product.product_name);
        formData.append('product_price', product.product_price);
        formData.append('product_description', product.product_description);
        formData.append('countInStock', product.countInStock);
        formData.append('product_image', product.product_image);
        formData.append('category', product.category);
        try {
            await axios.put(`/api/updateproduct/${productId}`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccess(true)
            setError('')
            setProduct({
                product_name:'',
                product_price:'',
                product_description:'',
                countInStock:'',
                product_image:'',
                category:''
            })

            setTimeout(()=>{
              setSuccess(false)
              navigate('/admin/productlist')
            }, 3000)
        }
        catch(err){
            setError('Something went wrong')
            setSuccess(false)
        }
      }
    


     // Show error message
  const showError = () => {
    return (
      <div
        className="bg-red-100 text-red-800 p-4 rounded-lg"
        style={{ display: error ? '' : 'none' }}
        role="alert"
      >
        <strong className="font-bold text-sm mr-2">Error!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">{error}</span>
      </div>
    );
  };

  // Show success message
  const showSuccess = () => {
    return (
      <div
        className="bg-green-100 text-green-800 p-4 rounded-lg"
        style={{ display: success ? '' : 'none' }}
        role="alert"
      >
        <strong className="font-bold text-sm mr-2">Success!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">Product has been updated successfully!</span>
      </div>
    );
  };

  return (
    <>
      <form className="lg:p-16 p-6" onSubmit={handleSubmit}>
      {showSuccess()}
      {showError()}

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Name</label>
        <input
          type="text"
          name="product_name"
          onChange={onHandleSubmit}
          value={product.product_name}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Product Name"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Price</label>
        <input
          type="number"
          name="product_price"
          onChange={onHandleSubmit}
          value={product.product_price}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Product Price"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Quantity</label>
        <input
          type="number"
          name='countInStock'
          onChange={onHandleSubmit}
          value={product.countInStock}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Quantity"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Description</label>
        <textarea
          onChange={onHandleSubmit}
          name='product_description'
          value={product.product_description}
          className="block w-full px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Description"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Image</label>

        {product.product_image && (
          <>
          <div className="mb-4">
            <img src={`http://localhost:8080/public/uploads/${product.product_image}`} alt="pre_image" className="w-20 h-20 object-cover mb-2" />
          </div>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          id="file-input"
          onChange={onHandleImage}
          
          className="block w-full px-5 py-2.5 bg-white"
          required
        /> 
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Category</label>
        <select
          onChange={onHandleSubmit}
          value={product.category}
          name='category'
          className="block w-full px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          required
        >
          <option value="">Select Category</option>
          {category.map((c, i) => (
            <option value={c._id} key={i}>
              {c.category_name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
      >
        Update Product
      </button>
    </form>
    </>
  )
}

export default UpdateProduct