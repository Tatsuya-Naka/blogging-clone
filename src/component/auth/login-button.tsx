"use client";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
    id: string;
    children: React.ReactNode;
}

export default function LogInButton({ id, children }: SignInButtonProps) {
    return (
        <button
            type="button"
            className="w-full flex p-3 items-center rounded-md border-2 border-solid border-gray-200 hover:bg-gray-200"
            onClick={async () => { await signIn(id) }}
        >
            {children}
        </button>
    )
}