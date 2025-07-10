import { Button } from "../ui/button";
import {
    ArrowRight,
    PlayCircle,
    Users,
    Globe,
    TrendingUp,
    Zap,
} from "lucide-react";
import BookingForm from "../forms/Booking_Form";

export default function Hero({ scrollToBooking }) {
    const stats = [
        {
            value: "2M+",
            label: "Happy Travelers",
            icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
        },
        {
            value: "180+",
            label: "Countries",
            icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
        },
        {
            value: "99.9%",
            label: "Uptime",
            icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
        },
    ];

    return (
        <section
            id="home"
            className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                        <div className="space-y-4 sm:space-y-6">
                            {/* <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass border border-white/30">
                <Zap className="w-4 h-4 text-gray-800" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">AI-Powered Flight Search</span>
              </div> */}

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                                <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Fly Beyond
                                </span>
                                <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                                    Expectations
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Experience the future of travel with our
                                revolutionary AI-powered platform. Discover
                                hidden deals, instant bookings, and seamless
                                journey management.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-2xl shadow-gray-900/25 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-0 font-semibold"
                                onClick={scrollToBooking}
                            >
                                Start Your Journey
                                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 relative">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="flex items-center justify-center mb-2 text-gray-800 group-hover:text-gray-600 transition-colors">
                                        {stat.icon}
                                    </div>
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                            {/* Blurred gradient shape below stats */}
                            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-4 w-96 h-24 bg-gradient-to-r from-yellow-200/70 to-orange-200/70 rounded-full blur-2xl z-0" />
                        </div>
                    </div>

                    <div className="lg:pl-8 mt-8 lg:mt-0 relative">
                        <BookingForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
