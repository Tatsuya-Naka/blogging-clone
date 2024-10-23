import Link from "next/link";
import Image from "next/image";
import { FaFire } from "react-icons/fa";
import { getServerAuthSession } from "~/server/auth";
import PostDateFormatter from "../common/post-date-format";
import type { User } from "@prisma/client";
import paths from "~/server/paths";

interface TopicCenterProps {
    user: User
}

export default async function TopicRightSide({ user }: TopicCenterProps) {

    const session = await getServerAuthSession();

    return (
        <div className="w-full pb-4">
            {/* Profile box */}
            <div className="grid pt-0 p-4 gap-4 bg-white md:rounded-md border-t-[2rem] border-t-solid border-t-black">
                <div className="-mt-4 ">
                    {/* User Info */}
                    <Link href={paths.profilePage(user.id)} className="flex">
                        {/* User Icon */}
                        <span className="mr-2 shrink-0 w-12 h-12 inline-block rounded-full bg-lime-50 align-middle">
                            {user.image ?
                                <Image
                                    src={user.image}
                                    alt="User Icon"
                                    width={100}
                                    height={100}
                                    className="rounded-full w-full h-full inline-block align-bottom"
                                />
                                :
                                <span className='w-24 h-24 rounded-full inline-block align-bottom' />
                            }
                        </span>
                        {/* User name */}
                        <span className="mt-5 text-black sm:text-xl text-lg sm:leading-base font-[700]">
                            {user.name}
                        </span>
                    </Link>
                </div>

                {/* Edit profile or follow */}
                {user.id === session?.user.id ?
                    <Link
                        href="/"
                        className="w-full py-2 px-4 text-base rounded-md leading-base font-[500] text-center cursor-pointer bg-blue-500 text-white hover:bg-blue-800"
                    >
                        Edit
                    </Link>
                    :
                    <button
                        type="button"
                        className="w-full py-2 px-4 text-base rounded-md leading-base font-[500] text-center cursor-pointer bg-blue-500 text-white hover:bg-blue-800"
                    >
                        Follow
                    </button>
                }

                <div className="pt-3">
                    <ul className="flex flex-col gap-3">
                        <li>
                            <p className="text-sm font-[500] text-gray-800 ">404 bio</p>
                        </li>
                        <li>
                            <p className="text-sm font-[700] text-gray-800 uppercase">Joined</p>
                            {/* Joined Date */}
                            <PostDateFormatter date={user.createdAt} className="text-base" />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-white text-black md:rounded-md mt-4 ">
                <div className="py-3 px-4 border-b-1 border-b-solid border-white">
                    <h3 className="sm:text-xl text-lg sm:leading-base font-[700] ">
                        Trending on <a href="https://dev.to">Dev Community</a>
                        <FaFire size={24} className="text-red-700" />
                    </h3>
                </div>

                <div>
                    <Link
                        href="/"
                        className="flex p-4 border-b-2 border-b-solid border-gray-100 text-black hover:bg-gray-100"
                    >
                        <span className="mr-2 shrink-0 inline-block rounded-full bg-black w-6 h-6 align-middle">
                            {/* <Image/> */}
                        </span>
                        <div className="">
                            Building a Personal Finance App with Archetect
                            <div className="text-black text-sm pt-1 -mt-1">
                                <span className="mr-1 ">
                                    #CSS
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/"
                        className="flex p-4 border-b-2 border-b-solid border-gray-100 text-black hover:bg-gray-100"
                    >
                        <span className="mr-2 shrink-0 inline-block rounded-full bg-black w-6 h-6 align-middle">
                            {/* <Image/> */}
                        </span>
                        <div className="">
                            Building a Personal Finance App with Archetect
                            <div className="text-black text-sm pt-1 -mt-1">
                                <span className="mr-1 ">
                                    #CSS
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/"
                        className="flex p-4 border-b-2 border-b-solid border-gray-100 text-black hover:bg-gray-100"
                    >
                        <span className="mr-2 shrink-0 inline-block rounded-full bg-black w-6 h-6 align-middle">
                            {/* <Image/> */}
                        </span>
                        <div className="">
                            Good First Issue: Make your first open-source contribution
                            <div className="text-black text-sm pt-1 -mt-1">
                                <span className="mr-1">
                                    #CSS
                                </span>
                                <span className="mr-1">
                                    #Java
                                </span>
                                <span className="mr-1">
                                    #Google
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}