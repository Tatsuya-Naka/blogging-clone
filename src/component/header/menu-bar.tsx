"use client";
import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import paths from "~/server/paths";
import SideLinksPages from "../common/side-pages";

interface MenuBarProps {
    id: string;
}

export default function MenuBar({ id }: MenuBarProps) {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    return (
        <>
            <button
                type="button"
                className="mx-2 p-2 bg-transparent text-black hover:text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-200 "
                onClick={() => setIsButtonClicked(true)}
            >
                <IoIosMenu size={24} />
            </button>

            {isButtonClicked &&
                <div className="relative">
                    <div className="bg-black opacity-50 fixed inset-0 z-0"> </div>
                    <div className="block fixed inset-0 z-[10]">
                        <div className="bg-white max-w-[300px] w-10/12 z-1 fixed h-screen overflow-y-auto ">
                            {/* header */}
                            <nav className="min-h-14 flex items-center justify-between pr-2 pl-4 ">
                                <h2 className="break-word flex flex-1 font-[700] leading-5 text-lg">
                                    DEV Community
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsButtonClicked(false)}
                                    className="flex shrink-0 p-1 bg-transparent rounded-md hover:bg-blue-300 hover:text-blue-500"
                                >
                                    <IoClose size={24} />
                                </button>
                            </nav>

                            {/* Sidebar content */}
                            <div className="p-2 block">
                                {/* Create account if no session */}
                                {!id &&
                                    <div className="p-4 bg-white text-basis rounded-md shadow-lg">
                                        <h2 className="leading-5 mb-4 sm:text-xl text-lg leading-sm font-[700] text-black">
                                            DEV Community is a community of more than 2 million developers!
                                        </h2>
                                        <p className="mb-4 text-gray-500">
                                            We are a place where coders share, stay up-to-date and grow their careers.
                                        </p>
                                        <div className="flex flex-col items-center">
                                            {/* signin */}
                                            <Link
                                                href={paths.signInPath()}
                                                className="mb-1 w-full justify-center bg-transparent hover:bg-blue-500 text-blue-300 hover:text-white border-blue-300 hover:border-blue-500 font-[500] border-2 border-solid px-4 py-2 rounded-md inline-flex"
                                            >
                                                Create Account
                                            </Link>
                                            {/* Login */}
                                            <Link
                                                href={paths.login()}
                                                className="mb-1 w-full justify-center bg-transparent hover:bg-blue-300 text-gray-500 hover:text-blue-700 font-[500] px-4 py-2 rounded-md inline-flex"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                    </div>
                                }

                                {/* Link */}
                                <SideLinksPages />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}