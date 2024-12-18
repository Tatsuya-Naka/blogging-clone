import LogInButton from "~/component/auth/login-button";
import LoginCredentailForm from "~/component/auth/login-credential-form";
import Image from "next/image";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default async function LogInPage() {

    const getIcon = (id: string) => {
        switch (id) {
            case 'github':
                return <FaGithub size={24} />;
            case 'google':
                return <FaGoogle size={24} />;

            default:
                return null;
        }
    };

    return (
        <div className="p-0 h-0 bg-yellow-50 flex justify-center">
            <div className="max-w-[1380px] min-h-screen w-full">
                <div className="bg-white rounded-lg p-4 sm:m-auto h-full w-full">
                    <div className="sm:rounded-md sm:px-12 sm:py-6 mx-auto sm:max-w-[640px] w-full">
                        <div className="mb-6 flex flex-col items-center justify-center ">
                            <Image
                                src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
                                alt="image"
                                width={200}
                                height={160}
                                className="w-auto h-[48px] aspect-[5/4]"
                            />
                            <h1 className="sm:text-3xl mt-4 leading-tight text-black text-2xl">
                                Join the DEV Community
                            </h1>
                            <p className="mt-1 text-black text-base ">
                                More than 2 million developers are joining the DEV Community now!!
                            </p>
                        </div>

                        <div className="w-full h-full">
                            {/* third party auth */}
                            <div className="mt-4 grid gap-3 w-full">
                                <LogInButton id="github">
                                    {getIcon("github")}
                                    <span className="flex w-full font-[500] text-basis justify-center items-center">
                                        Login with {"GitHub"}
                                    </span>
                                </LogInButton>
                                <LogInButton id="google">
                                    {getIcon("google")}
                                    <span className="flex w-full font-[500] text-basis justify-center items-center">
                                        Login with {"Google"}
                                    </span>
                                </LogInButton>
                            </div>
                            <div className="">
                                {/* Credentials */}
                                <div className="my-8 flex items-center gap-2 justify-between w-full">
                                    <div className="border-1 bg-gray-200 h-0.5 w-full" />
                                    <span className="px-4 text-sm">OR</span>
                                    <div className="border-1 bg-gray-200 h-0.5 w-full" />
                                </div>

                                {/* Email & username & password */}
                                <LoginCredentailForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}