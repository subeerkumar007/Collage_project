"use client";
import { useState, useEffect } from "react";

type ReverseGeocodeItem = {
  latitude?: number;
  longitude?: number;
  label?: string;
  name?: string;
  locality?: string;
  city?: string;
  region?: string;
  country?: string;
};

export default function LocationDetector({ apiUrl }: { apiUrl?: string }) {
  const [location, setLocation] = useState<string>("Detecting location...");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if location is already stored
    const savedLocation = localStorage.getItem("deliveryLocation");
    if (savedLocation) {
      setLocation(savedLocation);
      setLoading(false);
      return;
    }

    // Request geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Prefer user-provided API (prop) -> env var -> fallback to Nominatim
            const customApi =
              apiUrl ||
              (process.env.NEXT_PUBLIC_REVERSE_GEOCODE_API as
                | string
                | undefined);

            if (customApi) {
              // Many APIs expect latitude & longitude query params; adapt the call
              const sep = customApi.includes("?") ? "&" : "?";
              const url = `${customApi}${sep}latitude=${latitude}&longitude=${longitude}`;
              const resp = await fetch(url);
              const body = await resp.json();

              // Support APIs that return { data: [ ... ] } or a single object
              const item: ReverseGeocodeItem | undefined = Array.isArray(
                body?.data
              )
                ? body.data[0]
                : body?.data || body;

              const label =
                item?.label ||
                item?.name ||
                item?.city ||
                item?.locality ||
                item?.region ||
                item?.country ||
                `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

              setLocation(label);
              localStorage.setItem("deliveryLocation", label);
              setLoading(false);
              return;
            }

            // Fallback: OpenStreetMap Nominatim
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.display_name ||
              "Your Location";
            setLocation(city);
            localStorage.setItem("deliveryLocation", city);
          } catch (error) {
            console.error("Reverse geocode error:", error);
            const fallback = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
            setLocation(fallback);
            localStorage.setItem("deliveryLocation", fallback);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Select location");
          setLoading(false);
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    } else {
      setLocation("Select location");
      setLoading(false);
    }
  }, [apiUrl]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    localStorage.setItem("deliveryLocation", newLocation);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 text-gray-700 hover:from-orange-100 hover:to-red-100 transition-all text-sm font-medium border border-orange-200"
      >
        <svg
          className="w-4 h-4 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="truncate max-w-xs">
          {loading ? "Detecting…" : location}
        </span>
      </button>

      {/* Location Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Delivery Location
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your delivery address or city for faster service.
            </p>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter city or address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("deliveryLocation", location);
                  setShowModal(false);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
