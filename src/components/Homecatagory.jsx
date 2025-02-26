import { useNavigate } from 'react-router-dom'

const Homecatagory = () => {

    const navigate=useNavigate();



    
    const cat = [
        { text: "Beauty", image: "beauty.png" },
        { text: "Men", image: "men-cat.png" },
        { text: "Women", image: "women-cat.png" },
        { text: "Groceries", image: "groceries.png" },
        { text: "Laptops", image: "laptops.png" },
        { text: "Mobile-Accessories", image: "mobAcc.png" },
        { text: "Vehicle", image: "vehicle-cat.png" },
        { text: "SmartPhone", image: "phone-cat.png" },
    ]
    return (
        <>
            <div className='flex justify-evenly flex-wrap text-center m-2 '>
                <div className='flex flex-col cursor-pointer hover:scale-110' onClick={()=>navigate('/ALLcatagorys')}>
                <div className=' bg-purple-200  text-wrap text-center relative border-2 border-rose-600 rounded-full h-11 w-11 md:h-20 md:w-20 m-2'>
                    <img src="all-cat.png" alt="not found" className='h-full w-svw absolute bottom-2 drop-shadow-2xl shadow-black' />
                </div>
                <h1 className='w-16 md:w-24 text-center'>ALL Categorys</h1>
                </div>

                {cat.map((item) => (
                    <div className=' flex flex-col cursor-pointer hover:scale-110' onClick={()=>navigate(`/cat/${item.text}`)}>
                        <div className=' bg-purple-200  text-wrap text-center relative border-2 border-rose-600 rounded-full h-11 w-11 md:h-20 md:w-20 m-2'>
                            <img src={item.image} alt="not found" className='h-full w-svw absolute bottom-2 drop-shadow-2xl shadow-black' />
                        </div>
                        <h1 className='w-20 truncate text-center'>{item.text}</h1>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Homecatagory
