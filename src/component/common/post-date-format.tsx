"use client";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface PostDateFormatterProsp extends HTMLAttributes<HTMLParagraphElement> {
    date: Date;
    children?: React.ReactNode;
}

export default function PostDateFormatter({ date, children, className }: PostDateFormatterProsp) {
    // const format = useFormatter();
    const formatDate = (date: Date) => {
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };

    return (
        <>
            <p className={twMerge(`text-xs text-black flex gap-1 items-center`, className)}>
                {children} {formatDate(date)}
            </p>
        </>
    )
}