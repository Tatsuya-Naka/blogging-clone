import Link from "next/link";
import Image from "next/image";
import { FaSort } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import PostDateFormatter from "../common/post-date-format";
import paths from "~/server/paths";
import { getServerAuthSession } from "~/server/auth";
import type { Tag, Topic, User, Comment } from "@prisma/client";
import CommentTextAreaForm from "../comment/comment-textarea";
import CommentLists from "../comment/comment-lists";

export type TopicContents = Topic & {
    user: User,
    tags: Tag[],
    comments: Comment[],
    _count: {
        comments: number,
        bookmarks: number,
    }
}

interface TopicCenterProps {
    topic: TopicContents
}

export default async function TopicCenter({ topic }: TopicCenterProps) {

    const tagsComp = topic.tags.map((tag) => {
        return (
            <Link
                key={tag.id}
                href="/"
                className="bg-transparent rounded-md inline-flex items-center px-2 py-1 text-sm hover:bg-gray-200 rounded-md"
            >
                #{tag.name}
            </Link>
        )
    });

    const session = await getServerAuthSession();

    return (
        <div className="grid gap-4 min-w-0 ">
            {/* Topic content */}
            <div className="mb-4 rounded-md bg-white text-black p-0">
                <div className="">
                    {/* Image */}
                    {topic.bgImage &&
                        <Link
                            // image url
                            href={topic.bgImage}
                            className="md:rounded-t-md max-h-[calc(100vh-56px-2rem)] overflow-hidden"
                        >
                            <Image
                                src={topic.bgImage ?? ""}
                                alt={topic.id}
                                width={1000}
                                height={420}
                                className="aspect-[5/2] object-cover max-h-[420px] max-w-[1000px] m-auto w-full md:rounded-t-md"
                            />
                        </Link>
                    }

                    {/* Header of the topic */}
                    <div className="lg:px-16 lg:pt-8 md:px-12 md:pt-8 px-5 flex flex-col pt-5">
                        <div className="sm:items-start sm:flex-row flex flex-col">
                            {/* If there is a user id */}
                            {session?.user.id === topic.userId &&
                                <div className="sm:mb-0 mb-4 sm:order-[9999] bg-orange-100 border-2 border-solid border-orange-100 rounded-md p-1">
                                    {/* Edit */}
                                    <Link
                                        href={paths.editTopicPage(session.user.id, topic.id)}
                                        className="px-2 text-sm inline-block cursor-pointer hover:opacity-60"
                                    >
                                        Edit
                                    </Link>
                                    {/* Manage */}
                                    <Link
                                        href={paths.deleteTopicPage(session.user.id, topic.id)}
                                        className="px-2 text-sm inline-block cursor-pointer hover:opacity-60"
                                    >
                                        Manage
                                    </Link>
                                    {/* isPrivate ? Archive : hide */}
                                    <Link
                                        href={paths.hideOrArchiveTopicPage(session.user.id, topic.id)}
                                        className="px-2 text-sm inline-block cursor-pointer hover:opacity-60"
                                    >
                                        {topic.isPublic ? "Hide" : "Archive"}
                                    </Link>
                                </div>
                            }

                            {/* User Info */}
                            <div className="flex mb-5 flex-1 items-start">
                                {/* Icon */}
                                <Link className="" href={paths.profilePage(topic.user.id)}>
                                    {topic.user.image ?
                                        <Image
                                            src={topic.user.image}
                                            alt="Icon Image"
                                            width={40}
                                            height={40}
                                            className="rounded-full h-10 w-10 object-cover aspect-1/1"
                                        />
                                        :
                                        <div className='w-10 h-10 rounded-full bg-lime-500' />
                                    }

                                </Link>
                                <div className="pl-3 flex-1 flex flex-col">
                                    {/* User name */}
                                    <Link href={paths.profilePage(topic.user.id)} className="font-[500]">
                                        {topic.user.name}
                                    </Link>
                                    {/* Posted date */}
                                    <PostDateFormatter date={topic.updatedAt}>
                                        Posted on
                                    </PostDateFormatter>
                                </div>
                            </div>
                        </div>
                        {/* Title */}
                        <div className="break-words">
                            <h1 className="lg:text-5xl md:text-4xl sm:font-[800] font-[700] leading-xl text-3xl mb-2">
                                {topic.title}
                            </h1>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap">
                            {tagsComp}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:px-16 p-3 md:px-12 md:py-8 break-words">
                        <div className="text-xl">
                            {topic.content}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-4 lg:px-16 p-5 md:px-12 md:py-8">
                        <div className="flex mb-6 justify-between items-center">
                            <div className="flex items-center">
                                <h2 className="sm:text-2xl text-xl sm:leading-base font-[700] text-black leading-sm">
                                    Top comments <span>({topic._count.comments})</span>
                                </h2>
                                <button
                                    className="inline-block rounded-md py-2 px-4 text-center"
                                >
                                    <FaSort size={24} />
                                </button>
                            </div>
                            <div className="flex rounded-md border-2 border-gray-300 py-2 px-4 text-base inline-block leading-base font-[500] border-solid text-center">
                                {/* subscribe or unsubscribe */}
                                <button
                                    type="button"
                                    className=""
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Comment form */}
                        <CommentTextAreaForm userId={session?.user.id ?? ""} topicId={topic.id} topicUserIcon={session?.user.image ?? ""} defaultStyle={false} />

                        {/* Comment List */}
                        <CommentLists topicId={topic.id} user={{
                            id: session?.user.id ?? "",
                            image: session?.user.image ?? "",
                        }} />

                        {/*  */}
                        <div className="text-center text-sm flex items-center justify-center">
                            <Link href="/" className="text-black">
                                Code of conduct
                            </Link>
                            <span className="px-2 opacity-25">
                                <LuDot />
                            </span>
                            <Link href="/" className="text-black">
                                Report abuse
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}