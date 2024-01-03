// useFetchData.js
import { useState, useEffect } from "react";
import { fetchByType } from "../FetchingApis/fetching";

const useFetchData = (type) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchByType(type);
        setData(result.map((item) => ({
          key: item._id,
          url: item.thumbnail || "",
          name: item.title || "",
          audio: item.audio_url || "",
          description: (item.artist && item.artist[0] && item.artist[0].description) || "",
          artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
          mood: item.mood || "",
          songId: item._id || "",
          album: "no",
        })));
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${type} songs`, error);
      }
    };

    fetchData();
  }, [type]);

  return { data, loading };
};

export default useFetchData;
