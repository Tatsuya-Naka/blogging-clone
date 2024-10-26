"use client";
import type { ButtonHTMLAttributes } from "react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import * as actions from "~/actions";
import CommentDeleteButton from "./comment-delete-button";

interface CommentDeleteFormProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    commentId: string;
    topicId: string;
    onClose: () => void;
}

export default function CommentDeleteForm({ commentId, topicId, onClose, ...props }: CommentDeleteFormProps) {
    const [formState, action] = useFormState(actions.CommentDeleteAction.bind(null, { commentId, topicId }), { errors: {} });

    useEffect(() => {
        if (formState.success) {
            onClose();
        }
    }, [formState, onClose])

    return (
        <form className="flex flex-col gap-2 mt-2" action={action}>
            <p className="text-sm font-[500]">You are trying to delete your comment now.</p>
            <p className="text-sm font-[500]">Are you sure you want to delete your comment?</p>
            <p className="text-sm font-[500]">You cannot see this anymore in the future.</p>
            <div className="flex gap-2 items-center justify-end mt-2">
                {/* Delete button */}
                <CommentDeleteButton />
                <button
                    type="button"
                    className="px-2 py-1 bg-gray-500 hover:bg-gray-700 text-white rounded-md"
                    {...props}
                >
                    No, keep this comment.
                </button>
            </div>
            {formState.errors._form && <div className="w-full bg-red-500 px-2 py-1 rounded-md text-white">{formState.errors._form}</div>}
        </form>
    )
}