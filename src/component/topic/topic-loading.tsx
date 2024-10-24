import { RiHeartAdd2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { FaSort } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";

export default async function TopicLoading() {
    return (
        <div className="text-base w-full max-w-[1380px] mx-auto grid md:gap-2 lg:gap-4 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_7fr_3fr] md:p-4 ">
            {/* Left */}
            <div className="md:w-16 md:row-span-2">
                <div className="md:rounded-lg md:p-0 md:bg-gray-100 md:grid md:gap-5 md:sticky md:justify-stretch md:top-[128px] 
                            fixed shadow-md md:shadow-none rounded-md bg-white p-2 bottom-0 left-0 right-0 
                        ">
                    <div className="md:grid flex md:gap-4 md:justify-stretch items-center justify-around">
                        {/* Like */}
                        <button
                            type="button"
                            className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                        >
                            <span className="w-10 h-10 p-2">
                                <RiHeartAdd2Line size={24} />
                            </span>

                            <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                                {/* Heart count */}
                                <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse " />
                            </span>
                        </button>

                        {/* Comment */}
                        <button
                            type="button"
                            className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                        >
                            <span className="w-10 h-10 p-2">
                                <FaRegComment size={24} />
                            </span>

                            <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                                {/* Heart count */}
                                <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse " />
                            </span>
                        </button>

                        {/* Book Mark */}
                        <button
                            type="button"
                            className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                        >
                            <span className="w-10 h-10 p-2">
                                <FaRegBookmark size={24} />
                            </span>
                            <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                                {/* Heart count */}
                                <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse " />
                            </span>
                        </button>

                        {/* Copy link, details */}
                        <button
                            type="button"
                            className="flex inline-flex md:flex-col hover:bg-white rounded-full text-gray-700 items-center leading-base m-0"
                        >
                            <span className="w-10 h-10 p-2">
                                <HiOutlineDotsHorizontal size={24} className="rounded-full" />
                            </span>
                        </button>

                    </div>
                </div>
            </div>

            {/* Center */}
            <div className="grid gap-4 min-w-0 ">
                {/* Topic content */}
                <div className="mb-4 rounded-md bg-white text-black p-0">
                    <div className="">
                        {/* Image */}
                        <div className="aspect-[5/2] max-h-[420px] max-w-[1000px] rounded-t-md bg-gray-300 animate-pulse " />

                        {/* Header of the topic */}
                        <div className="lg:px-16 lg:pt-8 md:px-12 md:pt-8 px-5 flex flex-col pt-5">
                            <div className="sm:items-start sm:flex-row flex flex-col">
                                {/* User Info */}
                                <div className="flex mb-5 flex-1 items-start">
                                    {/* Icon */}
                                    <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse' />

                                    <div className="pl-3 flex-1 flex flex-col gap-2">
                                        {/* User name */}
                                        <div className="h-[24px] w-30 bg-gray-300 animate-pulse rounded-md" />

                                        {/* Posted date */}
                                        <div className="h-[24px] w-40 bg-gray-300 animate-pulse rounded-md" />
                                    </div>
                                </div>
                            </div>
                            {/* Title */}
                            <div className="break-words">
                                <h1 className="lg:text-5xl md:text-4xl sm:font-[800] font-[700] leading-xl text-3xl mb-2">
                                    <div className="h-[48px] w-100 bg-gray-300 animate-pulse rounded-md" />
                                </h1>
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="mb-4 lg:px-16 p-5 md:px-12 md:py-8">
                            <div className="flex mb-6 justify-between items-center">
                                <div className="flex items-center">
                                    <h2 className="sm:text-2xl text-xl sm:leading-base font-[700] text-black leading-sm">
                                        Top comments <span>(<div className="rounded-full bg-gray-300 animate-pulse h-[27.5px] w-[27.5px]" />)</span>
                                    </h2>
                                    <button
                                        className="inline-block rounded-md py-2 px-4 text-center"
                                    >
                                        <FaSort size={24} />
                                    </button>
                                </div>
                                <div className="flex rounded-md border-2 border-gray-300 py-2 px-4 text-base inline-block leading-base font-[500] border-solid text-center">
                                    {/* subscribe or unsubscribe */}
                                    <button
                                        type="button"
                                        className=""
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>

                            <form className="flex mb-4">
                                <span
                                    className="mr-2 shrink-0 md:w-8 w-5 md:h-8 h-5 inline-block rounded-full align-middle"
                                >
                                    <div className="shrink-0 md:w-8 w-5 md:h-8 h-5 bg-gray-300 animate-pulse rounded-full" />
                                </span>

                                <div className="flex flex-col w-full">
                                    {/* Comment area */}
                                    <div className={` flex flex-col flex min-w-0 mb-3 bg-gray-300 animate-pulse border-1 border-solid border-gray-200 rounded-md w-full`}>
                                        <div                                        
                                            className={`h-[40vh] min-h-16 resize-none bg-gray-300 animate-pulse rounded-md outline-none  w-full leading-base text-base p-2 border-2`}
                                        />
                                    </div>                                    
                                </div>

                            </form>

                            {/*  */}
                            <div className="text-center text-sm flex items-center justify-center">
                                <Link href="/" className="text-black">
                                    Code of conduct
                                </Link>
                                <span className="px-2 opacity-25">
                                    <LuDot />
                                </span>
                                <Link href="/" className="text-black">
                                    Report abuse
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}