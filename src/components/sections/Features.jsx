import { Card, CardContent } from "../ui/card";
import {
  Shield,
  Zap,
  Globe,
  Star,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Military-Grade Security",
      description:
        "Your data is protected with quantum encryption and zero-trust architecture.",
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Lightning Fast Search",
      description:
        "AI-powered search delivers results in milliseconds across millions of flights.",
    },
    {
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Global Network",
      description:
        "Access to 2000+ airlines and exclusive deals in 180+ countries worldwide.",
    },
    {
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "VIP Concierge",
      description:
        "24/7 premium support with dedicated travel experts and instant assistance.",
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Real-Time Intelligence",
      description:
        "Live updates, predictive delays, and smart rebooking powered by AI.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Price Prediction",
      description:
        "Advanced algorithms predict price changes and recommend optimal booking times.",
    },
  ];

  return (
    <section id="features" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass border border-white/30 mb-4 sm:mb-6">
            <Award className="w-4 h-4 text-gray-800" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Premium Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Next-Gen Travel
            </span>
            <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Technology
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Powered by advanced AI and machine learning, we're redefining how you
            discover, book, and experience travel.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <Card className="relative p-6 sm:p-8 glass-card rounded-3xl hover:border-white/30 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-2xl shadow-gray-900/25">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
