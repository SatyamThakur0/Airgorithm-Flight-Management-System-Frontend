import { Zap, TrendingUp, Shield, Award, Plane, CheckCircle } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "AI Flight Discovery",
      description:
        "Machine learning algorithms analyze millions of routes to find hidden deals and optimal connections.",
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Corporate Travel Hub",
      description: "Enterprise-grade platform with advanced analytics, policy compliance, and expense automation.",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Smart Travel Insurance",
      description: "Dynamic coverage that adapts to your journey with instant claims and predictive risk assessment.",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Elite Rewards Program",
      description: "Advanced loyalty system with instant redemption and exclusive partner benefits.",
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass border border-white/30 mb-4 sm:mb-6">
            <CheckCircle className="w-4 h-4 text-gray-800" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Complete Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              End-to-End
            </span>
            <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Travel Ecosystem
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-4 sm:space-x-6 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-gray-900/25 group-hover:shadow-gray-900/40 transition-all text-white">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur-2xl opacity-20" />
            <div className="relative w-full h-80 sm:h-96 lg:h-[500px] glass-card rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl shadow-gray-900/30">
                  <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Ready for Takeoff?
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">Your next adventure awaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
