import React, { useState, useEffect } from 'react';
import { isAutheticated } from '../../auth';
import axios from 'axios';

const Addproduct = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    product_name: '',
    product_price: '',
    product_description: '',
    countInStock: '',
    category: '',
    product_image: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { token } = isAutheticated();
  const { product_name, product_price, product_description, countInStock, product_image, category: categoryId } = product;

  useEffect(() => {
    axios
      .get('/api/categorylist')
      .then(res => {
        setCategory(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const onHandleSubmit = (name) => (e) => {
    setProduct({
      ...product,
      error: false,
      [name]: e.target.value,
    });
  };

  // Handle file input
  const onHandleImage = (e) => {
    setProduct({
      ...product,
      product_image: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('product_name', product_name);
      formData.append('product_price', product_price);
      formData.append('product_description', product_description);
      formData.append('countInStock', countInStock);
      formData.append('product_image', product_image);
      formData.append('category', categoryId);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('/api/postproduct', formData, config);
      setSuccess(true);
      setError('');
      setProduct({
        product_name: '',
        product_price: '',
        product_description: '',
        countInStock: '',
        product_image: '',
        category: '',
      });

       // Reset the file input field by clearing the input value
    document.getElementById('file-input').value = ''; // Add this line
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setSuccess(false);
    }
  };

  // Show error message
  const showError = () => {
    return (
      <div
        className="bg-red-100 text-red-800 p-4 rounded-lg"
        style={{ display: error ? '' : 'none' }}
        role="alert"
      >
        <strong className="font-bold text-sm mr-2">Error!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">{error}</span>
      </div>
    );
  };

  // Show success message
  const showSuccess = () => {
    return (
      <div
        className="bg-green-100 text-green-800 p-4 rounded-lg"
        style={{ display: success ? '' : 'none' }}
        role="alert"
      >
        <strong className="font-bold text-sm mr-2">Success!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">Product has been added successfully!</span>
      </div>
    );
  };

  return (
    <form className="lg:p-16 p-6" onSubmit={handleSubmit}>
      {showSuccess()}
      {showError()}

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Name</label>
        <input
          type="text"
          onChange={onHandleSubmit('product_name')}
          value={product_name}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Product Name"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Price</label>
        <input
          type="number"
          onChange={onHandleSubmit('product_price')}
          value={product_price}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Product Price"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Quantity</label>
        <input
          type="number"
          onChange={onHandleSubmit('countInStock')}
          value={countInStock}
          className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Quantity"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Description</label>
        <textarea
          onChange={onHandleSubmit('product_description')}
          value={product_description}
          className="block w-full px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          placeholder="Description"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Product Image</label>
        <input
          type="file"
          accept="image/*"
          id="file-input"
          onChange={onHandleImage}
          className="block w-full px-5 py-2.5 bg-white"
          required
        />
      </div>

      <div className="relative mb-6">
        <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Category</label>
        <select
          onChange={onHandleSubmit('category')}
          value={categoryId}
          className="block w-full px-5 py-2.5 bg-white border border-gray-300 rounded-full"
          required
        >
          <option value="">Select Category</option>
          {category.map((c, i) => (
            <option value={c._id} key={i}>
              {c.category_name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
      >
        Add Product
      </button>
    </form>
  );
};

export default Addproduct;