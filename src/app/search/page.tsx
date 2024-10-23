import Header from "~/component/header/header";
import { HydrateClient } from "~/trpc/server";
import TopicLists from "~/component/home/topic-lists";
import SearchTopicForm from "~/component/search/search-form";

interface SearchPageProps {
    searchParams: {
        term: string;
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { term } = searchParams;

    return (
        <HydrateClient>
            <Header />
            <main className="pt-14 min-h-screen w-full text-lg bg-gray-100">
                {/* Main */}
                <div className=" max-w-[1380px] mx-auto text-base my-0 grid lg:p-4 md:p-2 p-0 md:gap-4">
                    <div className="sm:flex w-full p-0 mx-auto my-0 items-center justify-between w-full p-3">

                        <div className="md:hidden block mb-2">
                            {/* Search */}
                            <SearchTopicForm />
                        </div>

                        {/* Search Result term */}
                        <h1 className="md:text-nowrap md:overflow-x-visible sm:block sm:text-3xl text-black text-2xl inline-flex items-center sm:leading-base font-[700] leading-sm">
                            Search Result {term && <p className="flex gap-1">for<span>{term}</span></p>}
                        </h1>

                        {/* nav */}
                        <nav className="md:mx-0 -mx-3 ">
                            <ul className="flex py-1 -my-1">
                                <li className="">
                                    <button
                                        type="button"
                                        className="font-[700] sm:text-black bg-transparent sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        Most Relevant
                                    </button>
                                    <button
                                        type="button"
                                        className="sm:text-black bg-transparent sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        Newest
                                    </button>
                                    <button
                                        type="button"
                                        className="sm:text-black bg-transparent sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        Oldest
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        <nav className="sm:hidden block -mx-3">
                            <ul className="py-2 px-3 flex overflow-auto">
                                <li>
                                    <button
                                        type="button"
                                        className="font-[700] sm:text-black hover:text-blue-500 bg-white rounded-md sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        Posts
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="font-[500] sm:text-black hover:bg-white hover:text-blue-500 rounded-md sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        My posts only
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Lists */}
                    <div className="grid lg:grid-cols-[240px_1fr] md:grid-cols-[2fr_5fr] max-w-[1380px] text-base  my-0 lg:gap-4 md:gap-2">
                        <div className="sm:block hidden lg:w-[240px] md:w-[2fr] ">
                            <ul className="m-0 p-0 sm:block py-1 -my-1 fe">
                                <li className="">
                                    <button
                                        type="button"
                                        className="font-[700] sm:text-black hover:text-blue-500 bg-white rounded-md sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        Posts
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="font-[500] sm:text-black hover:bg-white hover:text-blue-500 rounded-md sm:inline-flex px-3 py-2 text-gray-800 rounded-md"
                                    >
                                        My posts only
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="min-w-0 lg:w-[1fr] md:w-[5fr] w-full">
                            <TopicLists take={5} skip={0} term={term}/>
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