import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/Badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Plane, Clock, MapPin, User } from "lucide-react";

export function FlightCard({ flight, index }) {
    const formatDuration = (departure, arrival) => {
        const duration = new Date(arrival) - new Date(departure);
        const h = Math.floor(duration / (1000 * 60 * 60));
        const m = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        return `${h}h ${m}m`;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "CONFIRMED":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px] border-green-300">
                        CONFIRMED
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-[10px] border-orange-300">
                        PENDING
                    </Badge>
                );
            case "CANCELLED":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-[10px] border-red-300">
                        CANCELLED
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <Card className="w-full border-l-4 border-l-blue-500 border border-gray-200 bg-gray-100 transition-all">
            <CardContent className="px-4 sm:px-6">
                <div className="space-y-4 sm:space-y-6">
                    {/* Flight Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div>
                                <h4 className="font-semibold text-base sm:text-lg">
                                    {/* {flight.airline} */}
                                    Airgorithm
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {flight.flight_number} •{" "}
                                    {flight.airplane.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Flight Route */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        {/* Departure */}
                        <div className="text-center md:text-left flex flex-col items-center">
                            <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-gray-500 mb-1">
                                <MapPin className="h-3 w-3" />
                                <span>Departure</span>
                            </div>
                            <div>
                                <div className="text-sm text-center flex flex-col md:flex-row gap-1 sm:text-xl md:text-xl font-bold">
                                    {flight.source.city.name}
                                    <p className="font-semibold">
                                        ({flight.source.airport.code})
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {new Date(
                                        flight.departure_time
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        flight.departure_time
                                    ).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        {/* Flight Path */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                <Clock className="h-3 w-3" />
                                {formatDuration(
                                    flight.departure_time,
                                    flight.arrival_time
                                )}
                            </div>
                            <div className="flex items-center gap-1 w-full max-w-[100px] sm:max-w-[120px]">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                <div className="flex-1 h-px bg-gray-300 relative">
                                    <Plane className="h-3 w-3 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                </div>
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center md:text-right flex flex-col items-center">
                            <div className="flex items-center justify-center md:justify-end gap-1 text-xs text-gray-500 mb-1">
                                <MapPin className="h-3 w-3" />
                                <span>Arrival</span>
                            </div>
                            <div>
                                <div className="text-sm text-center flex flex-col md:flex-row gap-1 sm:text-xl md:text-xl font-bold">
                                    {flight.destination.city.name}
                                    <p className="font-semibold">
                                        ({flight.destination.airport.code})
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {new Date(
                                        flight.arrival_time
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        flight.arrival_time
                                    ).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Passenger Details Table */}
                    <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-200">
                        <h5 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Passenger Details
                        </h5>
                        <div className="border border-gray-200 rounded-lg overflow-hidden ">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead className="font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4">
                                            Name
                                        </TableHead>
                                        <TableHead className="font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4">
                                            Age
                                        </TableHead>
                                        <TableHead className="font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4 sm:table-cell">
                                            Email
                                        </TableHead>
                                        <TableHead className="font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4">
                                            Seat
                                        </TableHead>
                                        <TableHead className="font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4">
                                            Price
                                        </TableHead>
                                        <TableHead className="font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {flight.passengers.map(
                                        (passenger, index) => (
                                            <TableRow
                                                key={index}
                                                className="hover:bg-gray-50"
                                            >
                                                <TableCell className="font-medium text-xs sm:text-sm py-2 px-2 sm:px-4">
                                                    {passenger?.name}
                                                </TableCell>
                                                <TableCell className="text-xs sm:text-sm py-2 px-2 sm:px-4">
                                                    {passenger?.age}
                                                </TableCell>
                                                <TableCell className="text-xs sm:text-sm text-gray-600 py-2 px-2 sm:px-4 sm:table-cell">
                                                    {passenger?.email || "N/A"}
                                                </TableCell>
                                                <TableCell className="py-2 px-2 sm:px-4">
                                                    <Badge
                                                        variant="outline"
                                                        className="font-mono text-xs border-gray-300"
                                                    >
                                                        {passenger?.seat_number}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 px-2 sm:px-4 font-semibold">
                                                    ₹{passenger?.price}/-
                                                </TableCell>
                                                <TableCell className="py-2 px-2 sm:px-4">
                                                    <span
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {getStatusBadge(
                                                            passenger?.status
                                                        )}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
