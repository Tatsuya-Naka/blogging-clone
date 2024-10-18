import Link from "next/link"
import paths from "~/server/paths"

export default async function ErrorAuth() {
    return (
        <div className="m-0 p-0 bg-yellow-50 min-h-screen flex justify-center items-center ">
            <div className="bg-white fixxed shadow-lg flex justify-center items-center p-10 rounded-lg top-0 bottom-0 right-0 left-0 m-auto">
                <div className="flex flex-col gap-5">
                    <div className="w-full px-3 py-2 text-gray-800 text-bold text-2xl">
                        Error Occured. Sigin Again.
                    </div>
                    <Link
                        href={paths.signInPath()}
                        className="border-lime-500 border-bold border-2 rounded-lg text-xl w-full px-3 py-1 flex justify-center items-center hover:opacity-60"
                    >
                        SignIn
                    </Link>
                </div>
            </div>
        </div>
    )
}