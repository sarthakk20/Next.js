'use client';
import { NextRequest, NextResponse } from "next/server";
import React,{useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import { set } from "mongoose";

export default function verifyemailPage() {
const [token, setToken] = useState("")
const [verified, setVerified] = useState(false);
const [error, setError] = useState("false");

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/user/verifyemail',{token});
            setVerified(true);
        } catch (error: any) {
            console.error("Error verifying email:", error.message);
            setError("Failed to verify email. Please try again later.");
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col justify-center items-center text-center min-h-screen ">
            <div>
                <h1 className="text-4xl text-center text-green-500">Verify Email</h1>
                <p className="m-1 p-2 text-amber-200">Please check your email for the verification link.</p>
                <p className="bg-cyan-500 rounded-xl p-2">{token ? `${token}` : "No Token"}</p>
                {verified && (
                    <div className="bg-green-500 rounded-2xl p-2 text-green-200">
                        <p className="text-2xl">Email verified successfully!</p>
                        <Link href="/login" className="text-blue-500 underline">Login</Link>
                    </div>
                )}
                {error && (
                    <div className="bg-red-500 text-black rounded-2xl p-2">
                        <p className="text-xl">Error</p>
                    </div>
                )}
            </div>
        </div>
    );
}