"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import paths from "~/server/paths";
import * as actions from '~/actions';
import EdtiDeleteButton from "./edit-delete-button";

interface EditDeleteForm {
    topicId: string;
}

export default function EditDeleteForm({ topicId }: EditDeleteForm) {
    const [formState, action] = useFormState(actions.DeleteTopic.bind(null, topicId), { errors: {} });

    return (
        <form className="flex flex-col gap-1" action={action}>
            {formState.errors._form &&
                <div className="w-full bg-red-500 text-white px-4 py-2 rounded-md">
                    {formState.errors._form}
                </div>
            }
            <div className="flex gap-1">
                <EdtiDeleteButton />
                {/* Unpublish = Edit*/}
                <Link
                    href="/"
                    className="px-4 py-2 text-base leading-base font-[500] flex items-center rounded-md text-gray-900 bg-gray-200 hover:bg-gray-300"
                >
                    Unpublish
                </Link>
                <Link
                    href={paths.topicPage(topicId)}
                    className="px-4 py-2 text-base leading-base font-[500] flex items-center rounded-md text-black hover:bg-gray-100"
                >
                    Dismiss
                </Link>
            </div>
        </form>
    )
}