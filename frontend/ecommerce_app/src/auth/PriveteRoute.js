import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAutheticated } from '.'

const PriveteRoute = () => {
    isAutheticated()&&isAutheticated().user.role === 0?
    <Outlet/>:(
     <Navigate to='/signin'/>
    ) 
}

export default PriveteRoute