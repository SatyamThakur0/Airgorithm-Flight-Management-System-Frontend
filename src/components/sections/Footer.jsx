import { Plane, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: ["Flight Search", "Price Alerts", "Mobile App", "API Access"],
    },
    {
      title: "Support",
      links: ["Help Center", "Live Chat", "Travel Guide", "Contact Us"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Partners"],
    },
  ];

  const socialIcons = [Facebook, Twitter, Instagram, Linkedin];

  return (
    <footer className="relative py-12 sm:py-16 lg:py-20 border-t border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg sm:rounded-xl blur opacity-30" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                AeroLux
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Revolutionizing travel with AI-powered flight booking and premium customer experiences.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((Icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 sm:w-10 sm:h-10 glass rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer border border-white/20"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-gray-900 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-bold mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 mt-12 sm:mt-16 pt-6 sm:pt-8 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            &copy; 2024 AeroLux. All rights reserved. Crafted with ❤️ for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
