import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CheckCircle, CreditCard } from "lucide-react";

export function BookingSummary({
    passengers,
    flights,
    selectedSeats,
    onBack,
    onConfirm,
}) {
    const getTotalPrice = () => {
        return flights.reduce((total, flight) => {
            const flightSeats = selectedSeats[flight.id] || [];
            return (
                total +
                flightSeats.reduce((flightTotal, seatId) => {
                    const seat = flight.seats.find((s) => s.id === seatId);
                    return flightTotal + (seat?.price || 0);
                }, 0)
            );
        }, 0);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Booking Summary
                </h1>
                <p className="text-slate-600">
                    Review your booking details before confirmation
                </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
                        Booking Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Passengers */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                            Passengers ({passengers.length})
                        </h3>
                        <div className="space-y-2">
                            {passengers.map((passenger, index) => (
                                <div
                                    key={passenger.id}
                                    className="p-3 bg-slate-50/50 rounded-lg"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-slate-900">
                                            {passenger.firstName}{" "}
                                            {passenger.lastName}
                                        </span>
                                        <span className="text-sm text-slate-600">
                                            Passenger {index + 1}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        {passenger.email}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-slate-200" />

                    {/* Flights and Seats */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                            Flight Details
                        </h3>
                        <div className="space-y-4">
                            {flights.map((flight, index) => {
                                const flightSeats =
                                    selectedSeats[flight.id] || [];
                                const flightTotal = flightSeats.reduce(
                                    (total, seatId) => {
                                        const seat = flight.seats.find(
                                            (s) => s.id === seatId
                                        );
                                        return total + (seat?.price || 0);
                                    },
                                    0
                                );

                                return (
                                    <div
                                        key={flight.id}
                                        className="p-4 bg-slate-50/50 rounded-lg border border-slate-200"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-semibold text-slate-900">
                                                    Flight {index + 1}:{" "}
                                                    {flight.flightNumber}
                                                </h4>
                                                <p className="text-sm text-slate-600">
                                                    {flight.departure.city} →{" "}
                                                    {flight.arrival.city}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {flight.departure.time} -{" "}
                                                    {flight.arrival.time} •{" "}
                                                    {flight.duration}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-slate-900">
                                                    ${flightTotal}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {flightSeats.length} seat
                                                    {flightSeats.length > 1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            {flightSeats.map(
                                                (seatId, seatIndex) => {
                                                    const seat =
                                                        flight.seats.find(
                                                            (s) =>
                                                                s.id === seatId
                                                        );
                                                    return (
                                                        <div
                                                            key={seatId}
                                                            className="flex justify-between text-sm"
                                                        >
                                                            <span className="text-slate-700">
                                                                {
                                                                    passengers[
                                                                        seatIndex
                                                                    ]?.firstName
                                                                }{" "}
                                                                {
                                                                    passengers[
                                                                        seatIndex
                                                                    ]?.lastName
                                                                }{" "}
                                                                - Seat {seatId}
                                                            </span>
                                                            <span className="text-slate-600">
                                                                ${seat?.price}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Separator className="bg-slate-200" />

                    {/* Total */}
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-bold text-slate-900">
                            Total Amount
                        </span>
                        <span className="font-bold text-slate-900">
                            ${getTotalPrice()}
                        </span>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button
                            onClick={onBack}
                            variant="outline"
                            className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                        >
                            Back to Seats
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                        >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Confirm Booking
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
