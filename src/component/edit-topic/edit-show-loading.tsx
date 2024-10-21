import Image from "next/image";
import Link from "next/link";
import paths from "~/server/paths";
import { IoIosClose } from "react-icons/io";
import { FaBold } from "react-icons/fa6";
import { TbNut } from "react-icons/tb";


export default async function EditShowLoading() {

    return (
        <form className="md:grid md:grid-cols-[64px_7fr_3fr] max-w-[1380px] lg:px-4 md:px-2 min-h-screen gap-x-4 mx-auto text-base"
        >
            {/* Header */}
            <div className="lg:col-start-1 md:col-span-2 md:p-0 flex items-center h-14 px-2">
                <span className="sm:mr-4 mr-1 md:block hidden">
                    <Link
                        href={paths.home()}
                        className="lg:max-w-[200px] lg:text-xl md:max-w-[175px] md:text-lg md:font-[700] sm:max-w-[150px] inline-flex flex shrink-0 align-middle items-center tracking-tight leading-sm"
                    >
                        <Image
                            src="https://media.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                            alt="Home"
                            width={50}
                            height={40}
                            className="h-full w-full aspect-[5/4] object-contain inline-block"
                        />
                    </Link>
                </span>

                <span className="flex flex-1 items-center text-black font-[500] sm:inline-block hidden mr-2">
                    Create Post
                </span>

                <nav className="ml-auto sm:py-2 p-1 text-base flex border-none">
                    <ul className="flex p-0 w-full">
                        {/* Edit */}
                        <li className="w-full">
                            <button
                                type="button"
                                className="font-[700] text-black sm:w-auto hover:bg-white hover:text-blue-800 sm:mx-1 p-2 inline-flex items-center text-base rounded-md"
                            >
                                Edit
                            </button>
                        </li>
                        {/* Preview */}
                        <li className="w-full">
                            <button
                                type="button"
                                className="font-[500] text-black sm:w-auto hover:bg-white hover:text-blue-800 sm:mx-1 p-2 inline-flex items-center text-base rounded-md"
                            >
                                Preview
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* close */}
                <div className="lg:absolute lg:right-2 lg:top-2 lg:ml-0 ml-1">
                    <button
                        type="button"
                        className="p-1 bg-transparent hover:bg-gray-200 text-black text-center hover:bg-white rounded-md"
                    >
                        <IoIosClose size={24} />
                    </button>
                </div>
            </div>

            {/* Form */}
            <div className="rounded-md bg-white text-black shadow-md lg:col-start-2 md:col-span-2 lg:col-span-1 overflow-y-auto h-[calc(100vh-144px)] flex flex-col">
                <div className="lg:px-16 md:px-12 px-6 md:py-8 py-4 rounded-t-md ">
                    {/* Add image */}
                    <div className="flex flex-row sm:items-center sm:mb-5 mb-4 items-center">
                        {/* Need to add a feature to change the ui after adding an image here */}
                        <div className="flex items-center gap-8">
                            <span 
                                className="w-[250px] h-[105px] rounded-md animate-pulse"
                            />
                            <div className="flex items-center">
                                {/* <label className="bg-transparent cursor-pointer border-gray-300 text-black border-2 border-solid rounded-md py-1.5 px-3.5 leading-base shadow-md text-base ">
                                    <input
                                        type="file"
                                        className="hidden "
                                        name="coverImage"
                                        onChange={handleImageFile}
                                    />
                                </label> */}
                                {/* {bgImageFile &&
                                    <button
                                        type="button"
                                        onClick={() => setImageFile("")}
                                        className="bg-transparent cursor-pointer text-red-600 rounded-md py-1.5 px-3.5 leading-base text-base "
                                    >
                                        Remove
                                    </button>
                                } */}
                            </div>
                        </div>
                    </div>

                    {/* title */}
                    <div className="lg:mb-2 mb-0 animate-pulse">
                        <textarea
                            name="title"
                            className="lg:min-h-[60px] md:min-h-[45px] min-h-[38px] resize-none outline-none w-full h-full max-h-[60px] whitespace-pre-wrap lg:text-5xl md:text-4xl text-3xl sm:font-[800] font-[700] leading-sm bg-transparent "
                            placeholder="New post title here..."
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex items-center animate-pulse">
                        <ul className="w-full flex flex-wrap">
                            <span className="h-4 w-4"/>
                        </ul>
                    </div>
                </div>

                {/* Font change or other items for topic UI and textarea*/}
                <div className="lg:px-16 md:px-12 px-6 py-8 flex flex-1 w-full flex-col relative">
                    <div className="sticky top-0 bg-gray-200 py-2 px-16 shrink-0 -mt-8 -mx-16 mb-6 text-center">
                        <ul className="md:-ml-2 min-w-[480px] flex w-full">
                            <li className="">
                                <button
                                    className="mr-1 p-2 bg-transparent hover:bg-blue-100 text-black hover:text-blue-500 rounded-md inline-block text-center"
                                >
                                    <FaBold size={24} className="align-bottom" />
                                </button>
                            </li>
                            <li className="">
                                <button
                                    className="mr-1 p-2 bg-transparent hover:bg-blue-100 text-black hover:text-blue-500 rounded-md inline-block text-center"
                                >
                                    <FaBold size={24} className="align-bottom" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Content */}
                    <div className="min-h-[27px] h-full animate-pulse">
                        <textarea
                            name="content"
                            className="resize-none h-full w-full outline-none text-lg bg-transparent leading-base text-black"
                            placeholder="Write your post content here..."
                        />
                    </div>
                </div>
            </div>

            {/* Description Can see different discription while editing*/}
            <div className="md:block hidden">
                <div className="sticky top-[360px]">
                    <div>
                        <h4 className="text-lg mb-2 ">Edit Basics</h4>
                        <ul className="pl-6 list-disc">
                            <li className="mb-2">
                                Use Markdown to write and format posts.
                                <p className="text-sm my-1">Commonly used syntax</p>
                            </li>
                            <li className="mb-2">
                                Use keywords where appropriate to help ensure people can find your post by search.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="lg:col-start-2 md:col-span-2 md:p-0 h-[88px] flex items-center md:px-0 px-2">
                {/* <EditSaveButton onClick={() => setIsSaving(true)} isSaving={isSaving} /> */}
                
                <button
                    type="button"
                    className="mr-2 bg-transparent text-black hover:bg-blue-200 hover:text-blue-500 font-[500] inline-block py-2 px-4 rounded-md text-center"
                >
                    <TbNut size={24} />
                </button>

                <button
                    type="button"
                    className="mr-2 bg-transparent text-black hover:bg-blue-200 hover:text-blue-500 font-[500] inline-block py-2 px-4 rounded-md text-center"
                >
                    Revert new changes
                </button>
            </div>
        </form>
    )
}