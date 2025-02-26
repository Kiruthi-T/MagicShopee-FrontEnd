import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_API=import.meta.env.VITE_BACKEND_API

function Loginpage() {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setisRegistering] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null)


    
    async function handleLogin(e) {
        e.preventDefault();
        if (!mail || !password || (isRegistering && !name)) {
            setError("All Fields Are Required")
            return
        }
        try {
            if (isRegistering) {
                const res = await axios.post(`${BACKEND_API}/Register`, { name, mail, password });
                if (res.status === 200) {
                    setisRegistering(!isRegistering);
                    setAlert({ type: 'success', message: res.data.message });
                    navigate('/');
                }
            }
            else {
                const res = await axios.post(`${BACKEND_API}/Login`, { mail, password });
                if (res.status === 200) {
                    console.log("token",res.data.token);
                    localStorage.setItem("token",res.data.token);
                    sessionStorage.setItem("token",res.data.token);
                    
                    setAlert({ type: 'success', message: res.data.message });
                    navigate('/home');
                }
            }
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred";
            setAlert({ type: 'error', message: errorMessage });
        }
    }
    return (
        <>
            <center>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        width: "100%",
                        height: "100vh",
                        backgroundImage: `url(loginbg.webp)`, // Replace with your image path
                        backgroundSize: "cover", // Makes the image cover the whole area
                        backgroundPosition: "center", // Centers the image
                        backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                       
                    }}
                    onSubmit={handleLogin}
                >
                    <div >{alert &&
                        <div
                            className={`flex items-center p-4 mb-4 text-sm rounded-lg ${alert.type === 'success'
                                    ? 'text-green-700 bg-green-100'
                                    : 'text-red-700 bg-red-100'
                                }`}
                            role="alert"
                        >                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M8.293 12.293a1 1 0 0 1 1.414 0l2-2a1 1 0 0 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414z" />
                                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8a1 1 0 1 1-2 0V7a1 1 0 1 1 2 0v3z" clip-rule="evenodd" />
                            </svg>
                            <span className="font-medium">{alert.message}</span>
                        </div>}
                        <Box sx={{
                            p: 5, borderRadius: "20px",
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
                                Magic Shopee
                            </h1>
                            <h3 className="text-4xl font-extrabold mb-4 text-purple-500  drop-shadow-lg">
                                {isRegistering ? "Regester" : "Login"}
                            </h3>
                            {isRegistering && <TextField label="Name" color="secondary" type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />}<br />
                            <TextField label="Email Id" color="secondary" type='email'
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            /><br />
                            <TextField label="Password" color="secondary" type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /><br />
                            {error && <p className='m-2 text-red-700'>{error}</p>}
                            <Button variant="outlined" color="secondary" type='submit'>{isRegistering ? "Regester" : "Login"}</Button>
                            <div className='mt-3'>
                                <p className="inline mr-2">{isRegistering ? "Alredy Have an account" : "Dont Have account"}</p>
                                <button className='text-blue-500 hover:underline' type='button' onClick={() => setisRegistering(!isRegistering)}>{isRegistering ? "Login" : "Create Account"}</button>
                            </div>
                        </Box>
                    </div>
                </Box>
            </center>
        </>
    )
}

export default Loginpage
