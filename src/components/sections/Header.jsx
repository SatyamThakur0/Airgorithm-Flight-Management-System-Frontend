import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plane, Menu, X, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../userSlice";
import { toast } from "sonner";

export default function Header({
    activeSection,
    setActiveSection,
    scrollToSection,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, []);

    const logout = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(
                `${import.meta.env.VITE_AUTH_URL}/auth/logout`,
                {
                    credentials: "include",
                }
            );
            if (response.status == 401) {
                localStorage.removeItem("user");
                window.location.href = "/auth";
                toast.error("Session expired, Login again.");
            }
            response = await response.json();
            if (!response.ok) {
                toast.error(res.message);
            }
            if (response.ok) {
                localStorage.removeItem("user");
                dispatch(userActions.logout());
                navigate("/auth");
                setIsLoading(false);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const navigationItems = [
        { id: "/", label: "Home" },
        { id: "/my-bookings", label: "My Bookings" },
    ];

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        if (sectionId === "/") {
            navigate("/");
            scrollToSection(sectionId);
        } else if (sectionId === "/my-bookings") {
            navigate("/my-bookings");
        }
        if (sectionId === "/home") {
            navigate("/");
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-white/30 border-b border-white/30 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-gray-900/25">
                                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                        </div>
                        <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                            Airgorithm
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`relative text-sm font-medium transition-all cursor-pointer duration-300 hover:text-gray-900 ${
                                    activeSection === item.id
                                        ? "text-gray-900"
                                        : "text-gray-600"
                                }`}
                            >
                                {item.label}
                                {location.pathname === item.id && (
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    {isAuthenticated && (
                        <div className="bor der bord er-amber-800 flex items-center gap-2">
                            <div className="font-semibold">
                                {user?.name || "User"}
                            </div>
                            <div
                                onClick={() => {
                                    logout();
                                }}
                                className="hidden md:flex items-center space-x-4"
                            >
                                {!isLoading ? (
                                    <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg shadow-gray-900/25 border-0 font-semibold">
                                        Logout
                                    </Button>
                                ) : (
                                    <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg shadow-gray-900/25 border-0 font-semibold">
                                        <Loader2 className="animate-spin" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-xl glass border border-white/20"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-800" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-6 glass-card rounded-2xl mt-4 border border-white/20">
                        <nav className="flex flex-col space-y-4 px-6">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                                {/* <Button
                                    variant="ghost"
                                    className="justify-start text-gray-600 hover:text-gray-900 hover:bg-black/5"
                                >
                                    Logout
                                </Button> */}
                                <Button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-900/25 font-semibold">
                                    Logout
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
