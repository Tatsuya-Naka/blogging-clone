import { FiMoreHorizontal } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import Image from "next/image";
import adImage1 from "../../../public/simple.png"

export default function Ad1() {
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

                {/* Function */}
                <button
                    type="button"
                    className="p-1 rounded-md bg-transparent hover:bg-gray-200 text-black "
                >
                    <VscChromeClose className="w-5 h-5" />
                </button>
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
                    <Link className="text-2xl font-[700] leading-sm p-0" href="https://github.com/Tatsuya-Naka">
                        Heads Up
                    </Link>

                    {/* Content */}
                    <div className="shadow-md rounded-md flex w-full mb-5 mt-4">
                        <Link
                            href="https://github.com/Tatsuya-Naka"
                            className=""
                        >
                            <div className="h-[60px] w-[60px] inline-block relative rounded-md pt-3 pr-2.5 pb-4 pl-4">
                                <Image 
                                    src="https://media.dev.to/dynamic/image/width=775%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F1%2Fd908a186-5651-4a5a-9f76-15200bc6801f.jpg"
                                    alt="Image"
                                    width={33}
                                    height={33}
                                    className="rounded-md"
                                />
                                <div className="border-2 border-solid border-white w-4 h-4 inline-block absolute right-2 bottom-2.5 max-w-9 max-h-9 rounded-full">
                                    <Image 
                                        src="https://media.dev.to/dynamic/image/width=775%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F3%2F13d3b32a-d381-4549-b95e-ec665768ce8f.png"
                                        alt="image"
                                        height={15}
                                        width={15}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="https://github.com/Tatsuya-Naka"
                            className="w-full"
                        >
                            <div className="p-4">
                                <h2 className="text-xl leading-sm font-[700] ">Introducing DEV++</h2>
                                <h3 className="my-1.5 text-sm text-black leadingsm">Ben Helpern for the DEV Team ・ Aug</h3>
                                <div className="leading-xs text-xs mb-1.5 text-black flex gap-2 items-center">
                                    <label className="mr-1 text-xs ml-px">#meta</label>
                                    <label className="mr-1 text-xs ml-px">#news</label>
                                    <label className="mr-1 text-xs ml-px">#productivity</label>
                                    <label className="mr-1 text-xs ml-px">#career</label>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <p className="text-base font-[500] ">Happy coding</p>
                </div>
            </div>
        </div>
    )
}