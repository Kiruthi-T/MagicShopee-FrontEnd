import { useNavigate } from "react-router-dom";

const Profile = ({userDetails}) => {
    const navigate = useNavigate();
   

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-center p-6 md:bg-gray-100 min-h-screen">
            {/* Profile Card */}
            <div className="md:bg-white md:shadow-lg rounded-lg p-6 md:w-80 flex flex-col items-center">
                {/* Dummy Profile Image */}
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2a5 5 0 00-5 5 5 5 0 0010 0 5 5 0 00-5-5zm-7 18a7 7 0 0114 0H5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {/* User Info */}
                <h2 className="mt-4 text-lg font-semibold">{userDetails.name}</h2>
                <p className="text-gray-500">{userDetails.mail}</p>
                {/* Buttons */}
                <div className="mt-4 w-full flex flex-col gap-3">
                    <button 
                    onClick={()=>navigate('/cart')}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                        View Cart
                    </button>
                    <button 
                     onClick={()=>navigate('/All-Orders')}
                     className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                        Orders
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

