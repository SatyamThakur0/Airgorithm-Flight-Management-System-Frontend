import { Card, CardContent } from "../ui/card";
import { Plane, Clock, CheckCircle, XCircle } from "lucide-react";

export function BookingStats({ total, upcoming, completed, cancelled }) {
    const stats = [
        {
            label: "Total Bookings",
            value: total,
            icon: Plane,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            label: "Upcoming",
            value: upcoming,
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
        {
            label: "Completed",
            value: completed,
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            label: "Cancelled",
            value: cancelled,
            icon: XCircle,
            color: "text-red-600",
            bgColor: "bg-red-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="border border-gray-200">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div
                                className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}
                            >
                                <stat.icon
                                    className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`}
                                />
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                    {stat.value}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
