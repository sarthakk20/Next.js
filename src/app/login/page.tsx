'use client'
import Link from 'next/link';
import React, {useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Eye, EyeOff, KeyRound, LogIn, UserRound } from 'lucide-react';


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
        const [showPassword, setShowPassword] = useState(false);
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
        <div id='bgFile' className="bg-[#080D1B] flex flex-col items-center justify-center min-h-screen text-white ">
        <div id='outerDiv'>
            <div id='innerDiv' className="bg-gray-600 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold my-2 text-center tracking-tight">{loading ? 'Logging you in...' : 'Login Page'}</h1>
            <p className="mt-3 mb-4 text-[12px] md:text-sm leading-6 text-slate-400 text-center">
            Enter your credentials to continue login.
          </p>          
            <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <div className="flex flex-row gap-3 items-center my-2">
                 <UserRound className='text-sm sm:text-md md:text-[16px] sm:mx-4 mx-0' size={24}/>
                <div className="group w-full flex items-center gap-3 rounded-xl border border-white/10 px-3 md:px-4 transition duration-200 focus-within:border-violet-400/70 focus-within:ring-4 focus-within:ring-violet-500/10">
              
                <UserRound size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-blue-300"/>

                <input
                    type="text"
                    minLength={3}
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    autoComplete="username"
                    value={user?.username ?? ""}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="flex-1 bg-transparent py-4 md:text-md sm:text-md text-sm text-white outline-none placeholder:text-slate-600 "
                    required
                />
                </div>

                    </div>
                    <div className="flex flex-row gap-3 items-center my-2">
                    <KeyRound className='text-sm sm:text-md md:text-[16px] sm:mx-4 mx-0' size={24}/>
                    <div className="group w-full flex items-center gap-3 rounded-xl border border-white/10 px-3 md:px-4 transition duration-200 focus-within:border-violet-400/70 focus-within:ring-4 focus-within:ring-violet-500/10">
                    <KeyRound size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-blue-300"/>

                    <input
                    type={showPassword ? "text" : "password"}
                    minLength={6}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={user?.password ?? ""}
                    onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                    }
                    className="flex-1 bg-transparent py-4 md:text-md sm:text-md text-sm text-white outline-none placeholder:text-slate-600"
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
                className="flex items-center justify-around gap-2 text-sm md:text-md sm:text-md bg-green-500 rounded-lg border-0 p-3 px-6 hover:bg-green-600">
                    { buttonDisabled ? "No Login" : `Login`} <LogIn className='inline' size={20}/> </button>
                </div>

                <div className="mt-7 text-center">
                <p className="text-[12px] md:text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                    href="/signup"
                    className="font-semibold text-blue-300 transition hover:text-blue-200"
                    >
                    Create account
                    </Link>
                </p>
                </div>
                </form>
        </div>
        </div>
        </div>
        
    );
}