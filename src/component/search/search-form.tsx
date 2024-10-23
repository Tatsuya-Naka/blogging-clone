"use client";
import { useFormState } from "react-dom";
import { IoIosSearch } from "react-icons/io";
import * as actions from "~/actions";

export default function SearchTopicForm() {
    const [formState, action] = useFormState(actions.SearchTopicAction, {errors: {}});

    return (
        <form className="w-full" action={action}>
            <div className="flex flex-wrap" >
                <div className="relative flex flex-1 flex-col text-base" >
                    <input
                        type="text"
                        name="term"
                        className={`${!!formState?.errors?.term ? "bg-red-300" : "bg-transparent"} pl-10 leading-relaxed py-1.5 px-2 text-base w-full resize-y border-2 border-gray-300 rounded-md transition-all duration-100 ease-in`}
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className={`absolute py-0 mt-0 right-auto inset-px p-2 ${!!formState?.errors?._form ? "bg-red-300" : "bg-transparent hover:bg-gray-100"}  rounded-md text-black inline-block text-center`}
                    >
                        <IoIosSearch size={24} />
                    </button>
                </div>
            </div>
        </form>
    )
}