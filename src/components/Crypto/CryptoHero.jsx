import React, { useState } from "react";
import {
  TrendingUp,
  Search,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";

const CryptoHero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-50">
              Trusted by 50M+ traders worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white">The Future of</span>
            <span className="block text-white">Crypto Trading</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Trade Bitcoin, Ethereum, and 500+ cryptocurrencies with zero fees.
            Advanced charts, real-time data, and institutional-grade security.
          </p>

          {/* Search Bar */}

          {/* CTA Buttons */}

          {/* Trust Indicators */}
        </div>
      </div>

      {/* Bottom Section */}
    </div>
  );
};

export default CryptoHero;
