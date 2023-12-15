"use client";

import { useEffect, useState } from "react";
import { url } from "/config";

function SpotifyPlayer({ band }) {
  const [bands, setBands] = useState([]);
  const [spotifyId, setSpotifyId] = useState("");

  useEffect(() => {
    const fetchBands = async () => {
      const response = await fetch(`${url}/bands`);
      const data = await response.json();
      setBands(data);
    };

    fetchBands();
  }, []);

  useEffect(() => {
    const getSpotifyId = () => {
      const bandMatch = bands.find((newBand) => newBand.slug === band.slug);
      if (bandMatch) {
        setSpotifyId(bandMatch.id);
      }
    };

    if (bands.length > 0) {
      getSpotifyId();
    }
  }, [bands, band]);

  if (!band.id) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 mt-6 md:mt-12 flex items-center justify-center min-h-[352px]">
      {spotifyId ? (
        <iframe
          src={`https://open.spotify.com/embed/artist/${spotifyId}?utm_source=generator`}
          width="100%"
          height="352"
          loading="lazy"
        ></iframe>
      ) : (
        <p className="text-gray-400 text-sm">Spotify Player Loading...</p>
      )}
    </div>
  );
}

export default SpotifyPlayer;
