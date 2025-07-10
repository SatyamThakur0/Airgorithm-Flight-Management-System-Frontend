import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { MapPin, Calendar, Users, Zap, Plane, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function BookingForm() {
    const [fromAirportId, setFromAirportId] = useState("");
    const [toAirportId, setToAirportId] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [date, setDate] = useState("");
    const [fromInput, setFromInput] = useState("");
    const [toInput, setToInput] = useState("");
    const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
    const [toDropdownOpen, setToDropdownOpen] = useState(false);
    const [filteredFromCities, setFilteredFromCities] = useState([]);
    const [filteredToCities, setFilteredToCities] = useState([]);
    const navigate = useNavigate();

    const URL = import.meta.env.VITE_FLIGHT_SERVICE_URL;

    useEffect(() => {
        const getMathingAirports = async () => {
            try {
                let res = await fetch(
                    `${URL}/flight/airport/city/search/${fromInput}`
                );
                res = await res.json();
                setFilteredFromCities(res.data);
            } catch (error) {}
        };
        fromInput && setTimeout(getMathingAirports, 300);
    }, [fromInput]);

    useEffect(() => {
        const getMathingAirports = async () => {
            try {
                let res = await fetch(
                    `${URL}/flight/airport/city/search/${toInput}`
                );
                res = await res.json();
                setFilteredToCities(res.data);
            } catch (error) {}
        };
        toInput && setTimeout(getMathingAirports, 300);
    }, [toInput]);

    const fetchJourneys = async (e) => {
        e.preventDefault();
        try {
            setIsSearching(true);
            let res = await fetch(
                `${URL}/flight/flight/search?source=${fromAirportId}&destination=${toAirportId}&date=${date}`
            );
            res = await res.json();
            if (res.ok) {
                setIsSearching(false);
                navigate("./journey", {
                    state: res.data,
                });
            }

            console.log(res);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsSearching(false);
        }
    };

    const handleFromAirportChange = (value) => {
        setFromAirportId(value);
        setFromInput(value);
        if (value.length > 0) {
            setFromDropdownOpen(true);
        } else {
            setFromDropdownOpen(false);
        }
    };

    const handleToAirportChange = (value) => {
        setToAirportId(value);
        setToInput(value);
        if (value.length > 0) {
            setToDropdownOpen(true);
        } else {
            setToDropdownOpen(false);
        }
    };

    const selectFromAirport = (airport) => {
        setFromAirportId(airport.id);
        setFromInput(`${airport?.city.name} (${airport?.code})`);
        setFromDropdownOpen(false);
    };

    const selectToAirport = (airport) => {
        setToAirportId(airport.id);
        setToInput(`${airport?.city.name} (${airport?.code})`);
        setToDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;
            if (!target.closest(".city-dropdown-container")) {
                setFromDropdownOpen(false);
                setToDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <form onSubmit={fetchJourneys} id="booking-form" className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur opacity-20" />
            <Card className="relative p-6 sm:p-8 glass-card rounded-3xl shadow-2xl">
                <CardContent className="p-0">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-center">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Book Your Flight
                            </h3>
                            <p className="text-gray-500">
                                AI finds the best deals in seconds
                            </p>
                        </div>

                        <div className="space-y-4 sm:space-y-6 city-dropdown-container">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        From
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-800 z-10" />
                                        <Input
                                            placeholder="New York"
                                            value={fromInput}
                                            onChange={(e) =>
                                                handleFromAirportChange(
                                                    e.target.value
                                                )
                                            }
                                            onFocus={() =>
                                                fromInput?.length > 0 &&
                                                setFromDropdownOpen(true)
                                            }
                                            className="pl-12 h-12 sm:h-14 glass border-white/20 text-gray-900 placeholder:text-gray-500 rounded-2xl focus:border-gray-400 focus:ring-gray-300"
                                        />
                                        {fromDropdownOpen &&
                                            filteredFromCities?.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 mt-1 glass-card rounded-2xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                                                    {filteredFromCities?.map(
                                                        (airport, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() =>
                                                                    selectFromAirport(
                                                                        airport
                                                                    )
                                                                }
                                                                className="w-full bg-white hover:bg-[#e3e3e3] px-4 py-3 text-left text-gray-900 transition-colors first:rounded-t-2xl last:rounded-b-2xl flex items-center space-x-3"
                                                            >
                                                                <Plane className="w-4 h-4 text-gray-500" />
                                                                <span>
                                                                    {
                                                                        airport
                                                                            .city
                                                                            .name
                                                                    }
                                                                    (
                                                                    {
                                                                        airport.code
                                                                    }
                                                                    )
                                                                </span>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        To
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-800 z-10" />
                                        <Input
                                            placeholder="Tokyo"
                                            value={toInput}
                                            onChange={(e) =>
                                                handleToAirportChange(
                                                    e.target.value
                                                )
                                            }
                                            onFocus={() =>
                                                toInput.length > 0 &&
                                                setToDropdownOpen(true)
                                            }
                                            className="pl-12 h-12 sm:h-14 glass border-white/20 text-gray-900 placeholder:text-gray-500 rounded-2xl focus:border-gray-400 focus:ring-gray-300"
                                        />
                                        {toDropdownOpen &&
                                            filteredToCities.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 mt-1 glass-card rounded-2xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                                                    {filteredToCities?.map(
                                                        (airport, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() =>
                                                                    selectToAirport(
                                                                        airport
                                                                    )
                                                                }
                                                                className="w-full px-4 py-3 text-left text-gray-900 bg-white hover:bg-[#e3e3e3] transition-colors first:rounded-t-2xl last:rounded-b-2xl flex items-center space-x-3"
                                                            >
                                                                <Plane className="w-4 h-4 text-gray-500" />
                                                                <span>
                                                                    {
                                                                        airport
                                                                            .city
                                                                            .name
                                                                    }
                                                                    (
                                                                    {
                                                                        airport.code
                                                                    }
                                                                    )
                                                                </span>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Departure
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-800" />
                                        <Input
                                            onChange={(e) => {
                                                setDate(e.target.value);
                                            }}
                                            type="date"
                                            className="pl-12 h-12 sm:h-14 glass border-white/20 text-gray-900 rounded-2xl focus:border-gray-400 focus:ring-gray-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 bord er-2 border-red-500 mt-6">
                                    <div className="relative">
                                        {isSearching ? (
                                            <Button className="w-full h-12 sm:h-14 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-2xl shadow-gray-900/25 text-base sm:text-lg font-semibold rounded-2xl border-0">
                                                <Loader2 className="animate-spin scale-150" />
                                            </Button>
                                        ) : (
                                            <Button
                                                className={` w-full h-12 sm:h-14 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-2xl shadow-gray-900/25 text-base sm:text-lg font-semibold rounded-2xl border-0 dis abled:bg-gray-400 di sabled:text-gray-200 disab led:cursor-not-allowed`}
                                                disabled={
                                                    !fromInput ||
                                                    !toInput ||
                                                    !date
                                                }
                                            >
                                                <Zap className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                                                Search Flights
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
