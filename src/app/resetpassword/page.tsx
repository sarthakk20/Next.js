'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { NextResponse } from 'next/server';

export default function ResetPasswordPage() {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();   
        
        if(newPassword !== confirmPassword){
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

            
        } catch (error:any) {
            console.error("Error resetting password:", error.message);
            return {message: "Error resetting password", status: 500};
        }
    }


    return(
        <div id='forgotPass' className='flex flex-col items-center justify-center h-screen bg-blue-950'>
            <div id='innerPage' className='bg-white p-6 rounded-lg shadow-md w-100 text-white text-center'>
                <form onSubmit={handleSubmit}>
                <h1 className='p-2 mt-2 mb-6 text-3xl text-bold'>Reset Password Page</h1>
                <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter New Password'
                className='border border-gray-300 p-2 rounded mb-4 ml-3'
                required
                />
                <input 
                type="password" 
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                className='border border-gray-300 p-2 rounded mb-4 ml-3'
                required
                />

                <div className='flex justify-center'>
                    <button
                    id='resetButton'
                    type='submit'
                    className='bg-green-500 p-3 px-5 rounded-lg hover:bg-green-700'
                    >Reset</button>
                </div>
                </form>

                <div className='flex justify-center mt-2'>
                    <Link 
                    href="/login"
                    className='text-blue-400 hover:text-blue-500 text-center'>
                    Visit Login Page
                    </Link>
                    </div>
            </div>
        </div>
    )
}