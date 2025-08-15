import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            
          <div className="text-center">
            <h1 className="text-3xl p-2 mb-3">Auth Using Next.js</h1>
          <p className="text-lg text-gray-500">
            This is a authentication system using Next.js, MongoDB, Typescript and Tailwind CSS.
          </p>

          <div className="mt-6">
            <Link href="/login" className="hover:bg-gray-700 m-2 p-3 bg-gray-600 text-white rounded-lg">
            Go to Login Page
          </Link>
          <Link href="/signup" className="hover:bg-gray-700 m-2 p-3 bg-gray-600 text-white rounded-lg">
            Go to Signup Page
          </Link>
          </div>
          </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link href="/resetpassword" className="text-gray-300 hover:underline">
          Reset Password
        </Link>
        
      </footer>
    </div>
  );
}
