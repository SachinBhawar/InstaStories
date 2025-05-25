const UserStoriesBar = ({ users, activeUserIdx, onUserClick }) => (
    <div
        style={{
            display: "flex",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "16px 0 12px 0",
            background: "rgba(0,0,0,0.85)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 30,
            gap: 18,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            scrollbarWidth: "none",
        }}
    >
        {users.map((user, idx) => (
            <div
                key={user.userId}
                onClick={() => onUserClick(idx)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    opacity: 1,
                    borderBottom: idx === activeUserIdx ? "2px solid #fff" : "2px solid transparent",
                    paddingBottom: 2,
                    minWidth: 60,
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: 54,
                        height: 54,
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Gradient ring to indicate story */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 54,
                            height: 54,
                            borderRadius: "50%",
                            background: "conic-gradient(from 0deg, #ff7e5f, #feb47b, #ff7e5f 100%)",
                            filter: idx === activeUserIdx ? "brightness(1.2)" : "none",
                            zIndex: 1,
                            boxShadow: idx === activeUserIdx ? "0 0 0 3px #fff" : "0 0 0 0px #fff",
                            transition: "box-shadow 0.2s",
                        }}
                    />
                    <img
                        src={user.userImage}
                        alt={user.username}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            border: "2px solid #222",
                            objectFit: "cover",
                            position: "relative",
                            zIndex: 2,
                            background: "#222",
                        }}
                    />
                </div>
                <span
                    style={{
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 500,
                        textAlign: "center",
                        maxWidth: 60,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {user.username}
                </span>
            </div>
        ))}
    </div>
);

export default UserStoriesBar;
