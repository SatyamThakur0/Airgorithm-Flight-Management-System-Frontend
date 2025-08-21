import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Plane,
    Clock,
    MapPin,
    X,
    CheckCircle,
    Users,
    Loader2,
} from "lucide-react";
import { PassengerTable } from "./PassengerTable";
import GetBookedSeats from "./GetBookedSeats";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function LinearBookingPage({ flights }) {
    const [passengers, setPassengers] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState({});
    const [bookedSeats, setBookedSeats] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const navigate = useNavigate();

    if (!flights || flights.length === 0) {
        return (
            <div className="text-center text-slate-600 py-8">
                No flights available for booking.
            </div>
        );
    }

    const handleSeatSelect = (flightId, seatId, legOrder, seatClass) => {
        if (passengers.length === 0) return;
        setSelectedSeats((prev) => {
            const currentSeats = prev[flightId] || [];
            const isSelected = currentSeats.some((s) => s.seatId === seatId);
            if (isSelected) {
                return {
                    ...prev,
                    [flightId]: currentSeats.filter((s) => s.seatId !== seatId),
                };
            } else if (currentSeats.length < passengers.length) {
                return {
                    ...prev,
                    [flightId]: [
                        ...currentSeats,
                        { seatId, legOrder, seatClass },
                    ],
                };
            }
            return prev;
        });
    };

    const getSeatClass = (seatClass) => {
        switch (seatClass) {
            case "business":
                return "bg-purple-500 hover:bg-purple-600 text-white";
            case "premium":
                return "bg-blue-500 hover:bg-blue-600 text-white";
            case "economy":
                return "bg-emerald-500 hover:bg-emerald-600 text-white";
            default:
                return "bg-slate-500 text-white";
        }
    };

    const getTotalPrice = () => {
        return flights.reduce((total, flight) => {
            const flightSeats = selectedSeats[flight.id] || [];
            let classPriceFactor = flight.class_price_factor;
            if (typeof classPriceFactor === "string") {
                try {
                    classPriceFactor = JSON.parse(classPriceFactor);
                } catch (e) {
                    classPriceFactor = {};
                }
            }
            const basePrice = parseFloat(flight.price);
            let flightTotal = 0;
            for (const seatObj of flightSeats) {
                const seatClass = seatObj.seatClass || seatObj.class;
                const priceFactor = classPriceFactor[seatClass] || 1;
                flightTotal += Math.round(basePrice * priceFactor);
            }
            return total + flightTotal;
        }, 0);
    };

    const canCompleteBooking = () => {
        if (passengers.length === 0) return false;
        return flights.every((flight) => {
            const flightSeats = selectedSeats[flight.id] || [];
            return flightSeats.length === passengers.length;
        });
    };

    const handleCompleteBooking = async () => {
        if (isBooking) return;
        setIsBooking(true);
        const payload = [];
        for (let flightId in selectedSeats) {
            for (let i = 0; i < selectedSeats[flightId].length; i++) {
                let passenger = passengers[i];
                let seat = selectedSeats[flightId][i];
                let payloadEntry = {
                    ...passenger,
                    flightId,
                    legOrder: seat.legOrder,
                    seatId: seat.seatId,
                    class: seat.seatClass,
                };
                payload.push(payloadEntry);
            }
        }
        try {
            let res = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/booking/booking`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            if (res.status == 401) {
                localStorage.removeItem("user");
                window.location.href = "/auth";
                toast.error("Session expired, Login again.");
            }
            res = await res.json();
            if (!res.ok) {
                toast.error(res.message);
                return;
            }
            toast.success("Ticket booked.");
            // window.location.reload();
            navigate("/my-bookings");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsBooking(false);
        }
    };

    const handlePassengersChange = (newPassengers) => {
        setPassengers(newPassengers);
        if (newPassengers.length < passengers.length) {
            const newSelectedSeats = { ...selectedSeats };
            Object.keys(newSelectedSeats).forEach((flightId) => {
                if (newSelectedSeats[flightId].length > newPassengers.length) {
                    newSelectedSeats[flightId] = newSelectedSeats[
                        flightId
                    ].slice(0, newPassengers.length);
                }
            });
            setSelectedSeats(newSelectedSeats);
        }
        if (newPassengers.length === 0) {
            setSelectedSeats({});
        }
    };

    // const formatDuration = (departure, arrival) => {
    //     const duration = new Date(arrival) - new Date(departure);
    //     const h = Math.floor(duration / (1000 * 60 * 60));
    //     const m = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    //     return `${h}h ${m}m`;
    // };
    function formatDuration(startStr, endStr) {
        // Convert strings like "16/8/2025, 1:00:00 pm" into Date objects
        function parseDateTime(dateTimeStr) {
            const [datePart, timePart, meridian] = dateTimeStr.split(/[\s,]+/);
            const [day, month, year] = datePart.split("/").map(Number);
            let [hours, minutes, seconds] = timePart.split(":").map(Number);

            // Convert 12h -> 24h format
            if (meridian.toLowerCase() === "pm" && hours < 12) hours += 12;
            if (meridian.toLowerCase() === "am" && hours === 12) hours = 0;

            return new Date(year, month - 1, day, hours, minutes, seconds);
        }

        const start = parseDateTime(startStr);
        const end = parseDateTime(endStr);

        let diffMs = Math.abs(end - start); // difference in ms

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        diffMs %= 1000 * 60 * 60 * 24;

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        diffMs %= 1000 * 60 * 60;

        const minutes = Math.floor(diffMs / (1000 * 60));
        diffMs %= 1000 * 60;

        return days == 0
            ? `${hours}h ${minutes}m`
            : `${days}d ${hours}h ${minutes}m`;
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            {flights && flights.length > 0 && (
                <GetBookedSeats
                    flights={flights}
                    bookedSeats={bookedSeats}
                    setBookedSeats={setBookedSeats}
                />
            )}
            <PassengerTable
                passengers={passengers}
                onPassengersChange={handlePassengersChange}
                selectedSeats={selectedSeats}
                flightNumbers={flights.map((f) => f.flight_number)}
            />
            <div className="text-center px-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                    Select Seats for Your Journey
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                    {passengers.length > 0
                        ? `Choose seats for all ${passengers.length} passenger${
                              passengers.length > 1 ? "s" : ""
                          } on each flight`
                        : "Add passengers above to enable seat selection"}
                </p>
            </div>
            {passengers.length === 0 && (
                <Card className="bg-amber-50/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-amber-800 text-sm sm:text-base">
                                    Add Passengers First
                                </h3>
                                <p className="text-amber-700 text-xs sm:text-sm mt-1">
                                    Please add passengers using the form above
                                    to enable seat selection. Seat grids are
                                    disabled until passengers are added.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            {flights.map((flight, flightIndex) => {
                console.log(flight);

                const flightSeats = selectedSeats[flight.id] || [];
                const seatConfig = flight.airplane && flight.airplane.seat;
                // Normalize seatConfig if needed
                let normalizedSeatConfig = seatConfig;
                // console.log(normalizedSeatConfig);

                if (
                    seatConfig &&
                    typeof seatConfig.economy === "number" &&
                    typeof seatConfig.premium === "number" &&
                    typeof seatConfig.business === "number"
                ) {
                    normalizedSeatConfig = {
                        economy: { seats: seatConfig.economy },
                        premium: { seats: seatConfig.premium },
                        business: { seats: seatConfig.business },
                    };
                }
                console.log(normalizedSeatConfig);
                
                // Robustly extract booked seat IDs for this flight
                const bookedSeatIds = Array.isArray(bookedSeats[flightIndex])
                    ? bookedSeats[flightIndex].map((seat) => {
                          if (typeof seat === "string") return seat;
                          if (seat && typeof seat === "object")
                              return seat.seatId || seat.id;
                          return seat;
                      })
                    : [];
                if (!normalizedSeatConfig) {
                    console.warn("Seat data not available for flight", flight);
                    return (
                        <div
                            key={flight.id}
                            className="text-center text-red-600 py-4"
                        >
                            Seat data not available for flight{" "}
                            {flight.flight_number}.
                        </div>
                    );
                }
                const seatLetters = ["A", "B", "C", "D", "E", "F"];
                let seats = [];
                let currentRow = 1;
                // Business
                console.log(normalizedSeatConfig.business);
                console.log(normalizedSeatConfig.business.seats);

                if (
                    normalizedSeatConfig.business &&
                    normalizedSeatConfig.business.seats
                ) {
                    const businessRows = Math.ceil(
                        normalizedSeatConfig.business.seats / 6
                    );
                    // console.log(businessRows);

                    // Parse class_price_factor for this flight
                    let classPriceFactor = flight.class_price_factor;
                    if (typeof classPriceFactor === "string") {
                        try {
                            classPriceFactor = JSON.parse(classPriceFactor);
                        } catch (e) {
                            classPriceFactor = {};
                        }
                    }
                    const basePrice = parseFloat(flight.price);
                    const businessPrice = Math.round(
                        basePrice * (classPriceFactor.business || 1)
                    );
                    for (let i = 0; i < businessRows; i++) {
                        for (let j = 0; j < 6; j++) {
                            const seatNum = i * 6 + j;
                            if (seatNum >= normalizedSeatConfig.business.seats)
                                break;
                            const seatId = `${currentRow}${seatLetters[j]}`;
                            seats.push({
                                id: seatId,
                                row: currentRow,
                                letter: seatLetters[j],
                                class: "business",
                                isOccupied: bookedSeatIds.includes(seatId),
                                price: businessPrice,
                            });
                        }
                        currentRow++;
                    }
                }
                // Premium
                if (
                    normalizedSeatConfig.premium &&
                    normalizedSeatConfig.premium.seats
                ) {
                    const premiumRows = Math.ceil(
                        normalizedSeatConfig.premium.seats / 6
                    );
                    let classPriceFactor = flight.class_price_factor;
                    if (typeof classPriceFactor === "string") {
                        try {
                            classPriceFactor = JSON.parse(classPriceFactor);
                        } catch (e) {
                            classPriceFactor = {};
                        }
                    }
                    const basePrice = parseFloat(flight.price);
                    const premiumPrice = Math.round(
                        basePrice * (classPriceFactor.premium || 1)
                    );
                    for (let i = 0; i < premiumRows; i++) {
                        for (let j = 0; j < 6; j++) {
                            const seatNum = i * 6 + j;
                            if (seatNum >= normalizedSeatConfig.premium.seats)
                                break;
                            const seatId = `${currentRow}${seatLetters[j]}`;
                            seats.push({
                                id: seatId,
                                row: currentRow,
                                letter: seatLetters[j],
                                class: "premium",
                                isOccupied: bookedSeatIds.includes(seatId),
                                price: premiumPrice,
                            });
                        }
                        currentRow++;
                    }
                }
                // Economy
                if (
                    normalizedSeatConfig.economy &&
                    normalizedSeatConfig.economy.seats
                ) {
                    const economyRows = Math.ceil(
                        normalizedSeatConfig.economy.seats / 6
                    );
                    let classPriceFactor = flight.class_price_factor;
                    if (typeof classPriceFactor === "string") {
                        try {
                            classPriceFactor = JSON.parse(classPriceFactor);
                        } catch (e) {
                            classPriceFactor = {};
                        }
                    }
                    const basePrice = parseFloat(flight.price);
                    const economyPrice = Math.round(
                        basePrice * (classPriceFactor.economy || 1)
                    );
                    for (let i = 0; i < economyRows; i++) {
                        for (let j = 0; j < 6; j++) {
                            const seatNum = i * 6 + j;
                            if (seatNum >= normalizedSeatConfig.economy.seats)
                                break;
                            const seatId = `${currentRow}${seatLetters[j]}`;
                            seats.push({
                                id: seatId,
                                row: currentRow,
                                letter: seatLetters[j],
                                class: "economy",
                                isOccupied: bookedSeatIds.includes(seatId),
                                price: economyPrice,
                            });
                        }
                        currentRow++;
                    }
                }
                // Get unique rows
                const rows = [...new Set(seats.map((s) => s.row))].sort(
                    (a, b) => a - b
                );
                console.log(rows);

                const flightTotal = flightSeats.reduce((total, seatObj) => {
                    const seat = seats.find((s) => s.id === seatObj.seatId);
                    return total + (seat?.price || 0);
                }, 0);
                return (
                    <Card
                        key={flight.id}
                        className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg"
                    >
                        <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="bg-slate-900 p-2 rounded-lg flex-shrink-0">
                                        <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-slate-900 text-base sm:text-lg lg:text-xl">
                                            Flight {flightIndex + 1}:{" "}
                                            {flight.flight_number}
                                        </CardTitle>
                                        <p className="text-slate-600 text-xs sm:text-sm">
                                            {flight.airline || "Airgorithm"} •{" "}
                                            {flight.airplane.name}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="bg-slate-100 text-slate-700 text-xs sm:text-sm self-start sm:self-center"
                                >
                                    {formatDuration(
                                        flight.departure_time,
                                        flight.arrival_time
                                    )}
                                </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-600 mt-4 p-3 sm:p-4 bg-slate-50/50 rounded-lg space-y-2 sm:space-y-0">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="truncate">
                                        {flight.route.from.city} (
                                        {flight.route.from.airport_code})
                                    </span>
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2 sm:ml-4 flex-shrink-0" />
                                    <span>{flight.departure_time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="truncate">
                                        {flight.route.to.city} (
                                        {flight.route.to.airport_code})
                                    </span>
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2 sm:ml-4 flex-shrink-0" />
                                    <span>{flight.arrival_time}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-6">
                            {/* Seat Selection Info */}
                            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                                {passengers.length > 0 ? (
                                    <>
                                        <p className="text-blue-800 font-medium text-sm sm:text-base">
                                            Select {passengers.length} seat
                                            {passengers.length > 1
                                                ? "s"
                                                : ""}{" "}
                                            for your passengers
                                        </p>
                                        <p className="text-blue-600 text-xs sm:text-sm">
                                            Selected: {flightSeats.length} of{" "}
                                            {passengers.length}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-blue-800 font-medium text-sm sm:text-base">
                                            Seat selection disabled
                                        </p>
                                        <p className="text-blue-600 text-xs sm:text-sm">
                                            Add passengers above to enable seat
                                            selection
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* Seat Legend */}
                            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-3 sm:gap-6 p-3 sm:p-4 bg-slate-50/50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm text-slate-700">
                                        Business (₹
                                        {Math.round(
                                            parseFloat(flight.price) *
                                                ((typeof flight.class_price_factor ===
                                                "string"
                                                    ? JSON.parse(
                                                          flight.class_price_factor
                                                      ).business
                                                    : flight.class_price_factor
                                                          .business) || 1)
                                        )}
                                        )
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm text-slate-700">
                                        Premium (₹
                                        {Math.round(
                                            parseFloat(flight.price) *
                                                ((typeof flight.class_price_factor ===
                                                "string"
                                                    ? JSON.parse(
                                                          flight.class_price_factor
                                                      ).premium
                                                    : flight.class_price_factor
                                                          .premium) || 1)
                                        )}
                                        )
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm text-slate-700">
                                        Economy (₹
                                        {Math.round(
                                            parseFloat(flight.price) *
                                                ((typeof flight.class_price_factor ===
                                                "string"
                                                    ? JSON.parse(
                                                          flight.class_price_factor
                                                      ).economy
                                                    : flight.class_price_factor
                                                          .economy) || 1)
                                        )}
                                        )
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 sm:w-4 h-4 bg-slate-400 rounded flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm text-slate-700">
                                        Occupied
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 rounded border-2 border-amber-600 flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm text-slate-700">
                                        Selected
                                    </span>
                                </div>
                            </div>
                            {/* Seat Map */}
                            <div className="bg-slate-50/50 p-3 sm:p-6 rounded-lg border border-slate-200">
                                <div className="text-center text-slate-500 mb-4 text-xs sm:text-sm font-medium">
                                    Front of Aircraft
                                </div>
                                <div className="space-y-1 sm:space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
                                    {rows.map((row) => (
                                        <div
                                            key={row}
                                            className="flex items-center justify-center space-x-1 sm:space-x-2"
                                        >
                                            <span className="text-xs text-slate-500 w-4 sm:w-6 text-center font-medium">
                                                {row}
                                            </span>
                                            {seatLetters
                                                .slice(0, 3)
                                                .map((letter) => {
                                                    const seat = seats.find(
                                                        (s) =>
                                                            s.row === row &&
                                                            s.letter === letter
                                                    );
                                                    if (!seat)
                                                        return (
                                                            <span
                                                                key={`${row}${letter}`}
                                                                className="w-6 h-6 sm:w-8 sm:h-8"
                                                            ></span>
                                                        );
                                                    const isSelected =
                                                        flightSeats.some(
                                                            (s) =>
                                                                s.seatId ===
                                                                seat.id
                                                        );
                                                    const isOccupied =
                                                        seat.isOccupied;
                                                    const isDisabled =
                                                        passengers.length ===
                                                            0 ||
                                                        isOccupied ||
                                                        (!isSelected &&
                                                            flightSeats.length >=
                                                                passengers.length);
                                                    return (
                                                        <button
                                                            key={`${row}${letter}`}
                                                            onClick={() =>
                                                                !isDisabled &&
                                                                handleSeatSelect(
                                                                    flight.id,
                                                                    seat.id,
                                                                    flightIndex,
                                                                    seat.class // Pass the class here
                                                                )
                                                            }
                                                            disabled={
                                                                isDisabled
                                                            }
                                                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded text-xs font-medium transition-all duration-200 border ${
                                                                passengers.length ===
                                                                0
                                                                    ? "bg-slate-200 cursor-not-allowed text-slate-400 border-slate-300"
                                                                    : isOccupied
                                                                    ? "bg-slate-400 cursor-not-allowed text-white border-slate-400"
                                                                    : isSelected
                                                                    ? "bg-amber-400 text-slate-900 border-2 border-amber-600 shadow-md"
                                                                    : flightSeats.length >=
                                                                      passengers.length
                                                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300"
                                                                    : `${getSeatClass(
                                                                          seat.class
                                                                      )} border-transparent hover:shadow-md`
                                                            }`}
                                                        >
                                                            {isOccupied ? (
                                                                <X className="w-2 h-2 sm:w-3 sm:h-3 mx-auto" />
                                                            ) : (
                                                                letter
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            <div className="w-2 sm:w-4"></div>
                                            {seatLetters
                                                .slice(3)
                                                .map((letter) => {
                                                    const seat = seats.find(
                                                        (s) =>
                                                            s.row === row &&
                                                            s.letter === letter
                                                    );
                                                    if (!seat)
                                                        return (
                                                            <span
                                                                key={`${row}${letter}`}
                                                                className="w-6 h-6 sm:w-8 sm:h-8"
                                                            ></span>
                                                        );
                                                    const isSelected =
                                                        flightSeats.some(
                                                            (s) =>
                                                                s.seatId ===
                                                                seat.id
                                                        );
                                                    const isOccupied =
                                                        seat.isOccupied;
                                                    const isDisabled =
                                                        passengers.length ===
                                                            0 ||
                                                        isOccupied ||
                                                        (!isSelected &&
                                                            flightSeats.length >=
                                                                passengers.length);
                                                    return (
                                                        <button
                                                            key={`${row}${letter}`}
                                                            onClick={() =>
                                                                !isDisabled &&
                                                                handleSeatSelect(
                                                                    flight.id,
                                                                    seat.id,
                                                                    flightIndex,
                                                                    seat.class // Pass the class here
                                                                )
                                                            }
                                                            disabled={
                                                                isDisabled
                                                            }
                                                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded text-xs font-medium transition-all duration-200 border ${
                                                                passengers.length ===
                                                                0
                                                                    ? "bg-slate-200 cursor-not-allowed text-slate-400 border-slate-300"
                                                                    : isOccupied
                                                                    ? "bg-slate-400 cursor-not-allowed text-white border-slate-400"
                                                                    : isSelected
                                                                    ? "bg-amber-400 text-slate-900 border-2 border-amber-600 shadow-md"
                                                                    : flightSeats.length >=
                                                                      passengers.length
                                                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300"
                                                                    : `${getSeatClass(
                                                                          seat.class
                                                                      )} border-transparent hover:shadow-md`
                                                            }`}
                                                        >
                                                            {isOccupied ? (
                                                                <X className="w-2 h-2 sm:w-3 sm:h-3 mx-auto" />
                                                            ) : (
                                                                letter
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Selected Seats Summary for this flight */}
                            {flightSeats.length > 0 && (
                                <div className="p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <h4 className="font-semibold text-emerald-800 mb-2 text-sm sm:text-base">
                                        Selected Seats for Flight{" "}
                                        {flightIndex + 1}
                                    </h4>
                                    <div className="space-y-2">
                                        {flightSeats.map(
                                            (seatObj, seatIndex) => {
                                                const seat = seats.find(
                                                    (s) =>
                                                        s.id === seatObj.seatId
                                                );
                                                const passenger =
                                                    passengers[seatIndex];
                                                return (
                                                    <div
                                                        key={seatObj.seatId}
                                                        className="flex justify-between items-center text-xs sm:text-sm"
                                                    >
                                                        <span className="text-emerald-700">
                                                            {passenger?.name ||
                                                                `Passenger ${
                                                                    seatIndex +
                                                                    1
                                                                }`}
                                                            : {seatObj.seatId} (
                                                            {seat?.class})
                                                        </span>
                                                        <span className="font-semibold text-emerald-800">
                                                            ₹{seat?.price}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        )}
                                        <div className="border-t border-emerald-200 pt-2 mt-2">
                                            <div className="flex justify-between items-center font-semibold text-emerald-800 text-sm sm:text-base">
                                                <span>
                                                    Flight {flightIndex + 1}{" "}
                                                    Total:
                                                </span>
                                                <span>₹{flightTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {passengers.length > 0 &&
                                flightSeats.length === passengers.length && (
                                    <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-center">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0" />
                                        <span className="text-green-800 font-medium text-xs sm:text-sm">
                                            All seats selected for Flight{" "}
                                            {flightIndex + 1}
                                        </span>
                                    </div>
                                )}
                        </CardContent>
                    </Card>
                );
            })}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            Total Booking Amount
                        </h3>
                        <span className="text-xl sm:text-2xl font-bold text-slate-900">
                            ₹{getTotalPrice()}
                        </span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
                        <p>
                            {passengers.length} passenger
                            {passengers.length !== 1 ? "s" : ""} •{" "}
                            {flights.length} flight
                            {flights.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <Button
                        onClick={handleCompleteBooking}
                        disabled={!canCompleteBooking() || isBooking}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 sm:py-3 text-sm sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isBooking ? (
                            <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                                Processing Booking...
                            </>
                        ) : (
                            `Complete Booking - ₹${getTotalPrice()}`
                        )}
                    </Button>
                    {!canCompleteBooking() && !isBooking && (
                        <p className="text-xs sm:text-sm text-slate-500 text-center mt-2">
                            {passengers.length === 0
                                ? "Please add passengers to continue"
                                : "Please select the correct number of seats for all flights to continue"}
                        </p>
                    )}
                    {isBooking && (
                        <p className="text-xs sm:text-sm text-slate-500 text-center mt-2">
                            Please wait while we process your booking...
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
