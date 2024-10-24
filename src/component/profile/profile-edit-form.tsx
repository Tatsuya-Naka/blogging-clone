"use client";
import type { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import ProfileEditSaveButton from "./profile-edit-save-button";
import * as actions from "~/actions";
import { useFormState } from "react-dom";

interface ProfileEditFormProps {
    userInfo: User
}

export default function ProfileEditForm({userInfo}: ProfileEditFormProps) {
    const [formState, action] = useFormState(actions.ProfileEditAction, {errors: {}})

    const [bio, setBio] = useState(userInfo.bio);
    const [image, setImage] = useState<string>("");

    const handleBioChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setBio(e.currentTarget.value);
    }

    const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.currentTarget.files;
        if (files && files.length > 0 && files[0]) {
            const file = files[0];
            setImage(window.URL.createObjectURL(file));
        }
    }

    return (
        <form action={action}>
            {/* Name & Profile Image */}
            <div className="md:p-6 p-4 md:mb-6 mb-4 grid md:gap-6 gap-4 rounded-md bg-white shadow-md">
                <h2 className="text-2xl font-bold">
                    User
                </h2>
                <div className="flex flex-col text-base">
                    <label className="text-black font-[500]">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        className={`mt-2 py-2 px-2 text-base resize-y border-2 border-gray-200 border-solid rounded-md leading-base outline-none ${formState.errors.name && "bg-red-300"}`}
                        defaultValue={userInfo?.name ?? ""}
                    />
                    {formState.errors.name && <div className="w-full px-4 py-2 mt-2 rounded-md text-base text-white bg-red-500 text-center">{formState.errors.name}</div>}
                </div>
                {/* Icon Image */}
                <div className="flex flex-col text-base">
                    <label className="text-black font-[500]">
                        Profile Image
                    </label>
                    <div className="flex items-center mt-2 ">
                        <span className="mr-2 w-12 h-12 inline-block rounded-full bg-black overflow-hidden align-middle shrink-0">
                            {(image ?? userInfo?.image) ?
                                <Image
                                    src={image ?? userInfo.image}
                                    alt={userInfo.name ?? ""}
                                    width={420}
                                    height={420}
                                    className="w-full h-full object-cover overlow-hidden rounded-full"
                                />
                                :
                                <div className="w-12 h-12 rounded-full bg-lime-500" />
                            }
                        </span>
                        <input
                            type="file"
                            name="image"
                            className="p-3 bg-white rounded-md border-2 border-gray-200 border-solid w-full cursor-pointer"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="md:p-6 p-4 md:mb-6 mb-4 grid md:gap-6 gap-4 rounded-md bg-white shadow-md text-black">
                <h2 className="text-2xl font-bold">
                    Basic
                </h2>
                <div className="flex flex-col text-base">
                    <label className="text-black font-[500]">
                        Bio
                    </label>

                    <textarea
                        name="bio"
                        defaultValue={userInfo?.bio}
                        value={bio}
                        className={`mt-2 py-2 px-2 text-base w-full resize-y border-2 border-solid border-gray-200 rounded-md outline-none ${formState.errors.bio && "bg-red-300"}`}
                        onChange={handleBioChange}
                    />

                    <p className="text-right mt-2 text-black font-[400] text-sm m-0">
                        <span>{bio.length}</span>/200
                    </p>

                    {formState.errors.bio && <div className="w-full px-4 py-2 mt-2 rounded-md text-base text-white bg-red-500 text-center">{formState.errors.bio}</div>}
                </div>
            </div>

            {/* Submit button */}
            <div className="md:p-6 p-4 md:mb-6 mb-4 rounded-md bg-white shadow-md text-black">
            {formState.errors._form && <div className="w-full px-4 py-2 mb-2 rounded-md text-base text-white bg-red-500">{formState.errors._form}</div>}
                <ProfileEditSaveButton>
                    Save Profile Information
                </ProfileEditSaveButton>
            </div>
        </form>
    )
}