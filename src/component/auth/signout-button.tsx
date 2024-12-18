"use client";

import { signOut } from "next-auth/react";

interface SignOutButtonProps {
    children: React.ReactNode;
}

export default function SignOutButton({ children }: SignOutButtonProps) {
    return (
        <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            onClick={async () => {
                await signOut({ callbackUrl: "/" }).then(() => {
                    console.log("Succeddfully signedout")
                }).catch(err => {
                    console.error("Error Signed out - ", err);
                })
            }}
        >
            {children}
        </button>
    )
}