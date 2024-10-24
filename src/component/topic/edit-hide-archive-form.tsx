"use client";

import Link from "next/link";
import paths from "~/server/paths";
import * as actions from "~/actions";
import { useFormState } from "react-dom";
import EditHideArchiveButton from "./edit-hide-archive-button";
import type { Topic } from "@prisma/client";

interface EditHideArchiveFormProps {
    topic: Topic;
}

export default function EditHideArchiveForm({topic}: EditHideArchiveFormProps) {
    const [formState, action] = useFormState(actions.HideArchiveAction.bind(null, topic), {errors: {}});

    return (
        <form className="flex flex-col gap-1" action={action}>
            {formState.errors._form &&
                <div className="w-full bg-red-500 text-white px-4 py-2 rounded-md">
                    {formState.errors._form}
                </div>
            }
            <div className="flex gap-1">
                <EditHideArchiveButton>
                    {topic.isPublic ? "Yes, I want to hide this topic" : "Yes, I want to archive this topic"}
                </EditHideArchiveButton>
                {/* Unpublish = Edit*/}
                <Link
                    href={paths.topicPage(topic.id)}
                    className="px-4 py-2 text-base leading-base font-[500] flex items-center rounded-md text-black hover:bg-gray-100"
                >
                    Dismiss
                </Link>
            </div>
        </form>
    )
}