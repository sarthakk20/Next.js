export default function Profile({params}:any) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1 className="text-center text-4xl p-2 m-2">Profile Page</h1>
                <p>This is the users profile page. <span className="bg-orange-500 p-2 text-3xl">{params.id}</span> </p>
            </div>
        </div>
    );
    }