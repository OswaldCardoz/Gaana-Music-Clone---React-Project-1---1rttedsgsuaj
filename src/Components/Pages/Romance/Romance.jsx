//done
import React, { useState, useEffect } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import { fetchByType } from "../../FetchingApis/fetching";

function Romance() {
  const dispatch = useDispatch();
  const [dataFromStore, setDataFromStore] = useState([]);
  const [renderCard, setRenderCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mood = await fetchByType("romantic");
        const result = mood.map((item) => ({
          key: item._id,
          url: item.thumbnail || "",
          name: item.title || "",
          audio: item.audio_url || "",
          description:
            (item.artist && item.artist[0] && item.artist[0].description) || "",
          artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
          mood: item.mood || "",
          songId: item._id || "",
          album: "no",
        }));
        setDataFromStore(result);
        setRenderCard(true);
      } catch (error) {
        console.error("Error fetching romantic songs", error);
      }
    };

    fetchData();
  }, []);

  const handleSongClick = (data) => {
    dispatch(actions.setActiveSong(data));
  };

  return (
    <>
      {renderCard ? (
        <div className="new-songs-section"style={{backgroundColor:"violet"}}>
          <div className="new-songs-container">
            <h2>Romantic Songs</h2>
            <div className="song-container-level-1">
              {dataFromStore.map((item, index) => (
                <div
                  key={item._id || index}
                  className="music-card"
                  onClick={() => handleSongClick(item)}
                >
                  <BsPlayCircle className="play-icon" />
                  <img className="songs-image" src={item.url} alt="img" />
                  <p className="song-details">
                    <span className="song-name">{item.name}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="divide-line"></div>
          </div>
        </div>
      ) : (
        <Loader size="lg" />
      )}
    </>
  );
}

export default Romance;
