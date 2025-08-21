import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { userActions } from "../../userSlice";
import { toast } from "sonner";

export function LoginForm({ onSwitchToSignup }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );
            response = await response.json();
            if (!response.ok) {
                toast.error(response.message);
            }
            if (response.ok) {
                console.log("res", response);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                dispatch(userActions.login(response.data.user));
                navigate("/");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.email.trim() && formData.password.trim();

    return (
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900">
                    Welcome Back
                </CardTitle>
                <p className="text-slate-600 text-sm">
                    Sign in to your Airgorithm account
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="text-slate-700 text-sm font-medium"
                        >
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="pl-10 bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-slate-700 text-sm font-medium"
                        >
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="pl-10 pr-10 bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className="w-full mt-3 bg-slate-900 hover:bg-slate-800 text-white py-2.5 cursor-pointer"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="text-center text-sm flex justify-between">
                    <div className="text-center text-sm">
                        <span className="text-slate-600">
                            Don't have an account?{" "}
                        </span>
                        <button
                            onClick={onSwitchToSignup}
                            className="text-slate-900 hover:text-slate-700 font-medium cursor-pointer"
                        >
                            Sign up
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            window.location.href = `${
                                import.meta.env.VITE_ADMIN_PANEL_URL
                            }/login`;
                        }}
                        className="text-slate-900 hover:text-slate-700 font-medium cursor-pointer"
                    >
                        Admin Panel
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
