import { X } from "lucide-react";
import { useState, useEffect } from "react";

function ViewStory({ story, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const numStories = story.stories.length;

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? numStories - 1 : prevIndex - 1
        );
        updateProgress();
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % numStories);
        setProgress(0);
    };

    const updateProgress = () => {
        setProgress(0);
    };

    useEffect(() => {
        const incrementValue = 100 / (15 * 1000 / 300);
        const timer = setTimeout(() => {
            if (progress >= 100) {
                handleNextClick();
            } else {
                setProgress((prevProgress) =>
                    prevProgress + incrementValue
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [progress]);

    useEffect(() => {
        const timer = setTimeout(handleNextClick, 15000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === numStories) {
            onClose();
        }
    }, [currentIndex, numStories, onClose]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="rounded-lg relative">
                <button
                    className="absolute z-50 top-8 right-2 text-gray-900"
                    onClick={onClose}
                >
                    <X color="white" />
                </button>
                <div className="flex left-3 absolute z-50 top-7 items-center">
                    <img
                        src={story.userId.profileImg}
                        alt="User Avatar"
                        className="h-9 w-9 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-100 font-medium">{story.userId.name}</span>
                </div>
                <div className="relative">
                    <div className="h-1 flex gap-2 w-full rounded-lg mb-2">
                        {Array.from({ length: numStories }).map((_, index) => (
                            <div
                                className="w-full rounded-lg h-1"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                    transition: "width 0.3s ease-in-out",
                                }}
                            >
                                <div
                                    key={index}
                                    className={`bg-gray-300 h-1 rounded-lg`}
                                    style={{
                                        width: `${currentIndex === index
                                                ? progress
                                                : index < currentIndex
                                                    ? "100%"
                                                    : "0"
                                            }%`,
                                        marginLeft: `${index !== 0 ? 1 : 0}%`,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <img
                        src={story.stories[currentIndex].imageUrl}
                        alt="Story"
                        className="rounded-lg"
                        style={{ width: "400px", height: "550px" }}
                    />
                    <div className="absolute top-2/4 left-0 transform -translate-y-2/4 w-full flex justify-between">
                        <button
                            onClick={handlePrevClick}
                            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextClick}
                            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewStory
