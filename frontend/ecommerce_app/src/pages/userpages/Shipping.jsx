import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from 'countries-list'

const Shipping = () => {
    const navigate = useNavigate()
    const countriesList = Object.values(countries)
    const shippinginfo = JSON.parse(localStorage.getItem('shippingInfo')) || {}

    const[shippingAddress1, setShippingAddress1] =  useState(shippinginfo.shippingAddress1) || ''
    const[shippingAddress2, setShippingAddress2] =  useState(shippinginfo.shippingAddress2) || ''
    const[city, setCity] =  useState(shippinginfo.city) || ''
    const[zip, setZip] =  useState(shippinginfo.zip) || ''
    const[phone, setPhone] =  useState(shippinginfo.phone) || ''
    const[country, setCountry] =  useState(shippinginfo.country) || ''

    const submitHandler=e=>{
        e.preventDefault()
        const shippinginfo = {
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone
        }
        localStorage.setItem('shippinginfo', JSON.stringify(shippinginfo))
        navigate('/confirm')
    }


  return (
    <>
     <form className="lg:p-16 p-6">
   

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Shipping address 1</label>
        <input
          type="text"
          onChange={(e)=>setShippingAddress1(e.target.value)}
          value={shippingAddress1}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Shipping Address 1"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Shipping Address 2</label>
        <input
          type="text"
          onChange={(e)=>setShippingAddress2(e.target.value)}
          value={shippingAddress2}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Shippin Address 2"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">City</label>
        <input
          type="text"
          onChange={(e)=>setCity(e.target.value)}
          value={city}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="City"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Zip</label>
        <input
          type="number"
          onChange={(e)=>setZip(e.target.value)}
          value={zip}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Zip"
          required
        />
      </div>

      <div className="relative mb-6">
      <label className="flex items-center mb-2 text-gray-600 text-sm font-medium"> Phone</label>
      <input
          type="number"
          onChange={(e)=>setPhone(e.target.value)}
          value={phone}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Phone"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Country</label>
        {/* <select
            onChange={(e)=>setCountry(e.target.value)}
            value={country}
          
          className="block w-full px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          required
        >
          <option value="">Select Country</option>
          
          {countriesList.map((c, i) => (
            <option value={c.name} key={i}>
              {c.name}
            </option>
          ))}
        </select> */}
        <input
          type="text"
          onChange={(e)=>setCountry(e.target.value)}
          value={country}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Country"
          required
        />
      </div>

      <button
        type="submit"
        onClick={submitHandler}
        className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
      >
        Continue
      </button>
    </form>
    </>
  )
}

export default Shipping