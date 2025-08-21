import { useLocation, useNavigate } from "react-router";
import { LinearBookingPage } from "./LinearBookingPage";

export default function BookingPage() {
    const location = useLocation();
    const flights = location.state;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        Complete Your Booking
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600">
                        Add passenger details and select seats for your journey
                    </p>
                </div>
                <LinearBookingPage flights={flights} />
            </div>
        </div>
    );
}
