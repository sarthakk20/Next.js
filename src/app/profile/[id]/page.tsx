export default function Profile({params}:any) {


    return (
        <div id='profilePage' className="flex items-center justify-center h-screen text-center">
            <div>
                <h1 className="text-center text-4xl p-2 mb-2 text-white">Profile Page</h1>
                    <p className="text-xl mb-3 text-center text-gray-200">This is the users profile page</p>
                    <span id="idName" className="text-gray-700 p-2 text-2xl border-0 rounded-lg mt-2">
                    {params.id}</span> 
                    
            </div>
        </div>
    );
    }