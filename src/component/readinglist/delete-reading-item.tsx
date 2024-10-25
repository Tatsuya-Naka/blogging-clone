"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { FcHighPriority } from "react-icons/fc";
import * as actions from "~/actions";
import DeleteReadingListButton from "./delete-button";

interface DeleteReadingItemProps {
    bookmarkId: string;
}

export default function DeleteReadingItem({ bookmarkId }: DeleteReadingItemProps) {
    const [isClicked, setIsClicked] = useState(false);
    const [formState, action] = useFormState(actions.DeleteReadingList.bind(null, bookmarkId), { errors: {} });

    const handleDialogBox = () => {
        if (formState.success) {
            setIsClicked(true);
            formState.success = false;
        }
    };

    return (
        <>
            <button
                className="rounded-md p-2 bg-transparent hover:bg-blue-100 text-black font-[300] hover:text-blue-500 text-base"
                type="button"
                onClick={() => setIsClicked(true)}
            >
                Delete
            </button>
            {isClicked &&
                <div className="relative z-[999]">
                    <div className="bg-black opacity-60 inset-0 fixed max-h-screen overflow-y-hidden" />
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 ">
                        <div className="bg-white rounded-md p-6 shadow-xl">
                            <div className="flex items-center p-6 gap-5">
                                <FcHighPriority size={24} className="animate-ping" />
                                <span className="text-xl font-[700]">Attention!</span>
                            </div>
                            <p className="mt-2 text-base font-[500]">
                                You are trying to delete this from your reading list.
                            </p>
                            <form className={`mt-4 ${formState.errors._form && "flex flex-col items-center"}`}
                                action={action}
                            >
                                <div className="flex justify-end space-x-2">
                                    <DeleteReadingListButton onClick={handleDialogBox}/>
                                    <button
                                        className={`bg-gray-500 text-white hover:bg-gray-700 px-4 py-2 rounded-md`}
                                        onClick={() => setIsClicked(false)}
                                    >
                                        No, keep it.
                                    </button>
                                </div>

                                {formState.errors._form &&
                                    <div className="w-full bg-red-600 text-white rounded-md px-4 py-2">
                                        {formState.errors._form} 
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}