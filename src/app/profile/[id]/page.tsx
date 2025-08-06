export default function Profile({params}:any) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1 className="text-center text-4xl p-2 m-2 text-orange-400">Profile Page</h1>
                <p className="text-2xl">This is the users profile page <span className="bg-gray-500 p-2 text-2xl">{params.id}</span> </p>
            </div>
        </div>
    );
    }