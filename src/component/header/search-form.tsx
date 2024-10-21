"use client";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { GiJapan } from "react-icons/gi";
import { useFormState } from "react-dom";
import * as actions from '~/actions';
import { useState } from "react";
import SearchTopicLists from "./search-topic-lists";
import { api } from "~/trpc/react";

export default function SearchForm() {
    const [formState, action] = useFormState(actions.SearchTopicAction, { errors: {} });
    const [term, setTerm] = useState("");

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTerm(e.currentTarget.value);
    };

    const {data: topics} = api.topic.getTopicLists.useQuery({
        term: term,
    });

    return (
        <form className="relative flex flex-1 flex-col text-base" action={action}>
            <div>
                <input
                    type="text"
                    name="term"
                    className={`${!!formState?.errors?.term ? "bg-red-300" : "bg-transparent"} pl-10 pr-36 leading-relaxed py-1 px-2 text-base w-full resize-y border-2 border-gray-200 rounded-md outline-none transition-all duration-100 ease-out`}
                    onChange={handleInputChange}
                />
                {/* Search submit button */}
                <button
                    type="submit"
                    className={`${!!formState?.errors?._form ? "bg-red-300" : "bg-transparent hover:bg-blue-200 "} absolute py-0 mt-0 right-auto inset-px p-2 text-gray-500 hover:text-blue-700 inline-block rounded-none text-center `}
                >
                    <IoSearch size={24} />
                </button>
                <Link
                    href="https://github.com/Tatsuya-Naka"
                    className="absolute right-2 top-[3px] block text-sm text-gray-500 pl-1 flex items-center bg-white mt-1 gap-1"
                    target="_blank"
                >
                    Powered by
                    <GiJapan size={14} />
                    Tatsuya
                </Link>
            </div>

            {/* search result */}
            {term && topics &&
                <SearchTopicLists topics={topics}/>
            }
        </form>
    )
}