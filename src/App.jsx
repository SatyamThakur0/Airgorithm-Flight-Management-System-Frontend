import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import Journey from "./components/Journey/journey";
import BookingPage from "./components/booking/BookingPage";
import AuthPage from "./components/auth/Auth";
import { BookingHistory } from "./components/myBookings/BookingHistory";

export default function ModernFlightBooking() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "features", "services", "my-bookings"];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToBooking = () => {
        const element = document.getElementById("booking-form");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Header
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                scrollToSection={scrollToSection}
            />
            <div className="pt-20">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="min-h-screen bg-transparent text-gray-900 overflow-hidden">
                                <AnimatedBackground />
                                <main>
                                    <Hero scrollToBooking={scrollToBooking} />
                                </main>
                            </div>
                        }
                    />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/journey" element={<Journey />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/my-bookings" element={<BookingHistory />} />
                </Routes>
            </div>
        </>
    );
}
