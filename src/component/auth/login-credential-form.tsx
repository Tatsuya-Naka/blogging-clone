"use client";
import { signIn } from "next-auth/react";
import paths from "~/server/paths";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginCredentailForm() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();
    const [errors, setErrors] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            ...user,
            redirect: false,
        });

        setErrors(result?.error ?? "");
        if (result?.ok) {
            router.push(paths.home());
        }
    };

    return (
        <form
            className="flex items-center flex-col justify-between w-full"
            // action={action}
            onSubmit={handleSubmit}
        >
            <label className="w-full flex flex-col text-base gap-1 mb-3">
                Email
                <input
                    type="email"
                    name="email"
                    // className={`px-5 py-2 w-full ${formState.errors.username ? "bg-red-200" : "border-gray-200"} border-2 rounded-lg outline-none`}
                    className={`px-3 py-2 w-full "border-gray-200" border-2 rounded-lg text-base resize-y outline-none mb-2`}
                    placeholder="email@example.com"
                    onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
                    required
                    value={user.email}
                />
                {/* {formState.errors.username && <div>{formState.errors.username}</div>} */}
            </label>
            <label className="w-full flex flex-col text-base gap-1 mb-3">
                Password
                <input
                    type="password"
                    name="password"
                    // className={`px-5 py-2 w-full ${formState.errors.password ? "bg-red-200" : "border-gray-200"} border-2 rounded-lg outline-none`}
                    className={`px-3 py-2 w-full "border-gray-200" border-2 rounded-lg text-base resize-y outline-none mb-2`}
                    placeholder="Password"
                    onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                    value={user.password}
                />
                {/* {formState.errors.password && <div>{formState.errors.password}</div>} */}
            </label>

            <div className="flex mb-3 justify-between items-center w-full">
                {/* Save password */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        size={18}
                        className="w-[1.125em] h-[1.125em] cursor-pointer rounded-md m-2"
                    />
                    <label className="font-[400]">
                        Remember me
                    </label>
                </div>

                {/* forget password */}
                <Link
                    href={paths.home()}
                    className="m-0 text-blue-400"
                >
                    Forget Password?
                </Link>
            </div>
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