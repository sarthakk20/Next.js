
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<boolean | string>(false);

    useEffect(() => {
        const urlToken = new URLSearchParams(
            window.location.search
        ).get("token");

        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (!token) return;

        const verifyUserEmail = async () => {
            try {
                await axios.post("/api/user/verifyemail", { token });
                setVerified(true);
            } catch (error: unknown) {
                const message =
                    axios.isAxiosError(error)
                        ? error.response?.data?.error || error.message
                        : error instanceof Error
                            ? error.message
                            : "Something went wrong";

                setError(String(message));
                console.error(message);
            }
        };

        verifyUserEmail();
    }, [token]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            {verified ? (
                <div>
                    <h2>Email Verified Successfully!</h2>
                    <Link href="/login">Login here</Link>
                </div>
            ) : error ? (
                <div>
                    <h2>Email Verification Failed</h2>
                    <p>{String(error)}</p>
                </div>
            ) : (
                <h2>Verifying your email...</h2>
            )}
        </div>
    );
}
