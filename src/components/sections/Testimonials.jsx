import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Nomad",
      content:
        "AeroLux's AI found me flights 40% cheaper than other platforms. The interface is absolutely stunning and the booking process is seamless.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "Business Executive",
      content:
        "The corporate dashboard is a game-changer. Real-time expense tracking and policy compliance made our travel management effortless.",
      rating: 5,
      avatar: "MR",
    },
    {
      name: "Emma Thompson",
      role: "Travel Blogger",
      content:
        "I've used every booking platform out there. AeroLux's predictive pricing and instant rebooking saved me thousands on my world tour.",
      rating: 5,
      avatar: "ET",
    },
  ];

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass border border-white/30 mb-4 sm:mb-6">
            <Star className="w-4 h-4 text-gray-800" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Customer Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Travelers
            </span>
            <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Love Us
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <Card className="relative p-6 sm:p-8 glass-card rounded-3xl hover:border-white/30 transition-all duration-500">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4 sm:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
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
