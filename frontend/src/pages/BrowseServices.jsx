import React, { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";

const services = [
  {
    id: 1,
    category: "Cleaning",
    title: "Professional House Cleaning",
    provider: "Sarah Johnson",
    description: "Deep cleaning service for your entire home",
    location: "Downtown",
    price: 80,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    category: "Maintenance",
    title: "Handyman Services",
    provider: "Mike Wilson",
    description: "General repairs and maintenance work",
    location: "Westside",
    price: 60,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    category: "Pet Care",
    title: "Dog Walking & Pet Care",
    provider: "Emily Chen",
    description: "Daily walks and pet sitting services",
    location: "Central Park Area",
    price: 25,
    rating: 5.0,
    reviews: 203,
  },
];

const categories = ["All", "Cleaning", "Maintenance", "Pet Care", "Fitness", "Education", "Gardening"];

const BrowseServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Browse Services</h1>
          <p className="text-muted-foreground">
            Find trusted local service providers in your area
          </p>
        </div>

        {/* Search + Categories */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search bar */}
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search services or providers..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full border text-sm transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredServices.length} services found
        </p>

        {/* Service Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-card border border-border rounded-lg shadow-sm card-hover p-5 flex flex-col justify-between"
            >
              {/* Placeholder image */}
              <div className="h-40 bg-muted flex items-center justify-center rounded-md mb-4">
                <span className="text-muted-foreground">No Image</span>
              </div>

              {/* Service Info */}
              <div className="flex-1">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {service.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  by {service.provider}
                </p>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {service.location}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">
                  ${service.price}
                </span>
                <button className="cosmic-button px-4 py-2">Book Now</button>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                {service.rating} ({service.reviews})
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseServices;
