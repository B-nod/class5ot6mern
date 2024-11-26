import axios from 'axios';
import React,{useState, useEffect} from 'react'


const CategoryList = () => {
  const[category, setCategory] = useState([]);
  useEffect(()=>{
    axios.get(`/api/categorylist`)
    .then(res=>{
      setCategory(res.data)
    })
    .catch(err=>console.log(err))
    
  }, [])
  return (
  <>
  

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Category Name
                </th>
               
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {category.map((data, index) =>{
            return (
              <>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {data.category_name}
                </th>
               
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
              </>
            )
          })}
        
           
        </tbody>
    </table>
</div>

  </>
  )
}

export default CategoryList