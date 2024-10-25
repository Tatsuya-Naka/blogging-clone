import { db } from "~/server/db";
import Link from "next/link";
import paths from "~/server/paths";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import TopicListsDateFormat from "../home/topic-date-format";
import DeleteReadingItem from "./delete-reading-item";

interface ReadingListMainProps {
    userId: string;
}

export default async function ReadingListMain({ userId }: ReadingListMainProps) {
    const bookmarks = await db.bookmark.findMany({
        where: { userId: userId },
        include: {
            topic: {
                select: { id: true, title: true, updatedAt: true, user: {select: {id: true, name: true, image: true}} },
            },
        }
    });

    const readinglists = bookmarks.map((bookmark) => {
        return (
            <div key={bookmark.id} className="w-full bg-white rounded-md flex items-center">
                <div className="p-5 flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <Link
                            href={paths.profilePage(bookmark.topic.user.id)}
                            className="flex shrink-0"
                        >
                            {bookmark.topic.user.image ?
                                <Image
                                    src={bookmark.topic.user.image}
                                    alt={bookmark.topic.user.name ?? ""}
                                    width={90}
                                    height={90}
                                    className="h-8 w-8 rounded-full aspect-[1/1] object-cover"
                                />
                                :
                                <div className="h-8 w-8 rounded-full bg-lime-500 " />
                            }
                        </Link>

                        {/* Title... */}
                        <div className="flex flex-col justify-center gap-2">
                            <h2 className="text-base text-black font-[700]">
                                <Link
                                    href={paths.topicPage(bookmark.topic.id)}
                                    className="hover:text-blue-600 text-black"
                                >
                                    {bookmark.topic.title}
                                </Link>
                            </h2>
                            <div className="flex flex-wrap items-center">
                                {/* Name */}
                                <Link
                                    href={paths.profilePage(bookmark.topic.user.id)}
                                    className="text-black font-[300] text-sm hover:text-blue-500"
                                >
                                    {bookmark.topic.user.name}
                                </Link>
                                <LuDot size={12} />
                                {/* Date format */}
                                <div className="text-black font-[300] text-sm">
                                    <TopicListsDateFormat date={bookmark.topic.updatedAt} />
                                </div>
                                <LuDot size={12} />
                                <p className="text-black font-[300] text-sm">4 min read</p>
                                <LuDot size={12} />
                                {/* Tags */}
                                <div className="flex flex-wrap items-center gap-2 ">
                                    <p className="text-black font-[300] text-sm">#Typescript</p>
                                    <p className="text-black font-[300] text-sm">#Nextjs</p>
                                    <p className="text-black font-[300] text-sm">#NextAuthjs</p>
                                    <p className="text-black font-[300] text-sm">#Javascript</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button archive */}
                    <div className="">
                        <DeleteReadingItem bookmarkId={bookmark.id} />
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="max-w-[1380px] min-h-[40vh] flex flex-col lg:gap-4 md:gap-2 px-4 py-5 ">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="">
                    <h1 className="sm:text-3xl text-2xl text-black font-[700]">
                        Reading list <span>({bookmarks.length})</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3 ">
                    <button
                        type="button"
                        className="px-3 py-2 text-base rounded-md text-gray-700 hover:text-blue-700 hover:bg-white cursor-pointer"
                    >
                        View archive
                    </button>
                    <div className="flex flex-col md:mb-0 mb-3 sm:block hidden">
                        <input
                            placeholder="Search..."
                            className="p-2 rounded-md border-gray-200 border-2 border-solid text-base"
                        />
                        <select className="md:hidden block rounded-md border-gray-200 border-2 border-solid p-2 text-base font-[500] w-full">
                            <option>
                                All tags
                            </option>
                            <option>
                                #Typescript
                            </option>
                            <option>
                                #Nextjs
                            </option>
                            <option>
                                #NextAuthjs
                            </option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="sm:hidden block flex flex-col md:mb-0 mb-3 sm:block w-full">
                <input
                    placeholder="Search..."
                    className="p-2 rounded-md border-gray-200 border-2 border-solid text-base"
                />
                <select className="md:hidden block rounded-md border-gray-200 border-2 border-solid p-2 text-base font-[500] w-full">
                    <option>
                        All tags
                    </option>
                    <option>
                        #Typescript
                    </option>
                    <option>
                        #Nextjs
                    </option>
                    <option>
                        #NextAuthjs
                    </option>
                </select>
            </div>

            {/* Main */}
            <div className="grid lg:grid-cols-[240px_1fr] md:grid-cols-[2fr_5fr] md:gap-2">
                {/* Select */}
                <div className="md:block hidden w-full">
                    <Link
                        href={paths.readingListPage(userId)}
                        className="p-2 rounded-md text-black bg-white w-full hover:text-blue-500 text-base inline-block"
                    >
                        All tags
                    </Link>
                    <Link
                        href={paths.readingListPage(userId)}
                        className="p-2 rounded-md text-black hover:bg-white bg-transparent w-full hover:text-blue-500 text-base inline-block"
                    >
                        #Typescript
                    </Link>
                    <Link
                        href={paths.readingListPage(userId)}
                        className="p-2 rounded-md text-black hover:bg-white bg-transparent w-full hover:text-blue-500 text-base inline-block"
                    >
                        #Nextjs
                    </Link>
                    <Link
                        href={paths.readingListPage(userId)}
                        className="p-2 rounded-md text-black hover:bg-white bg-transparent w-full hover:text-blue-500 text-base inline-block"
                    >
                        #NextAuthjs
                    </Link>
                </div>

                {/* Reading list */}
                <div className="w-full flex flex-col md:gap-2 gap-1">
                    {readinglists}
                </div>
            </div>
        </div>
    )
}