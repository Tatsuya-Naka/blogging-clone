import Image from "next/image"
import Link from "next/link"
import bgImage from "../../../public/simple_b.png"
import { BsEmojiSunglasses } from "react-icons/bs";
import { BsEmojiKiss } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";

export default async function TopicLists() {
    return (
        <div className="py-0 h-full w-full bg-white md:rounded-md shadow-md">
            {/* Title */}
            <div className="md:p-5 p-4 sm:text-2xl mb-2 md:rounded-b-md">
                {/* User icon  */}
                <div className="md:mb-2 flex items-center justify-between">
                    <div className="flex items-center leading-sm text-sm">
                        {/* User image icon */}
                        <div className="mr-2">
                            <Link
                                href="/"
                                className="w-8 h-8 inline-block rounded-full shrink-0"
                            >
                                <Image
                                    src={bgImage}
                                    alt="User icon"
                                    width={90}
                                    height={90}
                                    className="rounded-full h-full w-full align-bottom"
                                />
                            </Link>
                        </div>

                        {/* Name & Popup */}
                        <div className="mr-2">
                            {/* Go to the user profile */}
                            <Link
                                href="/"
                                className="md:hidden font-[500] text-black p-1 cursorpointer "
                            >
                                {"Tatsuya"}
                            </Link>
                            <div className="md:inline-block hidden relative font-[500]">
                                <button
                                    type="button"
                                    className="text-sm p-1 -ml-1 -my-2 bg-transparent hover:bg-gray-50 text-black rounded-md"
                                >
                                    {"Tatsuya"}
                                </button>

                                {/* Pop up */}
                                {/* <div>
                                    {popup()}
                                </div> */}
                            </div>

                            {/* Date created */}
                            <Link href="/" className="text-sm text-black">
                                <p className="pl-1">Sep 7</p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Title & Tags */}
                <div className="md:pl-10">
                    {/* title */}
                    <h2 className="md:mb-1 text-black text-2xl font-bold hover:text-blue-800">
                        <Link
                            href="/"
                            className=""
                        >
                            17 Must-know React Projects for Developers
                        </Link>
                    </h2>

                    {/* Tags */}
                    <div className="mb-2 -ml-1 text-sm flex flex-wrap gap-1 text-gray-700">
                        <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                            #discuss
                        </Link>
                        <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                            #react
                        </Link>
                        <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                            #javascript
                        </Link>
                        <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                            #programming
                        </Link>
                    </div>

                    {/* Reaction comments and read and fav*/}
                    <div className="flex items-center justify-between text-sm leading-sm ">
                        <div className="flex -ml-2">
                            {/* Topic id */}
                            <Link
                                href="/"
                                className="pl-2 bg-transparent hover:bg-gray-100 rounded-md w-full px-1 py-3 flex gap-2 leading-base items-center "
                            >
                                <div className="flex items-center ">
                                    <div className="flex items-center">
                                        {/* Reaction Icon */}
                                        <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                            <BsEmojiSunglasses size={18} />
                                        </span>
                                        <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                            <BsEmojiKiss size={18} />
                                        </span>
                                        <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                            <BsEmojiSunglasses size={18} />
                                        </span>
                                        <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                            <BsEmojiKiss size={18} />
                                        </span>
                                    </div>
                                    {/* Reactions */}
                                    <div className="ml-4 flex gap-1 items-center font-[300]">
                                        8
                                        <span className="sm:inline hidden">reactions</span>
                                    </div>
                                </div>
                            </Link>
                            {/* Comments */}
                            <Link
                                href="/"
                                className="flex items-center pl-2 bg-transparent hover:bg-gray-100 rounded-md text-gray-500 px-1 text-sm gap-2 rounded-md leading-base "
                            >
                                <FaRegComment size={24} className="mr-1" />
                                6<span className="sm:inline hidden">comments</span>
                            </Link>
                        </div>

                        {/* Read and Fav */}
                        <div className="flex items-center">
                            <p className="text-sm mr-2 text-black">1 min read</p>
                            <button
                                type="button"
                                className="inline-block rounded-md text-center bg-transparent hover:bg-gray-100 p-2 text-black"
                            >
                                <span className="inline-flex f">
                                    <CiBookmark size={24} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}