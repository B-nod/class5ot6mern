import React, {useState} from 'react'
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js'
import axios from 'axios'
import { isAutheticated } from '../../auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const option = {
  style:{
    base:{
      fontSize: '20px',
    },
    invalid:{
      color:'#9e2145'
    }
  }
}

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippinginfo'));
  const { user, token } = isAutheticated();
  const order = {
    orderItems: cartItems,
    shippingAddress1: shippingInfo.shippingAddress1,
    shippingAddress2: shippingInfo.shippingAddress2,
    city: shippingInfo.city,
    zip: shippingInfo.zip,
    phone: shippingInfo.phone,
    country: shippingInfo.country,
    user: user._id,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    description: 'Purchase of goods/services',
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay-btn').disabled = true;



    let res;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      res = await axios.post(`/api/process/payment`, paymentData, config);
      const client_secret = res.data.client_secret;
      if (!stripe || !elements) {
        toast.error('Stripe is not initialized.');
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.shippingAddress1,
              city: shippingInfo.city,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector('#pay-btn').disabled = false;
      } else if (result.paymentIntent.status === 'succeeded') {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        try {
          await axios.post(`/api/postorder`, order, config);
          localStorage.removeItem('cartItems');
          navigate('/success');
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error('Payment not completed. Please try again.');
      }
    } catch (error) {
      document.querySelector('#pay-btn').disabled = false;
      toast.error(error.message);
    }
  };

  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
    <div className="container">
    <div className="flex justify-center">
      <form onSubmit={submitHandler}>
        <h2 className='text-center'>Card Information</h2>
        <div className="my-3">
        <label htmlFor="cardnumber">Card Number</label>
        <CardNumberElement type="text" id='cardnumber' options={option} />
        </div>
        <div className="my-3">
        <label htmlFor="cardexpiry">Expiry Date</label>
        <CardExpiryElement type="text" id='cardexpiry' options={option} />
        </div>
        <div className="my-3">
        <label htmlFor="cvc">CVC</label>
        <CardCvcElement type="text" id='cvc' options={option} />
        </div>
        <div className="my-3">
        <button className='bg-yellow-500 text-center px-3 py-2 rounded' id='pay-btn'>Pay Now</button>
        </div>
       
      </form>
    </div>
    </div>
    </>
  )
}

export default Payment