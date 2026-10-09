'use client';

import React,{useState} from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, Send } from 'lucide-react';
import Link from 'next/link';


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
            <div id='forgotPass' className='flex flex-col items-center justify-center min-h-screen bg-[#080D1B]'>
                <div id='innerPage' className='bg-white p-6 rounded-lg shadow-md text-black text-center '>
                    <h1 className='text-center text-2xl md:text-3xl tracking-tight sm:text-4xl font-bold text-white mx-4'>Forgot Password ?</h1>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400 mb-7">
                        Enter your email and we&apos;ll send you a link to reset your password.
                    </p>
                    <form 
                    onSubmit={handleSubmit}
                    >
                    <div className="flex flex-row justify-around items-center my-3">
                    {/* <Mail className='text-sm sm:text-md md:text-[16px] mx-4 text-white' size={24}/> */}
                    <div className="group flex items-center w-full gap-3 mb-2 rounded-xl border border-white/20 px-4 transition duration-200 focus-within:border-blue-400/70 focus-within:ring-4 focus-within:ring-blue-500/10">
                    <Mail
                    size={19}
                    className="shrink-0 text-slate-500 transition group-focus-within:text-gray-300"
                    />

                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600"
                    required
                    />
                    </div>
                    </div>
                    

                    <div className="flex flex-row justify-around items-center my-3">
                    <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-500 hover:shadow-xl hover:shadow-violet-900/30 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#11182A] active:translate-y-0"
                    >
                    Send reset link
                    <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                    </button>
                    </div>

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

                    {/* Footer */}
                    <div className="mt-7 border-t border-white/[0.08] pt-5">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <LockKeyhole size={14} />
                        <span>Your account security matters to us.</span>
                        </div>
                    </div>
                </form>
                 {msg && (
                    <p
                    role="status"
                    aria-live="polite"
                    className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-slate-300"
                    >
                    {msg}
                    </p>
          )}
            </div>  
        </div>
    )
}