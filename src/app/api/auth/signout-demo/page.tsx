import { signOut } from "next-auth/react";
import SignOutButton from "~/component/auth/signout-button";
import Header from "~/component/header/header";
import { HydrateClient } from "~/trpc/server";

export default async function Signout() {
    return (
        <HydrateClient>
            <Header />
            <main className=" min-h-screen flex flex-1 text-lg bg-gray-100 items-center justify-center">
                <form className="flex items-center justify-center flex-col gap-2"
                    action={async() => {
                        "use server";
                        await signOut();
                    }}
                >
                    <h1 className="text-2xl font-[700]">
                        Are you sure you want to sign out now?
                    </h1>
                    {/* <SignOutButton>
                        Sign out
                    </SignOutButton> */}
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                        Sign out
                    </button>
                </form>
            </main>
            {/* footer */}
            <footer className="p-12 bg-gray-300 text-black">
                <div className="py-1 max-w-[1380px] mx-auto flex flex-col gap-2">
                    <p className="text-center font-bold mb-2.5">
                        Thank you to our Diamond Sponsor Neon for supporting our community.

                        DEV Community — A constructive and inclusive social network for software divelopers. With you every step of your journey.

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