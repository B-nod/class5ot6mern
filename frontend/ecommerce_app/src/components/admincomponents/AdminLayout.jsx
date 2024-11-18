import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

const AdminLayout = () => {
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <AdminFooter/>
    </>
  )
}

export default AdminLayout