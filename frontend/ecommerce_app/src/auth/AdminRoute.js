import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAutheticated } from '.'

const AdminRoute = () => {
   isAutheticated()&&isAutheticated().user.role ===1?
   <Outlet/>:(
    <Navigate to='/signin'/>
   ) 
}

export default AdminRoute