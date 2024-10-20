import Link from "next/link";
import SideLinksPages from "~/component/common/side-pages";
import Header from "~/component/header/header";
import HomeLists from "~/component/home/home-lists";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <Header />
      <main className="pt-14 min-h-screen flex flex-1 text-lg bg-gray-100">
        {/* Main */}
        <div className="w-full md:p-4 text-base max-w-[1380px] my-0 mx-auto grid gap-4 md:grid-cols-[2fr_5fr] lg:grid-cols-[240px_2fr_1fr]">
          {/* Side bar */}
          <div className="md:block hidden min-w-0">
            <SideLinksPages />
          </div>

          {/* Topic lists */}
          <div className="min-w-0">
            <div className="flex flex-col">
              {/* Latest, Relevant, and top */}
              <nav className="md:p-0 md:mb-2 px-3 py-2 text-lg ">
                <div className="md:mx-0 flex justify-between items-center">
                  <ul className="flex items-center py-1 -my-1">
                    <li>
                      <button
                        type="button"
                        className="flex inline-flex py-2 px-3 rounded-md hover:bg-white hover:text-blue-300 font-[700] text-black"
                      >
                        Relevant
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="flex inline-flex py-2 px-3 rounded-md hover:bg-white hover:text-blue-300 font-[500] text-black"
                      >
                        Latest
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="flex inline-flex py-2 px-3 rounded-md hover:bg-white hover:text-blue-300 font-[500] text-black"
                      >
                        Top
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Topic Lists and advertisement */}
              <HomeLists />
            </div>
          </div>

          {/* discussion lists,... */}
          <div className="lg:block hidden min-w-0">
            <div className="flex flex-col items-center w-full">
              {/* Tag1 */}
              <div className="bg-white text-black shadow-md rounded-md w-full">
                {/* Header */}
                <div className="py-3 px-4 border-b-2 border-solid border-gray-50">
                  <h3 className="sm:text-xl sm:leading-base font-[700] text-black">
                    <Link
                      href="/"
                    >
                      #discuss
                    </Link>
                    <p className="text-xs text-gray-500">Discussion threads targeting the whole community</p>
                  </h3>
                </div>

                {/* Content pages */}
                <div className="">
                  <Link
                    href="/"
                    className="p-4 block border-b-2 border-solid border-gray-50 text-gray-700"
                  >
                    How do you raise funds for an open-source project?
                    <p className="text-gray-400 text-sm pt-1">6 comments</p>
                  </Link>
                </div>

                <div className="">
                  <Link
                    href="/"
                    className="p-4 block border-b-2 border-solid border-gray-50 text-gray-700"
                  >
                    Discussion type 2
                    <p className="text-gray-400 text-sm pt-1">10 comments</p>
                  </Link>
                </div>
              </div>

              {/* Tag2 */}
              <div className="bg-white text-black shadow-md rounded-md mt-4 w-full">
                {/* Header */}
                <div className="py-3 px-4 border-b-2 border-solid border-gray-50">
                  <h3 className="sm:text-xl sm:leading-base font-[700] text-black">
                    <Link
                      href="/"
                    >
                      #watercooler
                    </Link>
                    <p className="text-xs text-gray-500">Light, and off-topic conversation.</p>
                  </h3>
                </div>

                {/* Content pages */}
                <div className="">
                  <Link
                    href="/"
                    className="p-4 block border-b-2 border-solid border-gray-50 text-gray-700"
                  >
                    Bad CSS-Dad jokes
                    <p className="text-gray-400 text-sm pt-1">2 comments</p>
                  </Link>
                </div>

                <div className="">
                  <Link
                    href="/"
                    className="p-4 block border-b-2 border-solid border-gray-50 text-gray-700"
                  >
                    Discussion type 2
                    <p className="text-gray-400 text-sm pt-1">10 comments</p>
                  </Link>
                </div>
              </div>

              {/* Trending */}
              <div className="pt-0 pb-4 mt-4 mb-4 border-b-2 border-solid border-b-black w-full">
                <h3 className="text-basis ">
                  trending guide/resources
                </h3>
                {/* Content */}
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="block p-4 text-black hover:bg-white hover:text-blue-400 text-wrap"
                    >
                      10 Things You Can Learn from Netflix Architecture
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block p-4 text-black hover:bg-white hover:text-blue-400 text-wrap"
                    >
                      Twitter System Design Example for Tech Interviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block p-4 text-black hover:bg-white hover:text-blue-400 text-wrap"
                    >
                      10 Software Design and Programming Best Practices for Developers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Recently queried */}
              <div className="pt-0 pb-4 mt-4 mb-4 border-b-2 border-solid border-b-black w-full">
                <h3 className="text-basis ">
                  Recently queried
                </h3>
                {/* Content */}
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="block p-4 text-black hover:bg-white hover:text-blue-400 text-wrap"
                    >
                      Button Animation CSS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block p-4 text-black hover:bg-white hover:text-blue-400 text-wrap"
                    >
                      Python Ternary
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block p-4 text-black hover:bg-white hover:text-blue-400 text-wrap"
                    >
                      Is CSS a Programming Language
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
