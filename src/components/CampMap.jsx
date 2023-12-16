"use client";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { url } from "/config";
import MapPin from "./MapPin";
import PopUpContent from "./PopUpContent";
import Image from "next/image";

export default function Map({
  selectedCamp,
  setSelectedCamp,
  chooseSpot,
  totalTickets,
  className,
  mapHandleModal,
  reservationId,
}) {
  const [viewPort, setViewPort] = useState({
    latitude: 55.515097,
    longitude: 11.866122,
    bearing: -90,
    width: "100%",
    height: "100%",
    zoom: 7,
    minZoom: 6,
    maxZoom: 9,
  });

  const scenes = [
    { name: "Midgard", latitude: 55.571488, longitude: 11.677192 },
    { name: "Vanaheim", latitude: 55.295297, longitude: 11.773895 },
    { name: "Jotunheim", latitude: 55.90243, longitude: 11.958347 },
  ];

  const [dataCamps, setDataCamps] = useState(null);
  const [sceneMarker, setSceneMarker] = useState(scenes);
  const [selectedScene, setSelectedScene] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resCamps = await fetch(`${url}/available-spots`);
      const dataCamps = await resCamps.json();
      setDataCamps(dataCamps);
    };

    fetchData();
  }, []);

  return (
    <div className={className}>
      <ReactMapGl
        {...viewPort}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewPort(evt.viewPort)}
        mapStyle="mapbox://styles/jaco7643/clptpf0t101an01pj9z1r8nx3"
        attributionControl={false}
      >
        {dataCamps &&
          dataCamps.map((camp) => {
            return (
              <Marker
                key={camp.area}
                latitude={camp.marker[0]}
                longitude={camp.marker[1]}
              >
                <MapPin
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (reservationId) {
                      mapHandleModal();
                    } else {
                      setSelectedCamp(camp);
                    }

                    {
                      chooseSpot && chooseSpot(camp.area);
                    }
                    setSelectedScene(null);
                  }}
                  camp={camp}
                  campName={camp.area}
                  selectedCamp={selectedCamp}
                  totalTickets={totalTickets}
                />
              </Marker>
            );
          })}
        {selectedCamp ? (
          <Popup
            latitude={selectedCamp.marker[0]}
            longitude={selectedCamp.marker[1]}
            onClose={() => {
              setSelectedCamp(null);
            }}
          >
            <PopUpContent selectedCamp={selectedCamp} />
          </Popup>
        ) : null}
        {sceneMarker.map((scene) => {
          return (
            <Marker
              key={scene.latitude}
              latitude={scene.latitude}
              longitude={scene.longitude}
            >
              <Image
                src="/img/stageIcon.svg"
                width={25}
                height={25}
                alt="Logo Representing Stage"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedScene(scene);
                  setSelectedCamp(null);
                }}
              />
            </Marker>
          );
        })}
        {selectedScene ? (
          <Popup
            latitude={selectedScene.latitude}
            longitude={selectedScene.longitude}
            onClose={() => {
              setSelectedScene(null);
            }}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-">Stage:</h3>
              <h3 className="text-lg font-light">{selectedScene.name}</h3>
            </div>
          </Popup>
        ) : null}
      </ReactMapGl>
    </div>
  );
}
