"use client";

import Link from "next/link";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import paths from "~/server/paths";

interface EditTopicCloseButtonProps {
    topicId: string;
}

export default function EditTopicCloseButton({topicId}: EditTopicCloseButtonProps) {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <>
            <div className="lg:absolute lg:right-2 lg:top-2 lg:ml-0 ml-1">
                <button
                    type="button"
                    className="p-1 bg-transparent hover:bg-gray-200 text-black text-center hover:bg-white rounded-md"
                >
                    <IoIosClose size={24} />
                </button>
            </div>
            {isClicked &&
                <div className="relative z-[999]">
                    <div className="fixed inset-0 bg-black opacity-60" />
                    <div className="fixed inset-0 z-[200] flex items-center justify-center ">
                        <div className="bg-white rounded-md p-6 flex flex-col gap-2 min-w-[480px]">
                            <div className="border-b-2 border-gray-200 border-solid pb-2 flex items-center justify-between w-full" >
                                <h1 className="text-xl font-[700]">
                                    Leave this page
                                </h1>
                                <button
                                    type="button"
                                    className="p-1 bg-transparent hover:bg-indigo-200 text-black text-center hover:bg-white rounded-md"
                                    onClick={() => setIsClicked(false)}
                                >
                                    <IoIosClose size={24} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-base font-[500]">
                                    You are attempting to leave the topic edit page.
                                </p>
                                <p className="text-base font-[500]">
                                    Do you want to leave this page without saving.
                                </p>
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={paths.topicPage(topicId)}
                                        className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 text-white cursor-pointer"
                                    >
                                        Yes, leave this page
                                    </Link>
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-700 text-white cursor-pointer"
                                        onClick={() => setIsClicked(false)}
                                    >
                                        No, keep editting
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}