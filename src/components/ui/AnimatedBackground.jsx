import React from "react";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Main background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80" />
            {/* Fewer, balanced blurred shapes */}
            <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-r from-pink-200/80 to-blue-200/80 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-200/90 to-indigo-200/90 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-200/70 to-teal-200/70 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-yellow-200/80 to-pink-300/80 rounded-full blur-3xl" />
            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                }}
            />
        </div>
    );
}
