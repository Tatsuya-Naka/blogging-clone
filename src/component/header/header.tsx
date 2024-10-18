import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth"
import paths from "~/server/paths";
import MenuBar from "./menu-bar";
import SearchForm from "./search-form";
import HeaderItems from "./header-items";

export default async function Header() {
    const session = await getServerAuthSession();

    return (
        <nav className="bg-white z-100 top-0 right-0 left-0 h-14 fixed">
            <div className="max-w-[1380px] w-full h-full flex m-auto relative">
                {/* Menu, Title, and search box */}
                <div className="px-2 flex items-center flex-row w-full m-auto h-full h-full">
                    {/* Menu */}
                    <div className="flex md:hidden inline-block">
                        <MenuBar id={session?.user.id ?? ""}/>
                    </div>

                    {/* TItle icon */}
                    <div className="flex items-center ">
                        <Link
                            href={session?.user ? paths.authenticateUserHome() : paths.home()}
                        >
                            <Image
                                src="https://media.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                                alt="Image"
                                width={100}
                                height={80}
                                className="aspect-[5/4] w-[50px] h-[40px]"
                            />
                        </Link>
                    </div>

                    {/* Search Box */}
                    <div className="flex flex-1 mx-4 items-center max-w-[680px] ">
                        <div className="block w-full">
                            <div className="md:flex hidden flex flex-wrap">
                                <SearchForm />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Items */}
                <HeaderItems id={session?.user.id ?? ""} name={session?.user.name ?? ""} image={session?.user.image ?? ""}/>
            </div>
        </nav>
    )
}