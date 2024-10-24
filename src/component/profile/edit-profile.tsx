import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";
import { BsEmojiWink } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import ProfileEditForm from "./profile-edit-form";

interface EditProfileProps {
    userId: string;
}

export default async function EditProfile({ userId }: EditProfileProps) {
    const userInfo = await db.user.findFirst({
        where: { id: userId }
    });
    const session = await getServerAuthSession();

    if (!session || !userInfo) {
        redirect(paths.home());
    }

    return (
        <div className="md:grid md:grid-cols-[240px_1fr] md:gap-4 mx-auto my-0 md:p-4 text-base md:max-w-[1024px] w-full">
            <div className="mt-3 w-full">
                {/* Editing sections */}
                <div className="md:block hidden">
                    {/* Profile */}
                    <Link
                        href={paths.profileEditPage(session.user.id)}
                        className="p-3 sm:p-2 flex items-center rounded-md font-[500] bg-white text-black"
                    >
                        <BsEmojiWink size={24} className="mr-2 w-6 h-6 inline-flex items-center justify-center text-xl align-middle" />
                        Profile
                    </Link>
                    {/* Customization */}
                    <Link
                        href={paths.profileEditPage(session.user.id)}
                        className="p-3 sm:p-2 flex items-center rounded-md font-[500] hover:bg-white text-black"
                    >
                        <CiSettings size={24} className="mr-2 w-6 h-6 inline-flex items-center justify-center text-xl align-middle" />
                        Customization
                    </Link>
                    {/* Notification */}
                    <Link
                        href={paths.profileEditPage(session.user.id)}
                        className="p-3 sm:p-2 flex items-center rounded-md font-[500] hover:bg-white text-black"
                    >
                        <IoIosNotificationsOutline size={24} className="mr-2 w-6 h-6 inline-flex items-center justify-center text-xl align-middle" />
                        Notification
                    </Link>
                    {/* Account */}
                    <Link
                        href={paths.profileEditPage(session.user.id)}
                        className="p-3 sm:p-2 flex items-center rounded-md font-[500] hover:bg-white text-black"
                    >
                        <MdOutlineAccountCircle size={24} className="mr-2 w-6 h-6 inline-flex items-center justify-center text-xl align-middle" />
                        Account
                    </Link>
                    {/* Organization */}
                    <Link
                        href={paths.profileEditPage(session.user.id)}
                        className="p-3 sm:p-2 flex items-center rounded-md font-[500] hover:bg-white text-black"
                    >
                        <GoOrganization size={24} className="mr-2 w-6 h-6 inline-flex items-center justify-center text-xl align-middle" />
                        Organization
                    </Link>
                    {/* Extensions */}
                    <Link
                        href={paths.profileEditPage(session.user.id)}
                        className="p-3 sm:p-2 flex items-center rounded-md font-[500] hover:bg-white text-black"
                    >
                        <AiOutlineThunderbolt size={24} className="mr-2 w-6 h-6 inline-flex items-center justify-center text-xl align-middle" />
                        Extensions
                    </Link>
                </div>

                <div className="md:hidden block p-2">
                    <select className="relative border-2 border-gray-300 border-solid rounded-md bg-white leading-base py-2 px-2 text-base w-full ">
                        <option>
                            Profile
                        </option>
                        <option>
                            Customization
                        </option>
                        <option>
                            Notification
                        </option>
                        <option>
                            Account
                        </option>
                        <option>
                            Organization
                        </option>
                        <option>
                            Extensions
                        </option>
                    </select>
                </div>
            </div>

            {/* Form */}
            <div className="mt-3 min-w-0">
                {/* User id */}
                <div className="md:p-0 p-3 w-full my-0 mx-auto flex items-center justify-between">
                    <h1 className="sm:text-3xl text-blue-700 text-2xl min-h-10 inline-flex items-center sm:leading-base font-[700] leading-sm">
                        <Link
                            href={paths.profilePage(userId)}
                            className="mb-4 text-ellipsis overflow-hidden"
                        >
                            @{userId}
                        </Link>
                    </h1>
                </div>

                {/* SNS */}
                <div className="md:p-6 p-4 md:mb-6 mb-4 grid rounded-md bg-white shadow-md gap-2">
                    <div className="flex w-full items-center">
                        <Link
                            href="https://www.facebook.com/"
                            className="bg-blue-700 hover:bg-blue-800 text-white rounded-md w-full block px-4 py-2 text-base leading-base flex items-center justify-center cursor-pointer "
                        >
                            <FaFacebookSquare size={24} className="mr-2 align-bottom text-white" />
                            <p>Facebook</p>
                        </Link>
                    </div>
                    <div className="flex w-full items-center">
                        <Link
                            href="https://www.facebook.com/"
                            className="bg-black hover:bg-gray-800 text-white rounded-md w-full block px-4 py-2 text-base leading-base flex items-center justify-center cursor-pointer "
                        >
                            <FaSquareXTwitter size={24} className="mr-2 align-bottom text-white" />
                            <p>X (Twitter)</p>
                        </Link>
                    </div>
                </div>

                {/* User Info */}
                <ProfileEditForm userInfo={userInfo} />
            </div>
        </div>
    )
}