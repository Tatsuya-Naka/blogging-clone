import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import adImage1 from "../../../public/simple_a.png"
import paths from "~/server/paths";

export default function Ad2() {
    return (
        <div className="md:p-5 p-4 text-2xl w-full shadow-md bg-white mb-1 md:rounded-md">
            {/* Header */}
            <div className="flex md:mb-2 mb-3 items-center justify-between">
                {/* Title */}
                <div className="flex w-full items-center justify-between">
                    <p className="text-sm text-black leading-base ml-1">
                        DEV Launch
                    </p>
                    <button
                        type="button"
                        className="p-1 rounded-md bg-transparent hover:bg-gray-200 text-black "
                    >
                        <FiMoreHorizontal className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="md:px-10 w-full">
                <div className="text-basis flex flex-col ">
                    <Link href="/" className="mb-5 text-center">
                        <Image
                            height={775}
                            width={406}
                            src={adImage1}
                            alt="Image"
                            className="aspect-[381/200] w-full h-full rounded-md"
                        />
                    </Link>

                    {/* title */}
                    <Link href="https://github.com/Tatsuya-Naka" className="text-xl text-wrap font-[700] mb-2.5 leading-sm p-0">
                        Need to stay up-to-date with the software world?
                    </Link>
                    <p className="text-lg">Look no further</p>
                    <p className="text-lg">You can do so much more once you create your account. Follow the devs and topics you care about, and keep up-to-date.</p>

                    <Link
                        href={paths.signInPath()}
                        className="text-2xl mb-2.5 font-[700] leading-sm underline text-blue-700"
                    >  
                        Start now
                    </Link>

                    <p className="text-base font-[500] ">Happy coding</p>
                </div>
            </div>
        </div>
    )
}