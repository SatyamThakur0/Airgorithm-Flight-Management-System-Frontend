import React, { useEffect, useState } from "react";
import {
    Plane,
    Filter,
    SortAsc,
    Star,
    Wifi,
    Coffee,
    Utensils,
    ArrowLeft,
} from "lucide-react";

import AnimatedBackground from "../ui/AnimatedBackground";
import { useLocation, useNavigate } from "react-router";
import JourneyCard from "./JourneyCard";

export default function JourneysPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [journeys, setJourneys] = useState(data);
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 flex justify-center overflow-x-hidden max-w-full w-full box-border">
            <AnimatedBackground mousePosition={mousePosition} />

            <div className="relative z-10 max-w-full w-full box-border overflow-x-hidden">
                {/* Header */}
                <div className="glass-header border-b border-white/20 py-2 mt-2">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                        <div className="flex items-center justify-between w-full max-w-[1000px]">
                            <div className="flex items-center space-x-4 ">
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-black/5 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className={`hidden sm:block text-sm`}>
                                        Back to Search
                                    </span>
                                </button>
                                <div>
                                    <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Available Journeys
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        New York → Tokyo • 12/03/2025
                                    </p>
                                </div>
                            </div>
                            {/* Removed filters and sort dropdowns */}
                        </div>
                    </div>
                </div>

                {/* Journey Results */}
                <div className="w-full max-w-full mx-auto px-1 sm:px-4 lg:px-8 py-2 box-border overflow-x-hidden">
                    <div className="mb-6 flex justify-center">
                        <p className="text-gray-600 w-full max-w-[1000px]">
                            Found{" "}
                            <span className="font-semibold text-gray-900">
                                {journeys.length}
                            </span>{" "}
                            available journeys
                        </p>
                    </div>

                    <div className="space-y-6">
                        {journeys?.map((journey, idx) => (
                            <div key={idx} className="w-full max-w-full box-border overflow-x-hidden rounded-xl sm:rounded-3xl flex justify-center">
                                <JourneyCard
                                    key={idx}
                                    journey={journey}
                                    idx={idx}
                                />
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {journeys.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Plane className="w-12 h-12 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No flights found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your filters or search criteria
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
