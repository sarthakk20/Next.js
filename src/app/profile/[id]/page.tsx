"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Profile({ params }: ProfilePageProps) {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/user/logout');
            console.log("Logout successfully!!!");
            toast.success("Logout successfully, Redirecting to login page...");
            router.push('/login');
        } catch (error: unknown) {
        const message =
        error instanceof Error ? error.message : "Something went wrong";
        toast.error("Error logging out! Please try again.");

        console.log(message);
        }
    }
    
    const { id } = await params;

    return (
        <div id='profilePage' className="flex items-center justify-center h-screen text-center">
            <div>
                <h1 className="text-center text-4xl p-2 mb-2 text-white">Profile Page</h1>
                <p className="text-xl mb-3 text-center text-gray-200">This is the users profile page</p>
                <span id="idName" className="text-gray-700 p-2 text-2xl border-0 rounded-lg mt-2">
                    {id}
                </span>

                <div className="flex items-center justify-center">
                    
                        <div className='mr-2'>
                        <button
                        id='resetButton'
                        onClick={logout}
                        className="bg-blue-500 p-3 mt-4 hover:bg-blue-700 rounded-lg text-white"
                        >Logout</button>
                        </div>
                    
                </div>
            </div>
        </div>
    );
}
