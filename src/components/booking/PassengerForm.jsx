"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Minus, User } from "lucide-react";

export function PassengerForm({ passengers, onPassengersChange }) {
    const addPassenger = () => {
        const newPassenger = {
            id: Date.now().toString(),
            name: "",
            email: "",
            age: "",
        };
        onPassengersChange([...passengers, newPassenger]);
    };

    const removePassenger = (id) => {
        onPassengersChange(passengers.filter((p) => p.id !== id));
    };

    const updatePassenger = (id, field, value) => {
        onPassengersChange(
            passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    const isFormValid =
        passengers.length > 0 &&
        passengers.every(
            (p) => p.name.trim() && p.email.trim() && p.age.trim()
        );

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Passenger Details
                </h1>
                <p className="text-slate-600">
                    Add passenger information for your booking
                </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-slate-900 flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Passengers ({passengers.length})
                        </CardTitle>
                        <div className="flex space-x-2">
                            <Button
                                onClick={addPassenger}
                                size="sm"
                                className="bg-slate-900 hover:bg-slate-800 text-white"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </Button>
                            {passengers.length > 1 && (
                                <Button
                                    onClick={() =>
                                        removePassenger(
                                            passengers[passengers.length - 1].id
                                        )
                                    }
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                    <Minus className="w-4 h-4 mr-1" />
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {passengers.map((passenger, index) => (
                        <div
                            key={passenger.id}
                            className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/50"
                        >
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                Passenger {index + 1}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label
                                        htmlFor={`name-${passenger.id}`}
                                        className="text-slate-700"
                                    >
                                        Full Name *
                                    </Label>
                                    <Input
                                        id={`name-${passenger.id}`}
                                        value={passenger.name}
                                        onChange={(e) =>
                                            updatePassenger(
                                                passenger.id,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="bg-white border-slate-300 text-slate-900"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={`email-${passenger.id}`}
                                        className="text-slate-700"
                                    >
                                        Email *
                                    </Label>
                                    <Input
                                        id={`email-${passenger.id}`}
                                        type="email"
                                        value={passenger.email}
                                        onChange={(e) =>
                                            updatePassenger(
                                                passenger.id,
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="bg-white border-slate-300 text-slate-900"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={`age-${passenger.id}`}
                                        className="text-slate-700"
                                    >
                                        Age *
                                    </Label>
                                    <Input
                                        type={Number}
                                        id={`age-${passenger.id}`}
                                        value={passenger.age}
                                        onChange={(e) =>
                                            updatePassenger(
                                                passenger.id,
                                                "age",
                                                e.target.value
                                            )
                                        }
                                        className="bg-white border-slate-300 text-slate-900"
                                        placeholder="25"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
