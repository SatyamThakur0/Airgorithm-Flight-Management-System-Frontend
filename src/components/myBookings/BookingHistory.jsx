import { useEffect, useState } from "react";
import { JourneyCard } from "./JourneyCard";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function BookingHistory() {
    const [journeys, setJourneys] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(journeys);
    }, [journeys]);
    useEffect(() => {
        const getBookings = async () => {
            let res;
            try {
                res = await fetch(
                    `${
                        import.meta.env.VITE_GATEWAY_URL
                    }/booking/booking/booked/journeys`,
                    {
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
                setJourneys(res.data);
            } catch (error) {
                toast.error(res?.message);
            }
        };
        getBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="space-y-6 sm:space-y-8">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                                My Travel History
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                                All your journeys and flight details in one
                                place
                            </p>
                        </div>
                    </div>

                    {/* Journey List */}
                    <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
                        {journeys?.map((journey, idx) => (
                            <JourneyCard key={idx} journey={journey} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
