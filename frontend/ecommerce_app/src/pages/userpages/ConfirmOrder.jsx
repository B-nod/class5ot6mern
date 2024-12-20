import React from 'react'
import { useNavigate } from 'react-router-dom'
import { isAutheticated } from '../../auth'

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippinginfo'))
    const{user}= isAutheticated()
    const totalPrice = cartItems.reduce((ac,item)=>(ac+item.quantity*item.price), 0)
    const procceedToPayment =()=>{
        const data = {
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }
  return (
    <>
    <div className="container mx-auto my-8 px-4">
        <div className="flex flex-wrap justify-evenly">
            <div className="w-full lg:w-8/12 bg-white shadow-md p-6 mb-6">
            <h2 className="text-center text-4xl font-bold mb-6">Shipping Info</h2>
            <div className="max-w-md max-auto">
                <div className="mb-4">
                    <b>Name:</b>
                    <span className="text-gray-500">
                        {user.name}
                    </span>
                </div>
                <div className="mb-4">
                    <b>Email:</b>
                    <span className="text-gray-500">
                        {user.email}
                    </span>
                </div>
                <div className="mb-4">
                    <b>Phone:</b>
                    <span className="text-gray-500">
                        {shippingInfo.phone}
                    </span>
                </div>
                <div className="mb-4">
                    <b>City:</b>
                    <span className="text-gray-500">
                        {shippingInfo.city}
                    </span>
                </div>
                <div className="mb-4">
                    <b>Country:</b>
                    <span className="text-gray-500">
                        {shippingInfo.country}
                    </span>
                </div>
                <div className="mb-4">
                    <b>Shupping Address:</b>
                    <span className="text-gray-500">
                        {shippingInfo.shippingAddress1},  {shippingInfo.shippingAddress2}
                    </span>
                </div>
                <div className="mb-4">
                    <b>Zip:</b>
                    <span className="text-gray-500">
                        {shippingInfo.zip}
                    </span>
                </div>
            </div>
            <hr className="my-6" />
            <h2 className="text-center text-xl text-gray-600 font-medium mb-6">
                Your cart Items
            </h2>
            {cartItems.map((item,i)=>(
            <>
            <div key={i} className="flex items-center mb-6 border-b pb-4">
                <div className="w-1/3">
                <img src={`http://localhost:8080/${item.image}`} alt={item.name} className="w-full h-auto" />
                </div>
                <div className="w-1/3 px-4">
                <p className="text-gray-500">{item.name}</p></div>
                <div className="w-1/3 text-right">
                <span className="text-blue-600 text-lg">
                    Rs. {item.quantity} X {item.price} = <b>Rs {item.quantity*item.price}</b>
                    </span></div>

            </div>
            </>
            ))}
            
            </div>
          
              <div className="w-full lg:w-3/12 bg-white shadow p-6">
    <h2 className="text-xl font-semibold mb-6">Order Summart</h2>
    <hr className="mb-6" />
    <p className="mb-4">

        SubTotal: <span>{cartItems.reduce((ac,item)=> ac+item.quantity, 0)} (units)</span>
    </p>
    <p className="mb-4">
        Total Price: Rs <span>{totalPrice}</span>
    </p>
    <hr className="my-6" />
    <button
     className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
     onClick={procceedToPayment}
     >
        Proceed to Payment
    </button>
    
    </div>
        </div>
    </div>
  
    </>
  )
}

export default ConfirmOrder