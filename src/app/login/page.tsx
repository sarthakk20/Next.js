'use client'
import Link from 'next/link';
import React, {useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function LoginPage() {
    type User = {
    username: string;
    password: string;
}
    const router = useRouter()
    // const [user, setUser] = React.useState({
    //         username: '',
    //         password: ''
    //     });
    const [user, setUser] = useState<User>({
            username: '',
            password: ''
        });;
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

            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Something went wrong";
                toast.error("Error logging in! Please check your credentials"); 

            console.log(message);
            }finally{
                setLoading(false);
            }
            }

        useEffect(()=>{
            if(user?.username?.length > 0 && user?.password.length > 0){
                SetButtonDisabled(false);
            }else{
                SetButtonDisabled(true);
            }
        },[user])


    return (
        <div id='bgFile' className="bg-gray-900 flex flex-col items-center justify-center min-h-screen text-white">
        <div id='outerDiv'>
            <div id='innerDiv' className="bg-gray-600 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold my-2 text-center">{loading ? 'Processing...' : 'Login Page'}</h1>
            <p className="mb-1 text-center text-blue-200 text-xs md:text-sm">(Please enter your credentials to log in.)</p>            
            <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <div className="flex flex-row justify-around items-center my-3">
                    <label className='text-sm sm:text-md md:text-[16px]' htmlFor="username">Username : </label>
                    <input 
                    type="text" 
                    minLength={3}
                    id="username" 
                    name="username"
                    placeholder="Enter your username"
                    value={user?.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="text-sm sm:text-md md:text-[16px] border-2 border-white rounded-lg mx-1 md:mx-2 p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                    suppressHydrationWarning/>
                </div>
                <div className="flex flex-row justify-around items-center my-3">
                    <label className='text-sm sm:text-md md:text-[16px]' htmlFor="password">Password : </label>
                    <input 
                    type="password" 
                    minLength={6}
                    id="password" 
                    name="password" 
                    placeholder="Enter your password"
                    value={user?.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="text-sm sm:text-md md:text-[16px] border-2 border-white rounded-lg mx-1 md:mx-2 p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                    suppressHydrationWarning
                    />
                </div>
                <div className='text-center mt-4 mb-2'>
                    <Link 
                    href="/forgotpassword"
                    className='text-sm sm:text-md md:text-[16px] text-blue-400 hover:text-blue-500 text-center'>
                    forgot password?
                    </Link>
                </div>
                <div className="flex justify-center">
                <button 
                id='loginButton'
                type="submit" 
                onClick={onlogin}
                className="text-sm md:text-md sm:text-md bg-green-500 rounded-lg border-0 p-2 px-6 hover:bg-green-600">
                    { buttonDisabled ? "No Login" : "Login"}</button>
                </div>
                <div className='flex justify-center mt-3'>
                <Link 
                href="/signup"
                className='text-sm sm:text-md md:text-[16px] text-blue-400 hover:text-blue-500 text-center'>
                Visit Signup Page
                </Link>
                </div>
                </form>
        </div>
        </div>
        </div>
        
    );
}