"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { FarmObject, CommunityClaim, MiningRight } from "@/data/platformData";

interface GaMawelaMapProps {
  farms: FarmObject[];
  claims: CommunityClaim[];
  miningRights: MiningRight[];
  selectedFarmId: string | null;
  onFarmSelect: (farmId: string | null) => void;
  visibleLayers: {
    farms: boolean;
    mining: boolean;
    claims: boolean;
  };
  onLayerToggle: (layer: "farms" | "mining" | "claims") => void;
}

export function GaMawelaMap({
  farms,
  claims,
  miningRights,
  selectedFarmId,
  onFarmSelect,
  visibleLayers,
  onLayerToggle,
}: GaMawelaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!mapContainer.current || map.current) return;

      try {
        const mapboxgl = await import("mapbox-gl");
        
        const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
        
        mapboxgl.accessToken = MAPBOX_TOKEN || "pk.eyJ1IjoibWFrZXJtYXAiLCJhIjoiY2x0MGI0MHJwMDIweTJrcW5sMjZ0d2RrMiJ9.dummy_token";

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: MAPBOX_TOKEN 
            ? "mapbox://styles/mapbox/satellite-streets-v12"
            : {
                version: 8,
                sources: {
                  satellite: {
                    type: "raster",
                    tiles: [
                      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    ],
                    tileSize: 256,
                    attribution: "© Esri"
                  }
                },
                layers: [
                  {
                    id: "satellite",
                    type: "raster",
                    source: "satellite",
                  }
                ]
              },
          center: [28.735, -24.18],
          zoom: 12,
          minZoom: 10,
          maxZoom: 18,
          pitch: 0,
          bearing: 0,
          antialias: true,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.current.on("load", () => {
          setMapLoaded(true);
          setupMapLayers();
        });

        map.current.on("error", (e: any) => {
          console.error("Map error:", e);
          setError("Failed to load map");
        });

        map.current.on("click", (e: any) => {
          if (!mapLoaded) return;
          handleMapClick(e);
        });

      } catch (err) {
        console.error("Map initialization error:", err);
        setError("Map initialization failed. Using simplified view.");
      }
    };

    loadMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const setupMapLayers = useCallback(() => {
    if (!map.current || !mapLoaded) return;

    // Farms layer
    try {
      if (map.current.getSource("farms")) {
        map.current.removeLayer("farms");
        map.current.removeSource("farms");
      }

      const farmFeatures = farms.map((farm, index) => ({
        type: "Feature",
        geometry: farm.boundary_geojson.geometry,
        properties: {
          id: farm.id,
          name: farm.name,
          code: farm.code,
          status: farm.community_status,
          type: "farm",
          index: index,
        },
      }));

      map.current.addSource("farms", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: farmFeatures,
        },
      });

      map.current.addLayer({
        id: "farms",
        type: "fill",
        source: "farms",
        paint: {
          "fill-color": [
            "match",
            ["get", "status"],
            "Confirmed", "rgba(201, 166, 70, 0.3)",
            "Disputed", "rgba(245, 158, 11, 0.3)",
            "Overlapped", "rgba(239, 68, 68, 0.3)",
            "rgba(201, 166, 70, 0.3)"
          ],
          "fill-outline-color": [
            "match",
            ["get", "status"],
            "Confirmed", "#c9a646",
            "Disputed", "#f59e0b",
            "Overlapped", "#ef4444",
            "#c9a646"
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.7,
            0.5
          ],
        },
        layout: {
          visibility: visibleLayers.farms ? "visible" : "none",
        },
      });

      map.current.addLayer({
        id: "farms-outline",
        type: "line",
        source: "farms",
        paint: {
          "line-color": [
            "match",
            ["get", "status"],
            "Confirmed", "#c9a646",
            "Disputed", "#f59e0b",
            "Overlapped", "#ef4444",
            "#c9a646"
          ],
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            3,
            2
          ],
          "line-opacity": 0.8,
        },
        layout: {
          visibility: visibleLayers.farms ? "visible" : "none",
        },
      });

      // Mining rights layer
      const miningFeatures = miningRights.map((mr) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: mr.coordinates[0] || [28.735, -24.18],
        },
        properties: {
          id: mr.id,
          company: mr.company,
          type: mr.type,
          commodity: mr.commodity,
        },
      }));

      if (map.current.getSource("mining")) {
        map.current.removeLayer("mining");
        map.current.removeSource("mining");
      }

      map.current.addSource("mining", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: miningFeatures,
        },
      });

      map.current.addLayer({
        id: "mining-points",
        type: "circle",
        source: "mining",
        paint: {
          "circle-radius": 8,
          "circle-color": [
            "match",
            ["get", "company"],
            "Glencore", "#078037",
            "Anglo American Platinum", "#0066b3",
            "#6b7280"
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
          "circle-opacity": visibleLayers.mining ? 0.8 : 0,
        },
        layout: {
          visibility: visibleLayers.mining ? "visible" : "none",
        },
      });

      // Claims layer
      const claimFeatures = claims.map((claim) => {
        const farm = farms.find((f) => f.id === claim.farmId);
        if (!farm?.boundary_geojson) return null;
        return {
          type: "Feature",
          geometry: farm.boundary_geojson.geometry,
          properties: {
            ...claim,
            type: "claim",
          },
        };
      }).filter(Boolean);

      if (map.current.getSource("claims")) {
        map.current.removeLayer("claims");
        map.current.removeSource("claims");
      }

      map.current.addSource("claims", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: claimFeatures,
        },
      });

      map.current.addLayer({
        id: "claims",
        type: "line",
        source: "claims",
        paint: {
          "line-color": "#c9a646",
          "line-width": 3,
          "line-dasharray": [4, 3],
          "line-opacity": visibleLayers.claims ? 0.8 : 0,
        },
        layout: {
          visibility: visibleLayers.claims ? "visible" : "none",
        },
      });

      // Hover effects
      let hoveredStateId: string | null = null;

      map.current.on("mouseenter", "farms", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "farms", () => {
        map.current.getCanvas().style.cursor = "";
        if (hoveredStateId !== null) {
          map.current.setFeatureState(
            { source: "farms", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      map.current.on("mousemove", "farms", (e: any) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: "farms", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
            { source: "farms", id: hoveredStateId },
            { hover: true }
          );
        }
      });

    } catch (err) {
      console.error("Error setting up map layers:", err);
    }
  }, [farms, claims, miningRights, mapLoaded, visibleLayers]);

  const handleMapClick = useCallback((e: any) => {
    if (!map.current) return;

    const features = map.current.queryRenderedFeatures(e.point, {
      layers: ["farms"],
    });

    if (features.length > 0) {
      const farmId = features[0].properties.id;
      onFarmSelect(farmId);
    }
  }, [onFarmSelect]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const layers = ["farms", "farms-outline", "mining-points", "claims"];
    layers.forEach((layerId) => {
      if (map.current.getLayer(layerId)) {
        const isVisible = 
          (layerId.includes("mining") && visibleLayers.mining) ||
          (layerId.includes("claim") && visibleLayers.claims) ||
          ((layerId.includes("farm") && !layerId.includes("outline")) && visibleLayers.farms) ||
          (layerId.includes("outline") && visibleLayers.farms);
        
        map.current.setLayoutProperty(
          layerId,
          "visibility",
          isVisible ? "visible" : "none"
        );
      }
    });
  }, [visibleLayers, mapLoaded]);

  useEffect(() => {
    setupMapLayers();
  }, [setupMapLayers]);

  if (error) {
    return (
      <div className="gm-map-container">
        <div className="flex h-full flex-col items-center justify-center bg-[#121212]">
          <p className="text-[var(--gm-muted)]">{error}</p>
          <p className="text-sm text-[var(--gm-foreground)]">Using static farm register view</p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="gm-map-container" />;
}