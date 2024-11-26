import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { isAutheticated } from '../../auth'

const AdminLayout = () => {
  if(!isAutheticated() || isAutheticated().user.role !==1){
    return <Navigate to='/login'/>
  }
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <AdminFooter/>
    </>
  )
}

export default AdminLayout