'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';



export default function signup() {
    const router = useRouter();
    const [buttonDisabled, SetButtonDisabled] = React.useState(false);
    // const [mounted, setMounted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: '',
        username: '',
        password: ''
    });


    const onsignup = async () => {
        try {
            console.log("User details: ", user);
            setLoading(true);
            const response = await axios.post("/api/user/signup", user);
            console.log("Signup successfully", response.data);
            toast.success("Signup successful! Redirecting to login page...");
            router.push('/login');
        } catch (error:any) {
            console.log("Failed signing up: ", error);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // Enable or disable the button based on user input
    // This will check if all fields are filled
    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length >0){
            SetButtonDisabled(false);
        }else{
            SetButtonDisabled(true);
        }
    }, [user]);

    // if (!mounted) return null;  

    return (
        <div id='bgFile' className="bg-gray-900 flex flex-col items-center justify-center min-h-screen text-white">
        <div id='innerDiv' className="bg-gray-600 p-6 rounded-lg shadow-lg w-90">
            <h1 className="text-center text-2xl my-3">{loading ? "Processing": "Signup Page"}</h1>
        <p className="mb-1 text-center text-blue-200">Please enter your credentials to sign up.</p>
        <form onSubmit={(e) => {
                    e.preventDefault();
                    
                }}> 
            
                <label htmlFor="email">Email : </label>
                <input 
                id="email"
                type="email" 
                className="border-1 border-white rounded-md my-1 ml-10.5 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Enter your email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                required/>
            
            
                <label htmlFor="username">Username : </label>
                <input type="text" 
                id="username" 
                className="border-1 border-white rounded-md my-1 ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                placeholder='Enter your username'
                required/>
            
                <label htmlFor="password">Password : </label>
                <input type="password" 
                id="password" 
                className="border-1 border-white rounded-md my-1 ml-3 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder='Enter your password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                required/>
            
            <div 
            className="flex justify-center">
                <button 
                type="submit" 
                id='loginButton'
                onClick={onsignup}
                className="bg-green-500 rounded-lg border-0 p-2 px-5 m-2 hover:bg-green-700">
                {buttonDisabled ? "No Signup" : "Signup"}</button>
            </div>
        </form>
                <div className='flex justify-center mt-2'>
                <Link 
                href="/login"
                className='text-blue-300 hover:text-blue-400 text-center'>
                Visit Login Page
                </Link>
                </div>
        </div>
        </div>
    );
}