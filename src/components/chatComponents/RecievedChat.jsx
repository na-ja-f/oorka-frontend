import { formatDistanceToNow } from "date-fns";
import 'react-h5-audio-player/lib/styles.css';
import CustomAudioPlayer from "./AudioPlayer";
import { BASE_URL } from "../../constants/baseURL";
import { useEffect } from "react";


function RecievedChat({ message }) {
    useEffect(() => {
        console.log('message',message);
    },[])
    return (
        <div className="w-full flex items-start gap-2.5">
            <img
                className="w-8 h-8 rounded-full"
                src={message?.sender?.profileImg}
                alt="Jese image"
            />
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {message?.sender?.name}
                    </span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        {message?.createdAt && formatDistanceToNow(
                            (message.createdAt),
                            { addSuffix: true }
                        )}
                    </span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    {(!message?.attachment || message?.attachment?.type === 'text') && (
                        <p className="text-xs font-normal text-gray-900 dark:text-white">
                            {' '}
                            {message?.text}
                        </p>)}
                    {
                        message?.attachment &&
                        message?.attachment.type === 'image' && (
                            <img
                                src={`${BASE_URL}/api/chatMedia/images/${message.attachment.filename}`}
                                alt=""
                                className="relative rounded-lg object-cover w-full h-full"
                            />
                        )
                    }
                    {
                        message?.attachment &&
                        message?.attachment.type === 'video' && (
                            <video
                                controls
                                className="relative rounded-lg object-cover w-full h-full"
                            >
                                <source
                                    src={`${BASE_URL}/api/chatMedia/videos/${message.attachment.filename}`}
                                />
                            </video>

                        )
                    }
                    {
                        message?.attachment &&
                        message?.attachment.type === 'audio' && (
                            <CustomAudioPlayer
                                src={`${BASE_URL}/api/chatMedia/audios/${message.attachment.filename}`}
                            />
                        )
                    }
                </div>
            </div>
            <div
                id="dropdownDots"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
            >
                <ul className="py-2 text-xs text-gray-700 dark:text-gray-200 hover:cursor-pointer" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">
                            Reply
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Forward
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Copy
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Report
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default RecievedChat
