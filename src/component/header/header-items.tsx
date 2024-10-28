"use client"
import Link from "next/link";
import { IoNotificationsOutline, IoSearch } from "react-icons/io5";
import paths from "~/server/paths";
import Image from "next/image";
import { useState } from "react";

interface HeaderItemsProps {
    id: string;
    name: string;
    image?: string;
}

export default function HeaderItems({ id, name, image }: HeaderItemsProps) {
    const [isIconClick, setIsIconClick] = useState(false);

    return (
        <>
            <div className="flex items-center h-full ml-auto shrink-0">
                {/* Search icon */}
                <div className="flex md:hidden">
                    <Link
                        href={paths.searchPage('')}
                        className="bg-white text-gray-500 font-[700] mx-1 p-2 inline-block rounded-md w-full hover:text-blue-700 hover:bg-blue-300 "
                    >
                        <IoSearch size={27} />
                    </Link>
                </div>
                {/* LogIn */}
                {!name &&
                    <div className="block md:flex hidden">
                        <Link
                            href={paths.login()}
                            className="flex items-center justify-center mr-2 bg-transparent text-gray-500 hover:bg-blue-100 hover:text-blue-500 text-lg px-4 py-1.5 rounded-md border border-transparent hover:border-blue-500"
                        >
                            Login
                        </Link>
                    </div>
                }
                {/* create post or create account */}
                <div className="mr-2">
                    <Link
                        href={id ? paths.createNewTopic() : paths.signInPath()}
                        className="flex items-center text-nowrap sm:mr-2 justify-center bg-transparent hover:bg-blue-300 text-blue-700 hover:text-white border-blue-700 hover:border-blue-300 border-2 px-4 py-1.5 rounded-md"
                    >
                        {id ? "Create post" : "Create account"}
                    </Link>
                </div>
                {/* Notification */}
                {name &&
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="mx-1 p-2 inline-block bg-white text-gray-500 rounded-md w-full hover:text-blue-500 hover:bg-blue-300"
                        >
                            <IoNotificationsOutline size={24} />
                        </Link>
                    </div>
                }
                {/* Profile */}
                {name &&
                    // <ProfileIcon id={id} name={name ?? ""} image={image ?? ""}/>
                    <div className="mx-1 flex shrink-0"
                        onClick={() => setIsIconClick(prev => !prev)}
                    >
                        <button
                            type="button"
                            className="items-center justify-center falex p-1 rounded-full bg-transparent text-center  "
                        >
                            {image ?
                                <Image
                                    src={image}
                                    alt={name}
                                    width={32}
                                    height={32}
                                    className="rounded-full h-8 w-8 align-bottom inline-block object-cover aspect-1/1"
                                />
                                :
                                <div className="h-8 w-8 bg-lime-500 rounded-full " />
                            }
                        </button>
                    </div>
                }
            </div>
            {/* Drop */}
            {isIconClick &&
                <div className="h-100 absolute z-100 mt-14 left-2 right-2  min-w-[250px] z-[400] sm:w-[250px] sm:left-auto inline-block bg-white text-gray-800 rounded-md shadow-xl p-2 min-w-[250px]">
                    <ul className="block">
                        <li className="text-left pb-2 mb-2 border-b border-solid border-gray-500">
                            {/* Profile page */}
                            <Link
                                href={paths.profilePage(id)}
                                className="leading-5 bg-transparent hover:bg-blue-300 text-gray-700 hover:blue-500 flex px-4 py-2 rounded-md w-full"
                            >
                                <div>
                                    <span className="block font-[500]">{name}</span>
                                    <span className="text-sm opacity-75">{id}</span>
                                </div>
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                href="/"
                                className="bg-transparent hover:bg-blue-300 text-gray-700 hover:blue-500 flex px-4 py-2 rounded-md w-full"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                href={paths.createNewTopic()}
                                className="bg-transparent hover:bg-blue-300 text-gray-700 hover:blue-500 flex px-4 py-2 rounded-md w-full"
                            >
                                Create Post
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                href={paths.readingListPage(id)}
                                className="bg-transparent hover:bg-blue-300 text-gray-700 hover:blue-500 flex px-4 py-2 rounded-md w-full"
                            >
                                Reading List
                            </Link>
                        </li>
                        <li className="pb-2 border-b border-0 border-solid border-gray-500">
                            <Link
                                href="/"
                                className="bg-transparent hover:bg-blue-300 text-gray-700 hover:blue-500 flex px-4 py-2 rounded-md w-full"
                            >
                                Setting
                            </Link>
                        </li>
                        <li className="pt-2">
                            <Link
                                href={paths.signOut()}
                                className="bg-transparent hover:bg-blue-300 text-gray-700 hover:blue-500 flex px-4 py-2 rounded-md w-full"
                            >
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}