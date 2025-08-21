import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Chrome, Phone } from "lucide-react";
import { useDispatch } from "react-redux";
import { userActions } from "../../userSlice";
import { useNavigate } from "react-router";

export function SignupForm({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        setIsLoading(true);

        try {
            let response = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password,
                    }),
                }
            );
            response = await response.json();
            if (!response.ok) {
                toast.error(res.message);
            }
            if (response.ok) {
                console.log(response);
                localStorage.setItem("user", JSON.stringify(response.data));
                dispatch(userActions.login(response.user));
                navigate("/");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid =
        formData.fullName.trim() &&
        formData.email.trim() &&
        formData.password.trim() &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword;

    return (
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900">
                    Create Account
                </CardTitle>
                <p className="text-slate-600 text-sm">
                    Join Airgorithm and start your journey
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-2">
                            <Label
                                htmlFor="firstName"
                                className="text-slate-700 text-sm font-medium"
                            >
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value,
                                        })
                                    }
                                    className="pl-10 bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>
                    </div>

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
                            htmlFor="phone"
                            className="text-slate-700 text-sm font-medium"
                        >
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                className="pl-10 bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                                placeholder="+1 (555) 123-4567"
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
                                placeholder="Create a strong password"
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

                    <div className="space-y-2">
                        <Label
                            htmlFor="confirmPassword"
                            className="text-slate-700 text-sm font-medium"
                        >
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="pl-10 pr-10 bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                                placeholder="Confirm your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {formData.confirmPassword &&
                            formData.password !== formData.confirmPassword && (
                                <p className="text-red-600 text-xs">
                                    Passwords don't match
                                </p>
                            )}
                    </div>

                    

                    <Button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 cursor-pointer"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-slate-600">
                        Already have an account?{" "}
                    </span>
                    <button
                        onClick={onSwitchToLogin}
                        className="text-slate-900 hover:text-slate-700 font-medium cursor-pointer"
                    >
                        Sign in
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
