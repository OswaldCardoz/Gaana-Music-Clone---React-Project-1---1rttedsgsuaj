import { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import "react-multi-carousel/lib/styles.css";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  BsPlayCircle
} from "react-icons/bs";

function ArtistPage2() {
  const [showContent, setShowContent] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth < 960);
  const [scrolling, setScrolling] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2,"0")}`;
  };

  const formatTime2 = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth < 960);
    };
    const handleScrolling = () => {
      if (window.scrollY >= 440) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScrolling);
    };
  }, [scrolling]);

  // console.log(albumId, albumName, " id checking");

  const artistDataFromStore = useSelector((state) => state.users.artistPage1);
  // console.log("artistDataFromStore", artistDataFromStore)

  function settingArtistSongs (artistDataFromStore) {

    if (artistDataFromStore.audio) {
      const updatedSongs = artistDataFromStore && artistDataFromStore.audio.map((item)=> ({          
          key: item._id,
          url: item.thumbnail || "",
          name: item.title || "",
          audio: item.audio_url || "",
          description:
            (item.artist && item.artist[0] && item.artist[0].description) || "",
          artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
          mood: "",
          songId: item._id || "",
          artistFiltered :"yes",
        }
      ))
      setCurrentSong(updatedSongs);
      setShowContent(true);
    } else if (artistDataFromStore.newSongs) {
      const updatedSongs = artistDataFromStore && artistDataFromStore.newSongs.map((item)=> ({          
        key: item._id,
        url: item.thumbnail || "",
        name: item.title || "",
        audio: item.audio_url || "",
        description:
          (item.artist && item.artist[0] && item.artist[0].description) || "",
        artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
        // songs:item.songs.length||"0",
        // __v:item.newSongs.length||"",
        // newSongs:newSongs,
        mood: "",
        songId: item._id || "",
        artistFiltered :"yes",
      }
    ))
    setCurrentSong(updatedSongs);
    setShowContent(true);
    }
  }


  useEffect(()=> {
    setTimeout(()=> {
      if (artistDataFromStore) {
        settingArtistSongs(artistDataFromStore);
      }
    }, 2000)
  }, [])



  const handleSongClicker = (data) => {
    dispatch(actions.setArtistPage2(currentSong));
    dispatch(actions.setActiveSong(data));
  };

  const currentSongArray = Object.keys(currentSong).map(
    (key) => currentSong[key]
  );

  return (
    <>
      {showContent ? (
        <div>
          <audio
            ref={audioRef}
            src={currentSong.length > 0 ? currentSong[0].audio : ""}
            onTimeUpdate={handleTimeUpdate}
            controls
            autoPlay
            muted
            className="audio-hide"
          />
          <div>
            <div className="musicCollections">
              <div className="traction-splitter">
                <div className="track-section">
                  <AiOutlinePlayCircle
                    onClick={() => handleSongClicker(currentSong[currentSongIndex])}
                    className="prime-poster-play poster-play-option"
                  />
                  <img
                    className="posterPrime"
                    src={currentSong[currentSongIndex].url}
                    alt="img"
                  />
                </div>
                <div className="button-details-splitter">
                 
                  <div className="songs-side-details">
                    <div className="song-line1">
                      <div className="song-name1">{currentSong[currentSongIndex].name}</div>
                      <div className="song-movie-name">
                        {/* {currentSong[currentSongIndex].name}  {" "} */}
                        <span>{artistDataFromStore.name}</span>
                      </div>
                    </div>
                    <p className="song-line2">{currentSong[currentSongIndex].description}</p>
                   {/* < p className="song-line2" style={{color:"white"}}>Tracks: {currentSong.__v}</p> */}
                    <div className="track-details-warp">
                      <div className="track-duration">
                        {formatTime2(duration)}
                        <div className="song-button">
                 {!screenSize &&   <button
                      onClick={() => handleSongClicker(currentSong[currentSongIndex])}
                      className="song-play-btn"
                      style={{ fontSize: "0.9em", padding: "5px 10px" }}
                    >
                      Play Song
                    </button>}
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!screenSize && scrolling ? (
              <div className="track-list-header">
                <img
                  className="track-list-header-img"
                  src={currentSong[currentSongIndex].url}
                  alt="img"
                />
                <div className="song-genere">
                  <p className="song-name">{currentSong[currentSongIndex].name} </p>
                </div>
                <button
                  onClick={() => handleSongClicker(currentSong[currentSongIndex])}
                  className="track-list-playing-option"
                >
                  Play All
                </button>
              </div>
            ) : (
              <div></div>
            )}
            <div className="trackList">
              {!screenSize && (
                <div className="trackList-container">
                  <table className="table-container">
                    <thead className="table-header">
                      <tr>
                        <th className="table-s-no"></th>
                        <th className="track-header">Track</th>
                        <th>Artists</th>
                        <th>Album</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody className="table-body-container">
                      {currentSongArray.map((tracks, index) => (
                        <tr
                          key={tracks._id || index}
                          onClick={() => {handleSongClicker(currentSong[index]); setCurrentSongIndex(index) }}
                        >
                          <td className="table-col-1">{index + 1}</td>
                          <td className="table-col-2">
                            <div className="track-img-play">
                              <BsPlayCircle className="play-track-icon" />
                              <img
                                src={tracks.url}
                                alt="tracker-img"
                                className="tracker-image"
                              />
                            </div>
                            <div className="track-name-premium">
                              <p className="song-name"> {tracks.name} </p>
                            </div>
                          </td>
                          <td className="table-col-3">
                            <p className="singer-name"> {artistDataFromStore.name} </p>
                          </td>
                          <td className="table-col-4">
                            <p className="track-movie-name">{tracks.name}</p>
                          </td>
                          <td className="table-col-5">
                            <p className="track-duration">
                              {formatTime(duration)}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {screenSize && (
                <div className="table-mobile-container">
                  <table>
                    <tbody>
                      {currentSong.map((item, index) => (
                        <tr
                          key={item._id || index}
                          className="table-tr-mob"
                          onClick={() => {handleSongClicker(currentSong[index]); setCurrentSongIndex(index) }}
                        >
                          <td className="table-td-1">{index + 1}</td>
                          <td className="table-td-2">
                            <div className="table-td-2-img">
                              <img
                                src={item.url}
                                alt="img"
                                className="table-mob-view-poster"
                              />
                              <div className="table-button-artist">
                                <p className="table-mob-artist">
                                  {" "}
                                  {item.artist}{" "}
                                </p>
                              </div>
                              <p className="table-song-name">{item.name}</p>
                            </div>
                          </td>
                          <td className="table-td-3">
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
              <Loader size="lg"/>
        </div>
      )}
    </>
  );
}

export default ArtistPage2;