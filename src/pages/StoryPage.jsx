import { useState, useEffect, useRef } from "react";
import USERS from "../data.json";

const STORY_DURATION = 5;

const StoryPage = ({ initialUserIdx = 0, onClose }) => {
    const [userIdx, setUserIdx] = useState(initialUserIdx);
    const [storyIdx, setStoryIdx] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    const currentUser = USERS[userIdx];
    const currentStories = currentUser.stories;
    const currentStoryImage = currentStories[storyIdx];

    useEffect(() => {
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current);
                    if (storyIdx < currentStories.length - 1) {
                        setStoryIdx((s) => s + 1);
                        return 0;
                    } else if (userIdx < USERS.length - 1) {
                        setUserIdx((u) => u + 1);
                        setStoryIdx(0);
                        return 0;
                    } else if (onClose) {
                        onClose();
                        return 100;
                    }
                    return 100;
                }
                return prev + 100 / (STORY_DURATION * 10);
            });
        }, 100);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userIdx, storyIdx]);

    const handleStoryClick = (e) => {
        const x = e.clientX;
        const width = window.innerWidth;
        if (x > width / 2) {
            if (storyIdx < currentStories.length - 1) {
                setStoryIdx((s) => s + 1);
            } else if (userIdx < USERS.length - 1) {
                setUserIdx((u) => u + 1);
                setStoryIdx(0);
            } else if (onClose) {
                onClose();
            }
        } else {
            if (storyIdx > 0) {
                setStoryIdx((s) => s - 1);
            } else if (userIdx > 0) {
                setUserIdx((u) => u - 1);
                const prevStories = USERS[userIdx - 1].stories;
                setStoryIdx(prevStories.length - 1);
            }
        }
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                height: "100vh",
                background: "#000",
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: 0,
                fontFamily: "sans-serif",
            }}
            onClick={handleStoryClick}
        >
            {/* Cross button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (onClose) onClose();
                }}
                style={{
                    position: "absolute",
                    top: 18,
                    right: 24,
                    zIndex: 100,
                    background: "rgba(0,0,0,0.6)",
                    border: "none",
                    color: "#fff",
                    fontSize: 28,
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                aria-label="Close"
            >
                ×
            </button>
            {/* Progress Bars and User Info at the very top */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    zIndex: 20,
                }}
            >
                <div
                    style={{
                        width: "100vw",
                        height: 4,
                        background: "rgba(255,255,255,0.2)",
                        display: "flex",
                    }}
                >
                    {currentStories.map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                flex: 1,
                                marginRight: idx < currentStories.length - 1 ? 4 : 0,
                                background: "rgba(255,255,255,0.2)",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    width: idx < storyIdx ? "100%" : idx === storyIdx ? `${progress}%` : "0%",
                                    height: "100%",
                                    background: "#fff",
                                    transition: idx === storyIdx ? "width 0.1s linear" : "none",
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        marginLeft: 20,
                    }}
                >
                    <img
                        src={currentUser.userImage}
                        alt="user"
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            border: "2px solid #fff",
                            objectFit: "cover",
                            marginRight: 10,
                        }}
                    />
                    <span
                        style={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 17,
                            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                        }}
                    >
                        {currentUser.username}
                    </span>
                </div>
            </div>
            {/* Story Image */}
            <img
                src={currentStoryImage}
                alt="story"
                style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
        </div>
    );
};

export default StoryPage;
