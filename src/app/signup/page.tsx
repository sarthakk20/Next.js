'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { KeyRound, Mail, UserRound, UserRoundPlus } from 'lucide-react';



export default function Signup() {
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
            if(user.email.trim().length <= 0 || user.username.trim().length <= 0 || user.password.trim().length <= 0){
                toast.error("Please enter all fields");
                return;
            }
            console.log("User details: ", user);
            setLoading(true);
            SetButtonDisabled(true);
            toast.promise(
                axios.post("/api/user/signup", user),
                {
                    loading: 'Signing up...',
                    success: 'Signup successful! Redirecting to login page...'
                }
            );
            router.push('/login');
        } catch (error: any) {
            const message = error.response?.data?.error || (error instanceof Error ? error.message : "Signup failed");
            console.log("Signup failed:", message);
            toast.error(message);
        } finally {
            setLoading(false);
            SetButtonDisabled(false);
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
        <div id='innerDiv' className="bg-gray-600 p-6 rounded-lg shadow-lg">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold my-3">{loading ? "Processing": "Signup Page"}</h1>
        <p className="mb-1 text-center text-blue-200 text-xs md:text-sm">(Please enter your credentials to sign up.)</p>
        <form onSubmit={(e) => {
                    e.preventDefault();
                    
                }}>
                <div className="flex flex-row justify-around items-center my-3">
                {/* <label className='text-sm sm:text-md md:text-[16px] mr-8' htmlFor="email"> Email : </label> */}
                <Mail className='text-sm sm:text-md md:text-[16px] mx-4' size={24}/>
                <input 
                id="email"
                type="email" 
                className="text-sm sm:text-md md:text-[16px] border-1 border-white rounded-md  md:mx-2 p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                required
                suppressHydrationWarning/>
                </div>
            
                <div className="flex flex-row justify-around items-center my-3">
                {/* <label className='text-sm sm:text-md md:text-[16px] mr-2' htmlFor="username">Username : </label> */}
                <UserRound className='text-sm sm:text-md md:text-[16px] mx-4' size={24}/>
                <input type="text" 
                id="username" 
                minLength={3}
                className="text-sm sm:text-md md:text-[16px] border-1 border-white rounded-md md:mx-2 p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                placeholder='Enter your username'
                required
                suppressHydrationWarning/>
                </div>
                
                <div className="flex flex-row justify-around items-center my-3">  
                {/* <label className='text-sm sm:text-md md:text-[16px] mr-2' htmlFor="password">Password : </label> */}
                <KeyRound className='text-sm sm:text-md md:text-[16px] mx-4' size={24}/>
                <input type="password" 
                id="password" 
                minLength={6}
                className="text-sm sm:text-md md:text-[16px] border-1 border-white rounded-md md:mx-2 p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder='Enter your password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                required
                suppressHydrationWarning/>
                </div>
            
            <div 
            className="flex justify-center">
                <button 
                type="submit" 
                id='loginButton'
                onClick={onsignup}
                className="text-sm md:text-md sm:text-md bg-green-500 rounded-lg border-0 p-3 px-5 mt-3 hover:bg-green-700">
                {buttonDisabled ? "No Signup" : "Signup"} <UserRoundPlus className='inline gap-3' size={18}/></button>
            </div>
        </form>
                <div className='flex justify-center mt-2'>
                <Link 
                href="/login"
                className='text-sm sm:text-md md:text-[16px] text-blue-300 hover:text-blue-400 text-center'>
                visit login page
                </Link>
                </div>
        </div>
        </div>
    );
}