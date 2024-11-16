import Image from "next/image"
import Link from "next/link"
import { BsEmojiSunglasses } from "react-icons/bs";
import { BsEmojiKiss } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { db } from "~/server/db";
import paths from "~/server/paths";
import ProfilePupUp from "./user-profile-props";
import { getServerAuthSession } from "~/server/auth";
import TopicListButton from "./topic-bookmark";

export default async function TopicWithBg() {
    const session = await getServerAuthSession();

    const topic = await db.topic.findMany({
        where: {
            isPublic: true,
        },
        include: {
            user: true,
            tags: true,
            bookmarks: session?.user ? {
                select: {id: true, userId: true},
                where: {userId: session.user.id},
            } : undefined,
            _count: {select: {comments: {where: {deleted: false}}}}
        },
        take: 1
    });

    return (
        <>
            {topic[0] &&

                <div className="py-0 h-full w-full bg-white md:rounded-md shadow-[0_0_0_1px_rgba(23,23,23,0.05)] mb-2">
                    {/* Bg image */}
                    {topic[0]?.bgImage &&
                        < div className="object-contain max-h-[calc(90vh-56px)] overflow-hidden">
                            <Link
                                href={paths.topicPage(topic[0].id)}
                                className="h-full"
                            >
                                <Image
                                    src={topic[0].bgImage}
                                    alt="Image"
                                    width={1000}
                                    height={420}
                                    className="aspect-[650/273] w-full h-full md:rounded-t-md object-cover"
                                />
                            </Link>
                        </div>
                    }

                    {/* Title */}
                    <div className="md:p-5 p-4 sm:text-2xl mb-2 md:rounded-b-md">
                        {/* User icon  */}
                        <div className="md:mb-2 flex items-center justify-between">
                            <div className="flex items-center leading-sm text-sm">
                                {/* User image icon */}
                                <div className="mr-2">
                                    <Link
                                        href={paths.profilePage(topic[0]?.user.id ?? "")}
                                        className="w-8 h-8 inline-block rounded-full shrink-0"
                                    >
                                        {topic[0]?.user.image ?

                                            <Image
                                                src={topic[0]?.user.image}
                                                alt="User icon"
                                                width={90}
                                                height={90}
                                                className="rounded-full h-full w-full align-bottom object-cover aspect-1/1"
                                            />
                                            :
                                            <div className="rounded-full h-[90px] w-[90px] bg-lime-500" />
                                        }
                                    </Link>
                                </div>

                                {/* Name & Popup */}
                                {topic[0]?.updatedAt &&
                                    <ProfilePupUp date={topic[0]?.updatedAt} user={topic[0].user} visitId={session?.user.id ?? ""} />
                                }
                            </div>
                        </div>

                        {/* Title & Tags */}
                        <div className="md:pl-10">
                            {/* title */}
                            <h2 className="md:mb-1 text-black sm:text-3xl text-xl font-bold hover:text-blue-800">
                                <Link
                                    href={paths.topicPage(topic[0]?.id ?? "/")}
                                    className=""
                                >
                                    {topic[0]?.title}
                                </Link>
                            </h2>

                            {/* Tags */}
                            <div className="mb-2 -ml-1 text-sm flex flex-wrap gap-1 text-gray-700">
                                <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                                    #discuss
                                </Link>
                                <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                                    #react
                                </Link>
                                <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                                    #javascript
                                </Link>
                                <Link href="/" className="bg-transparent hover:bg-gray-100 rounded-md inline-flex items-center p-1.5">
                                    #programming
                                </Link>
                            </div>

                            {/* Reaction comments and read and fav*/}
                            <div className="flex items-center justify-between text-sm leading-sm ">
                                <div className="flex -ml-2">
                                    {/* Topic id */}
                                    <Link
                                        href={paths.topicPage(topic[0]?.id ?? "")}
                                        className="pl-2 bg-transparent hover:bg-gray-100 rounded-md w-full px-1 py-3 flex gap-2 leading-base items-center "
                                    >
                                        <div className="flex items-center ">
                                            <div className="flex items-center">
                                                {/* Reaction Icon */}
                                                <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                                    <BsEmojiSunglasses size={18} />
                                                </span>
                                                <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                                    <BsEmojiKiss size={18} />
                                                </span>
                                                <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                                    <BsEmojiSunglasses size={18} />
                                                </span>
                                                <span className="inline-block border-2 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center border-solid border-white rounded-full -mr-3 w-[28px] h-[28px]">
                                                    <BsEmojiKiss size={18} />
                                                </span>
                                            </div>
                                            {/* Reactions */}
                                            <div className="ml-4 flex gap-1 items-center font-[300]">
                                                8
                                                <span className="sm:inline hidden">reactions</span>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* Comments */}
                                    <Link
                                        href="/"
                                        className="flex items-center gap-1 bg-transparent hover:bg-gray-100 rounded-md text-gray-500 px-2 text-sm rounded-md leading-base "
                                    >
                                        <FaRegComment size={18} className="sm:mr-0 mr-1" />
                                        <p>{topic[0]._count.comments}</p><span className="sm:inline hidden">comments</span>
                                    </Link>
                                </div>

                                {/* Read and Fav */}
                                <div className="flex items-center">
                                    <p className="text-xs mr-2 text-black font-[300]">1 min read</p>
                                    <TopicListButton topicId={topic[0].id} isBookmarked={!!topic[0].bookmarks?.[0]?.userId ? topic[0].bookmarks?.[0].userId===session?.user.id : false}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}