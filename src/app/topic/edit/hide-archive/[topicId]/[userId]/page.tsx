import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "~/component/header/header";
import EditHideArchiveForm from "~/component/topic/edit-hide-archive-form";
import { db } from "~/server/db";
import paths from "~/server/paths";
import { HydrateClient } from "~/trpc/server";

interface HideArchiveTopicPageProps {
    params: {
        topicId: string;
        userId: string;
    }
}
export default async function HideArchiveTopicPage({ params }: HideArchiveTopicPageProps) {
    const { topicId, userId } = params;

    const topic = await db.topic.findFirst({
        where: {id: topicId, userId: userId}
    });

    if (!topic) {
        return notFound();
    }

    return (
        <HydrateClient>
            <Header />
            <main className="h-[530px] bg-gray-100">
                <div className="pt-14 flex flex-auto text-lg max-w-[1380px] items-center">
                    <div className="w-[1024px] text-base grid grid-cols-[1fr] mx-auto my-0 p-4 gap-0">
                        <div className="md:mx-6 -mb-1 mt-3 text-black shadow-md bg-white text-lg px-16 py-8">
                            Final confirmation
                        </div>
                        <div className="text-black shadow-lg rounded-md px-16 py-8 bg-white">
                            <h1 className="mb-2 sm:text-2xl text-xl sm:leading-base font-[700] leading-sm">
                                Are you sure you want to {topic.isPublic ? "hide" : "archive"} this topic?
                            </h1>
                            <p className="text-lg mb-4">
                                You cannot undo this action, perhaps you just want to <Link href={paths.topicPage(params.topicId)} className="text-createAccountBG">unpublish</Link> instead?
                            </p>

                            <Suspense fallback={"Loading..."}>
                                <EditHideArchiveForm topic={topic} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>

            {/* footer */}
            <footer className="p-12 bg-gray-300 text-black">
                <div className="py-1 max-w-[1380px] mx-auto flex flex-col gap-2">
                    <p className="text-center font-bold mb-2.5">
                        Thank you to our Diamond Sponsor Neon for supporting our community.

                        DEV Community — A constructive and inclusive social network for software developers. With you every step of your journey.

                        Home
                        DEV++
                        Podcasts
                        Videos
                        Tags
                        DEV Help
                        Forem Shop
                        Advertise on DEV
                        DEV Challenges
                        DEV Showcase
                        About
                        Contact
                        Free Postgres Database
                        Guides
                        Software comparisons
                        Code of Conduct
                        Privacy Policy
                        Terms of use
                        Built on Forem — the open source software that powers DEV and other
                    </p>
                </div>
            </footer>
        </HydrateClient>
    )
}