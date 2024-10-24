import { Suspense } from "react";
import Header from "~/component/header/header";
import ProfileUserInfo from "~/component/profile/profile-userInfo";
import { HydrateClient } from "~/trpc/server";

interface ProfilePageProps {
    params: {
        userId: string;
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { userId } = params;

    return (
        <HydrateClient>
            <Header />
            <main className="pt-14 min-h-screen flex flex-1 text-lg bg-gray-100 w-full relative z-0">
                <Suspense fallback={"Loading..."}>
                    <ProfileUserInfo userId={userId} />
                </Suspense>
            </main>
        </HydrateClient>
    )
}