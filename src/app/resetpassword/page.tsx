'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';

export default function ResetPasswordPage() {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();   
        if(newPassword !== confirmPassword){
            toast.error("Confirm password is not similar to new password");
            setNewPassword("");
            setConfirmPassword("");
            return console.log("Confirm password is not similar to new password");
        }
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);

        try {
            // Extract the token from the URL

            const urlToken = window.location.search.split('=')[1];
            // const params = new URLSearchParams(window.location.search);
            // const urlToken = params.get('token');

            const res = await axios.post('/api/user/resetpassword',{
                newPassword,
                urlToken,
            })
            console.log("Response from reset password API:", res);

            setNewPassword("");
            setConfirmPassword("");

            router.push('/login');

            return NextResponse.json({
                message:"Success",
                data:res,
                status:200
            })

            
        } catch (error: unknown) {
        const message =
        error instanceof Error ? error.message : "Something went wrong";

        console.log(message);
}
    }


    return(
        <div id='forgotPass' className='flex flex-col items-center justify-center min-h-screen bg-blue-950'>
            <div id='innerPage' className='bg-white p-6 rounded-lg shadow-md text-white text-center'>
                <form onSubmit={handleSubmit}>
                <h1 className='p-2 mt-2 mb-6 text-xl sm:text-2xl md:text-3xl font-bold'>Reset Password Page</h1>
               
                <div className='flex flex-col justify-around items-center my-3'>
                     <input 
                type="password" 
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter New Password'
                className='text-sm md:text-md sm:text-md border border-gray-300 p-2 rounded mb-4 ml-3'
                required
                />
                <input 
                type="password" 
                minLength={6}
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                className='text-sm md:text-md sm:text-md border border-gray-300 p-2 rounded mb-4 ml-3'
                required
                />
                </div>

                <div className='flex justify-center'>
                    <button
                    id='resetButton'
                    type='submit'
                    className='flex flex-row gap-2 justify-center items-center text-sm md:text-md sm:text-md p-3 px-5 rounded-lg'
                    >Reset <Lock size={18} className='inline gap-3 items-center'/></button>
                </div>
                </form>

                <div className='flex justify-center mt-2'>
                    <Link 
                    href="/login"
                    className='text-sm md:text-md sm:text-md text-blue-400 hover:text-blue-500 text-center'>
                    Visit Login Page
                    </Link>
                    </div>
            </div>
        </div>
    )
}