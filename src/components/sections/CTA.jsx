import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA({ scrollToBooking }) {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Your Journey
            </span>
            <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Starts Now
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
            Join millions of travelers who've discovered the future of flight booking. Experience the difference that
            AI-powered travel technology makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-2xl shadow-gray-900/25 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-2xl border-0 font-semibold"
              onClick={scrollToBooking}
            >
              Start Exploring
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-800 hover:bg-black/5 glass text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-2xl bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
