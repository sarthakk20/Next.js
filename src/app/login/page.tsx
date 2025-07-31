'use client'
import Link from 'next/link';
import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
// import{axios} from 'axios';


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
            username: '',
            password: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [buttonDisabled, SetButtonDisabled] = React.useState(false);
        const onlogin = async () => {
            try {
                setLoading(true);
                const response = await axios.post("/api/user/login", user);
                console.log("Login successfully", response.data);
                console.log("Login Details: ", user);
                toast.success("Login successful! Redirecting to Profile page...");
                router.push('/profile');

            } catch (error: any) {
                console.log("Login failed buddy : ", error.message);
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }

        useEffect(()=>{
            if(user.username.length > 0 && user.password.length > 0){
                SetButtonDisabled(false);
            }else{
                SetButtonDisabled(true);
            }
        },[user])

    return (
        <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen text-white">
        <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl my-2 text-center">{loading ? 'Processing...' : 'Login Page'}</h1>
            <p className="mb-1 text-center text-blue-200">Please enter your credentials to log in.</p>            
            <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <div className="my-3">
                    <label htmlFor="username">Username : </label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username"
                    placeholder="Enter your username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="border-2 border-white rounded-lg mx-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required />
                </div>
                <div className="my-3">
                    <label htmlFor="password">Password : </label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="border-2 border-white rounded-lg mx-3 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required />
                </div>
                <div className="flex justify-center">
                <button 
                type="submit" 
                onClick={onlogin}
                className="bg-green-500 rounded-lg border-0 p-2 px-6 hover:bg-green-600">{ buttonDisabled ? "No Login" : "Login"}</button>
                </div>
                <div className='flex justify-center mt-2'>
                <Link 
                href="/signup"
                className='text-blue-300 hover:text-blue-400 text-center'>
                Visit Signup Page
                </Link>
                </div>
                </form>
        </div>
        </div>
        
    );
}