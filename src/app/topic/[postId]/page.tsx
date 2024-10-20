import Header from "~/component/header/header";
import { HydrateClient } from "~/trpc/server";
import { RiHeartAdd2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import bgImage from '../../../../public/simple_b.png';
import Link from "next/link";
import Image from "next/image";
import { FaSort } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { FaFire } from "react-icons/fa";

export default async function TopicPage() {

    return (
        <HydrateClient>
            <Header />
            <main className="pt-14 min-h-screen flex flex-1 text-lg bg-gray-100">
                <div className="text-base w-full max-w-[1380px] mx-auto grid md:gap-2 lg:gap-4 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_7fr_3fr] md:p-4 ">
                    {/* Left side bar */}
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
                                        0
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
                                        0
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
                                        0
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

                    {/* Center page */}
                    <div className="grid gap-4 min-w-0">
                        {/* Topic content */}
                        <div className="mb-4 rounded-md bg-white text-black p-0">
                            <div>
                                {/* Image */}
                                <div className="">
                                    <Link
                                        // image url
                                        href=""
                                        className="md:rounded-t-md max-h-[calc(100vh-56px-2rem)] overflow-hidden"
                                    >
                                        <Image
                                            src={bgImage}
                                            alt={"bgimage"}
                                            width={1000}
                                            height={420}
                                            className="aspect-[5/2] object-cover max-h-[420px] max-w-[1000px] m-auto w-full md:rounded-t-md"
                                        />
                                    </Link>

                                    {/* Header of the topic */}
                                    <div className="lg:px-16 lg:pt-8 md:px-12 md:pt-8 px-5 flex flex-col pt-5 ">
                                        <div className="sm:items-start sm:flex-row flex flex-col">
                                            {/* If there is a user id */}
                                            <div className="sm:mb-0 mb-4 sm:order-[9999] bg-orange-100 border-2 border-solid border-orange-100 rounded-md p-1">
                                                {/* Edit */}
                                                <Link
                                                    href="/"
                                                    className="px-2 text-sm inline-block cursor-pointer hover:opacity-60"
                                                >
                                                    Edit
                                                </Link>
                                                {/* Manage */}
                                                <Link
                                                    href="/"
                                                    className="px-2 text-sm inline-block cursor-pointer hover:opacity-60"
                                                >
                                                    Manage
                                                </Link>
                                                {/* isPrivate ? Archive : hide */}
                                                <Link
                                                    href="/"
                                                    className="px-2 text-sm inline-block cursor-pointer hover:opacity-60"
                                                >
                                                    Hide
                                                </Link>
                                            </div>

                                            {/* User Info */}
                                            <div className="flex mb-5 flex-1 items-start">
                                                {/* Icon */}
                                                <Link className="" href="/">
                                                    <Image
                                                        src={bgImage}
                                                        alt="Icon Image"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full h-10 w-10"
                                                    />
                                                </Link>
                                                <div className="pl-3 flex-1 flex flex-col">
                                                    {/* User name */}
                                                    <Link href="/" className="font-[500]">
                                                        Tatsuya
                                                    </Link>
                                                    {/* Posted date */}
                                                    <p className="text-xs text-black">
                                                        Posted on Sep 1
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Title */}
                                        <h1 className="lg:text-5xl md:text-4xl sm:font-[800] font-[700] leading-xl text-3xl mb-2">
                                            Testing hell 😱. Honest question. How do you survive? What's your secret?
                                        </h1>

                                        {/* Tags */}
                                        <div className="flex flex-wrap">
                                            <Link
                                                href="/"
                                                className="bg-transparent rounded-md inline-flex items-center px-2 py-1 text-sm hover:bg-gray-200 rounded-md"
                                            >
                                                #CSS
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:px-16 p-3 md:px-12 md:py-8">
                                        <div className="text-xl">
                                            We've just spent the worst couple of hours trying to work with Jest with SVG, nanoid, ... Anything that's slightly out of the ordinary Jest won't work and we found out we were spending more time debugging Jest than debugging our code. So... please help us. How do you survive the testing hell??
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <div className="mb-4 lg:px-16 p-5 md:px-12 md:py-8">
                                        <div className="flex mb-6 justify-between items-center">
                                            <div className="flex items-center">
                                                <h2 className="sm:text-2xl text-xl sm:leading-base font-[700] text-black leading-sm">
                                                    Top comments <span>(0)</span>
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
                                                <Image
                                                    src={bgImage}
                                                    alt="Icon Image"
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full h-full w-full"
                                                />
                                                {/* <div className="shrink-0 md:w-8 w-5 md:h-8 h-5 bg-green-200 rounded-full"/> */}
                                            </span>

                                            {/* Comment area */}
                                            <div className="flex flex-col flex min-w-0 mb-3 bg-white border-1 border-solid border-gray-200 rounded-md w-full">
                                                <textarea
                                                    name="comment"
                                                    className="resize-none outline-none max-h-[40vh] w-full leading-base text-base p-2 border-2 rounded-md"
                                                    placeholder="Add to the discussion"
                                                />
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

                    {/* Right bar */}
                    <div className="w-full pb-4">
                        {/* Profile box */}
                        <div className="grid pt-0 p-4 gap-4 bg-white md:rounded-md border-t-[2rem] border-t-solid border-t-black">
                            <div className="-mt-4 ">
                                {/* User Info */}
                                <Link href="/" className="flex">
                                    {/* User Icon */}
                                    <span className="mr-2 shrink-0 w-12 h-12 inline-block rounded-full bg-lime-50 align-middle">
                                        <Image
                                            src={bgImage}
                                            alt="User Icon"
                                            width={100}
                                            height={100}
                                            className="rounded-full w-full h-full inline-block align-bottom"
                                        />
                                    </span>
                                    {/* User name */}
                                    <span className="mt-5 text-black sm:text-xl text-lg sm:leading-base font-[700]">
                                        Tatsuya
                                    </span>
                                </Link>
                            </div>

                            {/* Edit profile or follow */}
                            <button
                                type="button"
                                className="w-full py-2 px-4 text-base rounded-md leading-base font-[500] text-center cursor-pointer bg-blue-500 text-white hover:bg-blue-800"
                            >
                                Follow
                            </button>

                            <div className="pt-3">
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <p className="text-sm font-[500] text-gray-800 ">404 bio</p>
                                    </li>
                                    <li>
                                        <p className="text-sm font-[700] text-gray-800 uppercase">Joined</p>
                                        {/* Joined Date */}
                                        <p className="text-base"  >
                                            Sep 4, 2024
                                        </p>
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

                </div>
            </main>
            {/* footer */}
            <footer className="p-12 bg-gray-300 text-black">
                <div className="py-1 max-w-[1380px] mx-auto flex flex-col gap-2">
                    <p className="text-center font-bold mb-2.5">
                        Thank you to our Diamond Sponsor Neon for supporting our community.

                        DEV Community — A constructive and inclusive social network for software developers. With you every step of your journey.

                        Home
                        DEV++
                        Podcasts
                        Videos
                        Tags
                        DEV Help
                        Forem Shop
                        Advertise on DEV
                        DEV Challenges
                        DEV Showcase
                        About
                        Contact
                        Free Postgres Database
                        Guides
                        Software comparisons
                        Code of Conduct
                        Privacy Policy
                        Terms of use
                        Built on Forem — the open source software that powers DEV and other
                    </p>
                </div>
            </footer>
        </HydrateClient>
    )
}