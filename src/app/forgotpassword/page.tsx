'use client';

import React,{useState} from 'react';
import axios from 'axios';
import { Mail, Send } from 'lucide-react';


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
        } catch (error: unknown) {
            const message =
            error instanceof Error ? error.message : "Something went wrong";

            console.log(message);
}
    }

    return(
        <div id='forgotPass' className='flex flex-col items-center justify-center min-h-screen bg-blue-950'>
            <div id='innerPage' className='bg-white p-6 rounded-lg shadow-md text-black text-center'>
                <h1 className='text-center text-xl sm:text-2xl md:text-3xl my-2 mb-6 font-bold text-white'>Forgot Password Page</h1>
                <form 
                onSubmit={handleSubmit}
                >
                    <div className="flex flex-row justify-evenly items-center my-3">
                    {/* <label htmlFor="email" className='text-sm sm:text-md md:text-[16px] text-bold text-white mr-3'>Email :</label> */}
                    <Mail className='text-sm sm:text-md md:text-[16px] text-white' size={24}/>
                    <input type="email" 
                    id="email" 
                    name="email"
                    value={email}
                    onChange = {(e)=> setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className='text-sm md:text-md sm:text-md border border-gray-300 p-2 rounded'
                    required />
                    </div>

                    <div className='flex items-center justify-center'>
                    <button 
                    id='resetButton'
                    type="submit" 
                    className='flex items-center gap-2 text-sm md:text-md sm:text-md bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-3 mt-4 text-center'>
                    Send reset link <Send className='inline' size={18}/></button>
                    </div>
                </form>
                <p
                className='text-gray-300 text-sm'
                >{msg ? `${msg}`:"No Message"}</p>
            </div>
        </div>
    )
}