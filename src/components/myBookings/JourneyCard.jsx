import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { FlightCard } from "./FlightCard";
import {
    Calendar,
    MapPin,
    Users,
    CreditCard,
    Eye,
    ChevronUp,
    Plane,
    Clock,
} from "lucide-react";

export function JourneyCard({ journey }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    useEffect(() => {
        const getBookingDate = async () => {
            let res = await fetch(
                `${
                    import.meta.env.VITE_GATEWAY_URL
                }/booking/booking/booking-date/${journey[0].booking_id}`,
                {
                    headers: {
                        "content-type": "application/json",
                    },
                    credentials: "include",
                }
            );
            res = await res.json();
            setBookingDate(res.data.created_at);
        };
        getBookingDate();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case "CONFIRMED":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-300">
                        CONFIRMED
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border border-orange-300">
                        PENDING
                    </Badge>
                );
            case "CANCELLED":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border border-red-300">
                        CANCELLED
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const formatDuration = (departure, arrival) => {
        if (!departure || !arrival) return "N/A";
        try {
            const duration = new Date(arrival) - new Date(departure);
            const h = Math.floor(duration / (1000 * 60 * 60));
            const m = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            return `${h}h ${m}m`;
        } catch (error) {
            return "N/A";
        }
    };

    const calculateTotalPrice = (journey) => {
        let totalPrice = 0;
        journey.forEach((flight) => {
            if (flight.passengers && Array.isArray(flight.passengers)) {
                flight.passengers.forEach((passenger) => {
                    if (passenger && typeof passenger.price === "number") {
                        totalPrice += passenger.price;
                    }
                });
            }
        });
        return totalPrice;
    };

    return (
        <Card className="w-full hover:shadow-lg transition-all duration-200 border border-gray-200 md:w-[90vw] lg:w-[90vw] max-w-[1000px]">
            <CardContent className="px-6">
                <div className="space-y-4">
                    {/* Route Display */}
                    <div className="flex items-center justify-between">
                        {/* Departure */}
                        <div className="text-center md:text-left flex flex-col items-center">
                            <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-gray-500 mb-1">
                                <MapPin className="h-3 w-3" />
                                <span>Departure</span>
                            </div>
                            <div>
                                <div className="text-sm text-center flex flex-col md:flex-row gap-1 sm:text-xl md:text-xl font-bold">
                                    {journey[0]?.source?.city?.name}
                                    <p className="font-semibold">
                                        ({journey[0]?.source?.airport?.code})
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {new Date(
                                        journey[0]?.departure_time
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        journey[0]?.departure_time
                                    ).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        {/* middle */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="w-4 sm:w-8 h-px bg-orange-400"></div>
                                <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 border border-orange-400 rounded-full text-xs">
                                    <Plane className="w-3 h-3 text-orange-700" />
                                    <span className="text-xs text-orange-700 font-medium whitespace-nowrap">
                                        {journey?.length === 1
                                            ? "DIRECT"
                                            : `${journey?.length - 1} STOP${
                                                  journey?.length - 1 > 1
                                                      ? "S"
                                                      : ""
                                              }`}
                                    </span>
                                </div>
                                <div className="w-4 sm:w-8 h-px bg-orange-400"></div>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                                {formatDuration(
                                    journey[0]?.departure_time,
                                    journey?.at(-1)?.arrival_time
                                )}
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center md:text-left flex flex-col items-center">
                            <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-gray-500 mb-1">
                                <MapPin className="h-3 w-3" />
                                <span>Arrival</span>
                            </div>
                            <div>
                                <div className="text-sm text-center flex flex-col md:flex-row gap-1 sm:text-xl md:text-xl font-bold">
                                    {journey?.at(-1)?.destination?.city?.name}
                                    <p className="font-semibold">
                                        (
                                        {
                                            journey?.at(-1)?.destination
                                                ?.airport?.code
                                        }
                                        )
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {new Date(
                                        journey?.at(-1)?.departure_time
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        journey?.at(-1)?.departure_time
                                    ).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Journey Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Travel Date</span>
                            </div>
                            <p className="text-base font-semibold text-gray-900">
                                {new Date(
                                    journey[0]?.departure_time
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                    journey[0]?.departure_time
                                ).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Users className="h-4 w-4" />
                                <span>Passengers</span>
                            </div>
                            <p className="text-base font-semibold text-gray-900">
                                {journey[0]?.passengers?.length} Passenger
                                {journey[0]?.length > 1 ? "s" : ""}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Booking Date</span>
                            </div>
                            <p className="text-base font-semibold text-gray-900">
                                {new Date(bookingDate).toLocaleDateString()}{" "}
                                {new Date(bookingDate).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <CreditCard className="h-4 w-4" />
                                <span>Booking Id</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-800">
                                {journey[0]?.booking_id}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {getStatusBadge(
                                    journey[0]?.passengers[0]?.status
                                )}
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsExpanded(!isExpanded)}
                            size="sm"
                            className="bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp className="h-4 w-4 mr-2" />
                                    Hide Details
                                </>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Expanded Flight Details */}
                    {isExpanded && (
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                                    <Calendar className="h-5 w-5" />
                                    Flight Details
                                </h3>

                                <div className="space-y-6">
                                    {journey?.map((flight, idx) => {
                                        return (
                                            <div key={idx} className="mb-0">
                                                <FlightCard
                                                    key={idx}
                                                    flight={flight}
                                                    index={idx}
                                                />
                                                {idx < journey.length - 1 && (
                                                    <div className="flex items-center justify-center py-2 border-t border-gray-200">
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs sm:text-sm text-orange-700">
                                                            <Clock className="w-4 h-4 text-orange-600" />
                                                            <span>
                                                                Layover in{" "}
                                                                {
                                                                    flight
                                                                        ?.destination
                                                                        ?.city
                                                                        .name
                                                                }{" "}
                                                                (
                                                                {
                                                                    flight
                                                                        ?.destination
                                                                        ?.airport
                                                                        .code
                                                                }
                                                                ) •{" "}
                                                                {formatDuration(
                                                                    flight?.arrival_time,
                                                                    journey[
                                                                        idx + 1
                                                                    ]
                                                                        ?.departure_time
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Journey Summary */}
                            <div className="bg-blue-50 px-6 py-3 rounded-lg border border-blue-200">
                                <div className="flex fle x-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="font-semibold text-blue-900 text-lg">
                                            Journey Summary
                                        </h4>
                                        <p className="text-sm text-blue-700">
                                            {journey[0]?.passengers?.length}{" "}
                                            passenger
                                            {journey[0]?.passengers?.length > 1
                                                ? "s"
                                                : ""}{" "}
                                            • {journey?.length} flight
                                            {journey?.length > 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-900">
                                            ₹{calculateTotalPrice(journey)}/-
                                            {/* ₹8328 */}
                                        </p>
                                        <p className="text-sm text-blue-700">
                                            Total Cost
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
