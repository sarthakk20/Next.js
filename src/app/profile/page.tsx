"use client"
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { log } from 'node:console';
import { Router } from 'next/router';


export default function Profile() {
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
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1 className="text-lg text-center">Profile Page</h1>
                <p>This is the user's profile page.</p>
                <div className="flex items-center justify-center">
                <button
                onClick={logout}
                className="bg-blue-500 p-3 mt-4 hover:bg-blue-700 rounded-lg text-white"
                >Logout</button>
                </div>
            </div>
        </div>
    );
    }