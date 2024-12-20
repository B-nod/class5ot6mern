import React,{useState} from 'react'
import axios from 'axios'

const ForgetPassword = () => {
    const[email,setEmail] =useState("")
    const[message, setMessage] = useState("")
    const[error, setError] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post(`/api/forgetpassword`, {email})
            setMessage(response.data.message)
            setError("")

        }catch(err){
            setError(err.response.data.error || "Something went wrong. Please try again")
            setMessage("")
        }
    }
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl fobt-bold tex-center text-gray-800 mb-6">
                Forget Password
            </h2>
            {message && (
                <p className='mb-4 text-green-600 bg-green-100 p-3 rounded'>
                    {message}
                </p>
            )}
             {error && (
                <p className='mb-4 text-red-600 bg-red-100 p-3 rounded'>
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">email </label>
                    <input type="email"
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg text-gray-700" placeholder='enter your email' />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover;bg-blue-700">
                    Send Reset Link
                </button>
            </form>
        </div>
    </div>
    
    </>
  )
}

export default ForgetPassword