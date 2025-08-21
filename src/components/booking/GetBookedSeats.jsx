import React, { useEffect } from "react";
import { toast } from "sonner";

const GetBookedSeats = ({ flights, bookedSeats, setBookedSeats }) => {
    // console.log(bookedSeatsState);

    useEffect(() => {
        setBookedSeats([]);
        const get = async () => {
            for (let flight of flights) {
                let res = await fetch(
                    `${
                        import.meta.env.VITE_GATEWAY_URL
                    }/booking/booking-flight/seats/${flight.id}`,
                    {
                        method: "GET",
                        credentials: "include",
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
                }
                if (res.ok) {
                    // Normalize: if res.data is an array of objects, extract seatId/id
                    let seatIds = [];
                    if (Array.isArray(res.data)) {
                        if (typeof res.data[0] === "object") {
                            seatIds = res.data.map((s) => s.seatId || s.id);
                        } else {
                            seatIds = res.data;
                        }
                    }
                    setBookedSeats((bookedSeats) => [...bookedSeats, seatIds]);
                }
            }
        };
        get();
    }, [flights]);
};

export default GetBookedSeats;
