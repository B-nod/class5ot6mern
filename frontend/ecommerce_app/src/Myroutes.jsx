import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/usercomponents/Layout";
import Homepage from "./pages/userpages/Homepage";
import Product from "./pages/userpages/Product";
import AdminLayout from "./components/admincomponents/AdminLayout";
import Dashboard from "./pages/adminpages/Dashboard";
import AdminHeader from "./components/admincomponents/AdminHeader";
import Addproduct from "./pages/adminpages/Addproduct";
import ProductList from "./pages/adminpages/ProductList";
import Register from "./pages/userpages/Register";
import Signinpage from "./pages/userpages/Signinpage";

import AddCategory from "./pages/adminpages/AddCategory";
import CategoryList from "./pages/adminpages/CategoryList";
import EmailVerify from "./auth/EmailVerify";
import UpdateProduct from "./pages/adminpages/UpdateProduct";
import ProductDetail from "./pages/userpages/ProductDetail";
import Cart from "./pages/userpages/Cart";
import Shipping from "./pages/userpages/Shipping";
import ConfirmOrder from "./pages/userpages/ConfirmOrder";
import PaymentElements from "./pages/userpages/PaymentElements";
import Success from "./pages/userpages/Success";
import ForgetPassword from "./pages/userpages/ForgetPassword";

const Myroutes = () => {
  return (
    <>
      <Router>
        <Routes>
     
          {/* route for user pages */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Signinpage/>}/>
            <Route path='email/confirmation/:token' element={<EmailVerify/>}/>
            <Route path='productdetail/:productId' element={<ProductDetail/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='shipping' element={<Shipping/>}/>
            <Route path='confirm' element={<ConfirmOrder/>}/>
            <Route path='payment' element={<PaymentElements/>}/>
            <Route path='success' element={<Success/>}/>
            <Route path='forget' element={<ForgetPassword/>}/>

          </Route>

               {/* route for admin pages */}
        <Route path="/admin/" element={<AdminHeader />}>
            <Route index element={<Dashboard />} />
            <Route path="addproduct" element={<Addproduct/>}/>
            <Route path="productlist" element={<ProductList/>}/>
            <Route path="addcategory" element={<AddCategory/>}/>
            <Route path="categorylist" element={<CategoryList/>}/>
            <Route path="updateproduct/:productId" element={<UpdateProduct/>}/>
            

         
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Myroutes;
