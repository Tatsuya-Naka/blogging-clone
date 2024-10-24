import Header from "~/component/header/header";
import EditProfile from "~/component/profile/edit-profile";
import { HydrateClient } from "~/trpc/server";
import { Suspense } from "react";

interface ProfileEditPageProps {
    params: {
        userId: string;
    }
}

export default async function ProfileEditPage({ params }: ProfileEditPageProps) {
    const { userId } = params;

    return (
        <HydrateClient>
            <Header />
            <main className="pt-14 min-h-screen flex flex-1 text-lg bg-gray-100">
                <Suspense fallback={"Loading..."}>
                    <EditProfile userId={userId} />
                </Suspense>
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