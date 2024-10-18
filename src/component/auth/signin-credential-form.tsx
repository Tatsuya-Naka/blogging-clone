"use client";
import paths from "~/server/paths";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type responseType = {
    message: string;
    user: {
        data: {
            data: string;
            email: string;
            password: string;
        }
    }
    error: string;
}

export default function SignCredentailForm() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const router = useRouter();
    const [errors, setErrors] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(paths.authRegisterPostReq(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user })
        });

        const userInfo = await response.json() as responseType;
        setErrors(userInfo.error);

        if (userInfo.message === "Success") {
            const res = await signIn("credentials", {
                email: userInfo.user.data.email,
                password: userInfo.user.data.password,
                redirect: false,
            })
            router.push(paths.authenticateUserHome());
        }
    };

    return (
        <form
            className="flex items-center flex-col justify-between w-full"
            onSubmit={handleSubmit}
        >
            <label className="w-full flex flex-col text-base gap-1 mb-3">
                Username
                <input
                    type="text"
                    name="username"
                    className={`px-3 py-2 w-full "border-gray-200" border-2 rounded-lg text-base resize-y outline-none mb-2`}
                    placeholder="Username"
                    onChange={(e) => setUser({ ...user, username: e.currentTarget.value })}
                    required
                    value={user.username}
                />
            </label>
            <label className="w-full flex flex-col text-base gap-1 mb-3">
                Email
                <input
                    type="email"
                    name="email"
                    className={`px-3 py-2 w-full "border-gray-200" border-2 rounded-lg text-base resize-y outline-none mb-2`}
                    placeholder="email@example.com"
                    onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
                    value={user.email}
                />
            </label>
            <label className="w-full flex flex-col text-base gap-1 mb-3">
                Password
                <input
                    type="password"
                    name="password"
                    className={`px-3 py-2 w-full "border-gray-200" border-2 rounded-lg text-base resize-y outline-none mb-2`}
                    placeholder="Password"
                    onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                    value={user.password}
                />
            </label>
            {errors &&
                <div className="w-full">
                    <div className="px-3 py-2 w-full bg-red-200 flex items-center justify-center rounded-md my-3">
                        {errors}
                    </div>
                </div>
            }

            <div className="mb-1 pt-3 w-full">
                <button
                    type="submit"
                    className="w-full border-2 border-solid border-gray-200 rounded-md p-3 hover:bg-gray-200"
                >
                    Signin
                </button>
            </div>
        </form>
    )
}