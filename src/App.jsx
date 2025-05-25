import { useState } from "react";
import UserStoriesBar from "./components/UserStoriesBar";
import StoryPage from "./pages/StoryPage";
import USERS from "./data.json";

const App = () => {
    const [activeUserIdx, setActiveUserIdx] = useState(null);
    console.log(USERS);
    return (
        <div className="w-screen h-screen bg-black overflow-hidden fixed top-0 left-0 font-sans">
            {activeUserIdx === null ? (
                <>
                    <UserStoriesBar users={USERS} activeUserIdx={-1} onUserClick={setActiveUserIdx} />
                    <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center pointer-events-none z-10">
                        <span className="text-white text-base font-medium tracking-[0.2px] text-center opacity-70 bg-black/30 rounded-lg px-4 py-2 pointer-events-none select-none">
                            Click on a user to start seeing their stories
                        </span>
                    </div>
                </>
            ) : (
                <StoryPage initialUserIdx={activeUserIdx} onClose={() => setActiveUserIdx(null)} />
            )}
        </div>
    );
};

export default App;
