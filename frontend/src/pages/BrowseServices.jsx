import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin, Star } from "lucide-react";

const categories = ["All", "Cleaning", "Maintenance", "Pet Care", "Electrical", "Mechanic", "Tutoring"];

const BrowseServices = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/service/get"); // adjust port if needed
        if (res.data.success) {
          setServices(res.data.services);
        } else {
          setError("Failed to fetch services");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // ✅ Filter by category
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

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

        {/* Loading / Error / Count */}
        {loading && <p className="text-muted-foreground">Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filteredServices.length} services found
            </p>

            {/* Service Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-card border border-border rounded-lg shadow-sm card-hover p-5 flex flex-col justify-between"
                >
                  {/* Service Image */}
                  <div className="h-40 bg-muted flex items-center justify-center rounded-md mb-4 overflow-hidden">
                    {service.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${service.image}`}
                        alt={service.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-muted-foreground">No Image</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {service.provider?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
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
                    {service.averageRating || 0}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BrowseServices;
