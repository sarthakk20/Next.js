"use client"
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React,{useState} from 'react';
import toast from 'react-hot-toast';
import { log, profile } from 'node:console';
import { Router } from 'next/router';
import { link } from 'node:fs';
import { set } from 'mongoose';


export default function Profile() {

    const [data, setData] = useState("No data yet");
    const [message, setMessage] = useState("No message yet");
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/user/logout');
            console.log("Logout successfully!!!");
            toast.success("Logout successfully, Redirecting to login page...");
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error("Failed logging out");
        }
    }
    const GetTokenDetails = async () => {
        const response = await axios.get('/api/user/Me(User)');
        console.log("Token Details:", response.data);
        setData(response.data.data._id)
        setMessage(response.data.message);
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1 className="text-lg text-center">Profile Page</h1>
                <p className='text-center'>This is the user's profile page.</p>
                <h2 className='m-2 p-2 rounded-lg bg-gray-600 text-white text-center'>
                    {data === "No data yet" ? 
                    "No Data Yet!" : 
                    <Link href={`/profile/${data}`}>
                    {message} : {data}
                    </Link>}
                </h2>
                <div className="flex items-center justify-center">
                    <div>
                        <button
                        onClick={logout}
                        className="bg-blue-500 p-3 mt-4 hover:bg-blue-700 rounded-lg text-white"
                        >Logout</button>

                        <button
                        onClick={GetTokenDetails}
                        className="bg-green-700 p-3 mt-4 hover:bg-green-900 rounded-lg text-white m-3"
                        >Get User Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
    }