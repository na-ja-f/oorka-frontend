import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Story() {
    return (
        <div className="mt-14">
            <div className="max-w-full mx-auto p-2 rounded-lg">
                <ul className="flex space-x-6 font-serif">
                    <li className="flex flex-col items-center  space-y-1 relative">
                        <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                            <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                <img className="h-14 w-14 rounded-full" src="https://i.pinimg.com/564x/3c/0e/06/3c0e06920dd0d35128763ef0cc3403d7.jpg" alt="cute kitty" />
                            </a>
                        </div>
                        <button  className="absolute bottom-5 right-4 bg-gradient-to-b from-purple-600 to-blue-400 rounded-full h-6 w-6  text-white font-semibold border-2 border-white flex justify-center items-center font-mono hover:bg-blue-700">
                            <Plus size={15} />
                        </button>
                        <a href="#">Add Story</a>
                    </li>

                        <li className="flex flex-col items-center space-y-1 ">
                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                                <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                    <img className="h-14 w-14 rounded-full bg-myViolet" alt="" />
                                </a>
                            </div>
                            <a href="#">user</a>
                        </li>
                        <li className="flex flex-col items-center space-y-1 ">
                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                                <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                    <img className="h-14 w-14 rounded-full bg-gray-500" alt="" />
                                </a>
                            </div>
                            <a href="#">user</a>
                        </li>
                        <li className="flex flex-col items-center space-y-1 ">
                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                                <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                    <img className="h-14 w-14 rounded-full bg-gray-500" alt="" />
                                </a>
                            </div>
                            <a href="#">user</a>
                        </li>
                        <li className="flex flex-col items-center space-y-1 ">
                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                                <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                    <img className="h-14 w-14 rounded-full bg-gray-500" alt="" />
                                </a>
                            </div>
                            <a href="#">user</a>
                        </li>
                        <li className="flex flex-col items-center space-y-1 ">
                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                                <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                    <img className="h-14 w-14 rounded-full bg-gray-500" alt="" />
                                </a>
                            </div>
                            <a href="#">user</a>
                        </li>
                        <li className="flex flex-col items-center space-y-1 ">
                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                                <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                    <img className="h-14 w-14 rounded-full bg-gray-500" alt="" />
                                </a>
                            </div>
                            <a href="#">user</a>
                        </li>

                </ul>
            </div>
        </div>
    )
}

export default Story
