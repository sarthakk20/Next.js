'use client';

import React,{useState} from 'react';
import axios from 'axios';
import {connect} from '@/dbConfig/dbconfig';
import User from '@/models/userModel';
import { NextRequest } from 'next/server';


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('No Message')

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log("Email:", email);
        try {
            const res = await axios.post('/api/user/forgotpassword',{email})
            console.log(res);
            
            const data = await res.data;
            console.log(data);
            setEmail("");
            setMsg(data.message || data.error)
        } catch (error:any) {
            console.error("Error sending reset link:", error.message);
            return {message: "Error sending reset link", status: 500};
        }
    }

    return(
        <div id='forgotPass' className='flex flex-col items-center justify-center h-screen w-screen bg-blue-950'>
            <div id='innerPage' className='bg-white p-6 rounded-lg shadow-md w-100 text-black text-center'>
                <h1 className='p-2 mt-2 mb-6 text-3xl text-bold'>Forgot Password Page</h1>
                <form 
                onSubmit={handleSubmit}
                >
                    <label 
                    htmlFor="email"
                    className='text-gray-700 text-bold text-xl mb-2'
                    >Email :</label>

                    <input type="email" 
                    id="email" 
                    name="email"
                    value={email}
                    onChange = {(e)=> setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className='border border-gray-300 p-2 rounded mb-4 ml-3'
                    required />

                    <button 
                    type="submit" 
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-3'>Send reset link</button>
                </form>
                <p
                className='text-gray-500 text-sm'
                >{msg ? `${msg}`:"No Message"}</p>
            </div>
        </div>
    )
}