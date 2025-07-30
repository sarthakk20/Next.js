'use client'
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import{axios} from 'axios';
import toast from 'react-hot-toast';
import { log } from 'node:console';



export default function signup() {
    const router = useRouter();
    const [buttonDisabled, SetButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = React.useState({
        email: '',
        username: '',
        password: ''
    });
    const onsignup = async () => {
        try {
            
        } catch (error:any) {
            console.log("Error in signup: ", error);
            toast.error(error.message);
        }finally {
            setLoading
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length >0){
            SetButtonDisabled(false);
        }else{
            SetButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen text-white">
        <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-90">
            <h1 className="text-center text-2xl my-3">{loading ? "Processing": "Signup Page"}</h1>
        <p className="mb-1 text-center text-blue-200">Please enter your credentials to sign up.</p>
        {/* Add your login form here */}
        <form className=''> 
            <div>
                <label htmlFor="email">Email : </label>
                <input 
                type="email" 
                id="email" 
                className="border-1 border-white rounded-md my-1 ml-10.5 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Enter your email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                required/>
            </div>
            <div>
                <label htmlFor="username">Username : </label>
                <input type="text" 
                id="username" 
                className="border-1 border-white rounded-md my-1 ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                placeholder='Enter your username'
                required/>
            </div>
            <div>
                <label htmlFor="password">Password : </label>
                <input type="password" 
                id="password" 
                className="border-1 border-white rounded-md my-1 ml-3 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder='Enter your password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                required/>
            </div>
            <div 
            className="flex justify-center">
                <button 
                type="submit" 
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