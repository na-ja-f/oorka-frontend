import { Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

function AudioPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const audioRef = useRef(null);
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "grey",
            progressColor: "black",
            barWidth: 2,
            cursorWidth: 0,
            height: 40,
        });

        wavesurfer.current.load(src);

        wavesurfer.current.on("play", () => {
            setIsPlaying(true);
        });

        wavesurfer.current.on("pause", () => {
            setIsPlaying(false);
        });

        wavesurfer.current.on("audioprocess", () => {
            setCurrentTime(wavesurfer.current.getCurrentTime());
        });

        // Update currentTime based on audio playback
        wavesurfer.current.on("seek", (progress) => {
            setCurrentTime(progress * wavesurfer.current.getDuration());
        });

        // Update totalDuration when audio is ready
        wavesurfer.current.on("ready", () => {
            setTotalDuration(wavesurfer.current.getDuration());
        });

        return () => {
            wavesurfer.current.destroy();
        };
    }, [src]);

    useEffect(() => {
        const handlePause = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        };

        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener("pause", handlePause);
        }

        return () => {
            const audio = audioRef.current;
            if (audio) {
                // audio.removeEventListener("pause", handlePause);
            }
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            wavesurfer.current.pause();
        } else {
            wavesurfer.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleWaveformClick = (e) => {
        const clickX = e.nativeEvent.offsetX;
        const waveformWidth = waveformRef.current.clientWidth;
        const progress = clickX / waveformWidth;
        wavesurfer.current.seekTo(progress);
        setTotalDuration(wavesurfer.current.getDuration());
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 py-1 rounded-e-xl rounded-es-xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    onClick={togglePlay}
                >
                    {isPlaying ? (
                        <Pause size={15} />
                    ) : (
                        <Play fill="true" size={15} />
                    )}
                </button>
                <div
                    ref={waveformRef}
                    className="w-[145px] md:w-[185px] md:h-[40px]"
                    onClick={handleWaveformClick}
                    style={{ cursor: "pointer" }}
                />
                <span className="inline-flex self-center items-center p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {isPlaying ? formatTime(currentTime) : formatTime(totalDuration)}
                </span>
            </div>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
}

export default AudioPlayer
