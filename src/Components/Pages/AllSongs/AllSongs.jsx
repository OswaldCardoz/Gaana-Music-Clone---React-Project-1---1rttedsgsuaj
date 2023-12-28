import { useEffect, useState, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import { BsPlayCircle} from "react-icons/bs";
import { useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import { fetchAllSongs } from '../../FetchingApis/fetching';
import action from "../../../action";

function AllSongs() {
  const dispatch = useDispatch();
  const [dataFromStore, setDataFromStore] = useState([]);
  const [renderCard, setRenderCard] = useState(false);
  useEffect(() => {
    const fetching = async () => {
    try {      
        const fetchAllSongData = await fetchAllSongs();
        
        const result = fetchAllSongData.map((item) => ({
          key: item._id,
          url: item.thumbnail || "",
          name: item.title || "",
          audio: item.audio_url || "",
          description:
            (item.artist && item.artist[0] && item.artist[0].description) || "",
          artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
          mood: item.mood || "",
          songId: item._id || "",
          album:"no",
        }));
        // setCurrentSong(result2);
        // setShowContent(true);
        dispatch(action.setAllSongsData(fetchAllSongData));
        setDataFromStore(result);
        setRenderCard(true);
      } catch (error) {
        console.log(error);
      }
    }

    fetching();

  }, []);

  const handleSongClicker = (data) => {
    dispatch(actions.setActiveSong(data));
  };


  return (
    <>
      {renderCard ? (
        <div className="new-songs-section">
          <div className="new-songs-container">
            <h2>All Songs</h2>
            <div className="song-container-level-1">
              {dataFromStore.map((item, index) => (
                <div
                  key={item._id || index}
                  className="music-card"
                  onClick={() => handleSongClicker(item)}
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

export default AllSongs;




