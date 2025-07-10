import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Clock,
    Plane,
    Star,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const JourneyCard = ({ journey, idx }) => {
    const [expandedJourney, setExpandedJourney] = useState(null);
    const getTotalPrice = (flights) =>
        flights.reduce((sum, f) => sum + parseInt(f.price), 0);
    const formatDuration = (departure, arrival) => {
        const duration = new Date(arrival) - new Date(departure);
        const h = Math.floor(duration / (1000 * 60 * 60));
        const m = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        return `${h}h ${m}m`;
    };
    return (
        <div className="w-full max-w-[1000px] box-border overflow-x-hidden rounded-xl sm:rounded-3xl">
            <div className="relative w-full max-w-full bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 box-border overflow-x-hidden">
                {/* Top Section */}
                <div className="px-2 sm:px-6 py-4 sm:py-8">
                    {/* Airline Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 text-base sm:text-lg truncate">
                                    Airgorithm Airlines
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    Journey {idx + 1}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Route/Times */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 items-center mb-4 bor der-2 b border-amber-900">
                        <div className="text-center sm:text-left">
                            <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                                {journey[0].departure_time.split(",")[1]}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium truncate text-wrap">{`${
                                journey.at(-1).route.from.city
                            } (${
                                journey.at(-1).route.from.airport_code
                            })`}</div>
                            <div className="text-xs text-gray-500 mt-1">
                                DEPARTURE
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="w-4 sm:w-8 h-px bg-gray-400"></div>
                                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                                    <Plane className="w-3 h-3 text-gray-600" />
                                    <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                                        {journey.length === 1
                                            ? "DIRECT"
                                            : `${journey.length - 1} STOP${
                                                  journey.length - 1 > 1
                                                      ? "S"
                                                      : ""
                                              }`}
                                    </span>
                                </div>
                                <div className="w-4 sm:w-8 h-px bg-gray-400"></div>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                                {formatDuration(
                                    journey[0].departure_time,
                                    journey.at(-1).arrival_time
                                )}
                            </div>
                        </div>
                        <div className="text-center sm:text-right">
                            <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                                {journey.at(-1).arrival_time.split(",")[1]}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium truncate text-wrap">{`${
                                journey.at(-1).route.to.city
                            } (${journey.at(-1).route.to.airport_code})`}</div>
                            <div className="text-xs text-gray-500 mt-1">
                                ARRIVAL
                            </div>
                        </div>
                    </div>
                    {/* Dotted line */}
                    <div className="border-t-2 border-dashed border-gray-300 mb-4"></div>
                    {/* Details Row */}
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-1 sm:gap-4 text-center bo rder-2 border-amber-700">
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Date
                            </div>
                            <div className="text-xs font-semibold text-gray-900 truncate">
                                {journey[0].departure_time.split(",")[0]}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Flight
                            </div>
                            <div className="text-xs font-semibold text-gray-900 truncate">
                                {journey[0].flight_number}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Seat
                            </div>
                            <div className="text-xs font-semibold text-gray-900 truncate">
                                12A
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Gate
                            </div>
                            <div className="text-xs font-semibold text-gray-900 truncate">
                                B7
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Section */}
                <div className="px-2 sm:px-8 py-4 sm:py-8 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <div className="flex items-start sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    4.5
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <span className="text-xs sm:text-sm text-gray-700">
                                    {formatDuration(
                                        journey[0].departure_time,
                                        journey.at(-1).arrival_time
                                    )}
                                </span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                                {journey.length} flight
                                {journey.length > 1 ? "s" : ""}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <div className="text-left sm:text-right">
                                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    ₹{getTotalPrice(journey)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">
                                    per person
                                </div>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-3 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setExpandedJourney(
                                            expandedJourney === idx ? null : idx
                                        )
                                    }
                                    className="border-gray-300 text-gray-800 hover:bg-gray-100 bg-white text-xs px-3 py-2 flex-1 sm:flex-none"
                                >
                                    {expandedJourney === idx
                                        ? "Hide"
                                        : "Details"}
                                    {expandedJourney === idx ? (
                                        <ChevronUp className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                                    ) : (
                                        <ChevronDown className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                                    )}
                                </Button>
                                <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg shadow-gray-900/25 font-semibold px-3 sm:px-4 text-xs sm:text-sm py-2 flex-1 sm:flex-none">
                                    Book Flight
                                    <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Expanded Flight Details */}
                {expandedJourney === idx && (
                    <div className="border-t border-gray-200 bg-white overflow-x-auto">
                        <div className="px-2 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-4">
                            <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 sm:mb-4">
                                Flight Itinerary
                            </h4>
                            <hr className="text-gray-400" />
                            {journey?.map((flight, index) => (
                                <React.Fragment key={index}>
                                    <div className="min-w-0">
                                        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 p-1 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl min-w-0">
                                            {/* Flight Icon */}

                                            {/* Flight Details */}
                                            <div className="flex-1 w-full min-w-0">
                                                <div className="mb-2 sm:mb-4 min-w-0">
                                                    <div className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                                        {flight.airplane.name}
                                                    </div>
                                                    <div className="text-sm text-gray-600 truncate">
                                                        {flight.flight_number}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-4 min-w-0">
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                            Departure
                                                        </div>
                                                        <div className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                                            <div className="">
                                                                {
                                                                    flight.departure_time.split(
                                                                        ","
                                                                    )[0]
                                                                }
                                                            </div>
                                                            <div className="text-sm">
                                                                {
                                                                    flight.departure_time.split(
                                                                        ","
                                                                    )[1]
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-600 truncate text-wrap">
                                                            {
                                                                flight.route
                                                                    .from.city
                                                            }{" "}
                                                            (
                                                            {
                                                                flight.route
                                                                    .from
                                                                    .airport_code
                                                            }
                                                            )
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                            Arrival
                                                        </div>
                                                        <div className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                                            <div>
                                                                {
                                                                    flight.arrival_time.split(
                                                                        ","
                                                                    )[0]
                                                                }
                                                            </div>
                                                            <div className="text-sm">
                                                                {
                                                                    flight.arrival_time.split(
                                                                        ","
                                                                    )[1]
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-600 truncate text-wrap">
                                                            {
                                                                flight.route.to
                                                                    .city
                                                            }{" "}
                                                            (
                                                            {
                                                                flight.route.to
                                                                    .airport_code
                                                            }
                                                            )
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                            Duration
                                                        </div>
                                                        <div className="font-semibold text-gray-900 text-xs sm:text-base truncate">
                                                            {formatDuration(
                                                                flight.departure_time,
                                                                flight.arrival_time
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Layover Info */}
                                    {index < journey.length - 1 && (
                                        <div className="flex items-center justify-center py-2">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs sm:text-sm text-orange-700">
                                                <Clock className="w-4 h-4 text-orange-600" />
                                                <span>
                                                    Layover in{" "}
                                                    {flight.route.to.city} (
                                                    {
                                                        flight.route.to
                                                            .airport_code
                                                    }
                                                    ) •{" "}
                                                    {formatDuration(
                                                        flight.arrival_time,
                                                        journey[index + 1]
                                                            .departure_time
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JourneyCard;
