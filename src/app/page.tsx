import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div id='homePage' className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            
          <div className="text-center">
            <h1 className="text-4xl p-2 mb-6 ">Auth Using Next.js</h1>
          <p className="text-lg text-gray-300">
            This is a authentication system using Next.js, MongoDB, Typescript and Tailwind CSS.
          </p>

          <div className="flex justify-center mt-6">
            <Link  id="resetButton" href="/login" className="hover:bg-gray-700 m-2 p-3 bg-gray-600 text-white rounded-lg">
            Go to Login
          </Link>
          <Link href="/signup"  id="resetButton" className="hover:bg-gray-700 m-2 p-3 bg-gray-600 text-white rounded-lg">
            Go to Signup
          </Link>
          </div>
          </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link href="/resetpassword" className="underline text-gray-300 hover:underline">
          Reset Password
        </Link>
        
      </footer>
    </div>
  );
}
