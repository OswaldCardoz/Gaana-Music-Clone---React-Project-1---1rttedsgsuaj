//done
import React, { useState, useEffect } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import { fetchByType } from "../../FetchingApis/fetching";

const Sad = () => {
  const [dataFromStore, setDataFromStore] = useState([]);
  const [renderCard, setRenderCard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const mood = await fetchByType("sad");
      const result = mood.map((item) => ({
        key: item._id,
        url: item.thumbnail || "",
        name: item.title || "",
        audio: item.audio_url || "",
        description: (item.artist && item.artist[0] && item.artist[0].description) || "",
        artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
        mood: item.mood || "",
        songId: item._id || "",
        album: "no",
      }));
      setDataFromStore(result);
      setRenderCard(true);
    };

    fetchData();
  }, []);

  const handleSongClicker = (data) => {
    dispatch(actions.setActiveSong(data));
  };
  return (
    <div className="new-songs-section" style={{backgroundColor:"brown"}}>
      <div className="new-songs-container">
        <h2>Sad Songs</h2>

        {renderCard ? (
          <div className="song-container-level-1">
            {dataFromStore.map((item, index) => (
              <div key={item._id || index} className="music-card" onClick={() => handleSongClicker(item)}>
                <BsPlayCircle className="play-icon" />
                <img className="songs-image" src={item.url} alt="img" />
                <p className="song-details">
                  <span className="song-name">{item.name}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Loader size="lg" />
        )}

        <div className="divide-line"></div>
      </div>
    </div>
  );
};

export default Sad;

