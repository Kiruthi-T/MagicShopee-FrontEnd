import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';


  export default function Products({productDetails}) {
    const navigate=useNavigate()
   

    return (
      <div className="bg-gray-200">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 cursor-pointer" >
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productDetails.map((product) => (
              <div onClick={()=>navigate(`/product/${product._id}`)} className='bg-white rounded-lg shadow-2xl p-2'>
                <img
                alt={product.title}
                  src={product.images[0]}
                  className="aspect-square w-full rounded-lg  object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                />
                <div className='flex justify-between'>
                  <div>
                <h3 className="mt-4 w-28 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">$ {product.price}</p>
                </div>
                <span className='rounded-3xl h-10 bg-green-500 p-1 mt-2 text-white'>{product.rating}<GradeIcon className='m-1'/> </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  