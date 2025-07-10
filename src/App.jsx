import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/sections/Login";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Journey from "./components/Journey/journey";

export default function ModernFlightBooking() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "features", "services", "testimonials"];
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
        <BrowserRouter>
            {/* Fixed Header on all routes */}
            <Header
                activeSection={activeSection}
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
                                    <Features />
                                    <Services />
                                    <Testimonials />
                                    <CTA scrollToBooking={scrollToBooking} />
                                </main>
                                <Footer />
                            </div>
                        }
                    />
                    <Route path="/journey" element={<Journey />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
