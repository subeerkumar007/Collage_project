"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export interface OrderMapProps {
  pickup?: { lng: number; lat: number };
  drop?: { lng: number; lat: number };
  livePosition?: { lng: number; lat: number } | null;
}

export default function OrderMap({ pickup, drop, livePosition }: OrderMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!mapboxgl.accessToken) {
      // No token - show placeholder
      mapContainer.current.innerHTML = "Mapbox token not configured";
      return;
    }

    const initial = livePosition || pickup || { lng: 77.209, lat: 28.6139 };
    const startCenter: [number, number] = [initial.lng, initial.lat];

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: startCenter, // Default: New Delhi as example
      zoom: 12,
    });

    // Add marker for delivery agent
    markerRef.current = new mapboxgl.Marker({ color: "#FF8C00" })
      .setLngLat(startCenter)
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, [pickup, livePosition]);

  // React to live position updates from Socket.IO
  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !livePosition) return;
    const next: [number, number] = [livePosition.lng, livePosition.lat];
    markerRef.current.setLngLat(next);
    mapRef.current.easeTo({ center: next, duration: 800 });
  }, [livePosition]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
