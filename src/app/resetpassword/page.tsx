'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';
import type { FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, KeyRound, Lock } from 'lucide-react';

export default function ResetPasswordPage() {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
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
        <div id='forgotPass' className='flex flex-col items-center justify-center min-h-screen bg-[#080D1B]'>
            <div id='innerPage' className='bg-white p-6 rounded-lg shadow-md text-white text-center'>
                <form onSubmit={handleSubmit}>
                <h1 className='p-2 mt-2 mb-6 text-xl sm:text-2xl md:text-3xl font-bold'>Reset Password Page</h1>
               
                <div className='flex flex-col justify-around items-center my-3'>
                <div className="group md:p-2 w-full my-3 flex items-center gap-3 rounded-xl border border-white/10 px-3 md:px-4 transition duration-200 focus-within:border-blue-500/70 focus-within:ring-4 focus-within:ring-blue-500/10">
                <KeyRound size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-blue-300"/>    
                <input 
                type="password" 
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter New Password'
                className="flex-1 bg-transparent py-2 md:text-md sm:text-md text-sm text-white outline-none placeholder:text-slate-600"
                required
                />
                </div>
                <div className="group md:p-2 w-full mb-7 flex items-center gap-3 rounded-xl border border-white/10 px-3 md:px-4 transition duration-200 focus-within:border-blue-500/70 focus-within:ring-4 focus-within:ring-blue-500/10">
                <KeyRound size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-blue-300"/>
                <input 
                type={showPassword ? "text" : "password"}
                minLength={6}
                id="password"
                name="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                className="flex-1 bg-transparent py-2 md:text-md sm:text-md text-sm text-white outline-none placeholder:text-slate-600"
                required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="shrink-0 text-slate-500 transition hover:text-violet-300"
                >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
                </div>
                </div>

                <div className='flex justify-center'>
                    <button
                    id='resetButton'
                    type='submit'
                    className='flex flex-row gap-2 justify-center items-center text-md md:text-lg p-3 px-5 rounded-lg'
                    >Reset <Lock size={18} className='inline gap-3 items-center'/></button>
                </div>
                </form>

                {/* Back to login */}
                    <div className="mt-7 text-center">
                        <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-300"
                        >
                        <ArrowLeft size={16} />
                        Back to login
                        </Link>
                    </div>
            </div>
        </div>
    )
}