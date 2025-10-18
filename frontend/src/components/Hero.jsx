import React from "react";
import { Search, MapPin, Star } from "lucide-react";
import heroImage from "../assets/market_place.jpg";
// 
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Find trusted
                <span className="text-glow bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  local services{" "}
                </span>
                in your area
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Connect with verified service providers in your community. From
                home repairs to tutoring, find quality services with transparent
                pricing.
              </p>
            </div>

            {/* Search Bar */}
            <div className="gradient-border rounded-2xl p-6 shadow-md card-hover bg-card text-left">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="w-full pl-12 h-14 text-lg rounded-md border border-border bg-background"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-12 h-14 text-lg rounded-md border border-border bg-background"
                  />
                </div>
                <button className="cosmic-button w-full">Find Services</button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-foreground/70">
                  Service Providers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-foreground/70">Jobs Completed</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                  4.9 <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-sm text-foreground/70">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Local service providers"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-card rounded-xl p-4 shadow-md border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-r from-primary to-purple-400">
                $
              </div>
              <div>
                <div className="font-semibold text-sm">Fixed Pricing</div>
                <div className="text-xs text-foreground/70">No surprises</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-md border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-r from-green-400 to-green-600">
                ✓
              </div>
              <div>
                <div className="font-semibold text-sm">Verified Providers</div>
                <div className="text-xs text-foreground/70">
                  Background checked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
