import React, {useState} from 'react'
import { isAutheticated } from '../../auth'

const AddCategory = () => {
  const[category_name, setCategory] = useState("");
  const[error,setError] = useState(false);
  const[success, setSuccess] = useState(false)
  
  const{token} = isAutheticated()

  const onHandleChange = (e)=>{
    setError('')
    setCategory(e.target.value.toLowerCase())
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setError('')
    setSuccess(false)

    const addCategory = (token,category)=>{
      return fetch(`/api/postcategory`,{
        method:"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
      })
      .then(res=>{
        return res.json()
      }
      )
      .catch(err=>console.log(err))
    }
  

  addCategory(token, {category_name})
  .then((data)=> {
    if (data && data.error){
      setError(data.error)
    }else{
      setError('')
      setSuccess(true)
      setCategory('')
    }
  })

  .catch((err)=>{
    console.log(err)
    setError('Something went wrong !')
  })

  }

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
        <span className="block text-sm sm:inline max-sm:mt-2">Category has been added successfully !</span>
    </div>
    )
}

  
  return (
    <>
    {showError()}
    {showSuccess()}
    

<form className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" 
      onChange={onHandleChange}
      value={category_name}
      name="floating_email"
      id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Name</label>
  </div>

  <button
   type="submit"
  onClick={handleSubmit}
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </>
  )
}

export default AddCategory