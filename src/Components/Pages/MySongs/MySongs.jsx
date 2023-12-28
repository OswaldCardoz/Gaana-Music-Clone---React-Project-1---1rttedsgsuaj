import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {  useSelector } from "react-redux";

function MySongs() {
  const dataFromLocal = localStorage.getItem("userData") || "";
  const local = dataFromLocal ? JSON.parse(dataFromLocal) : "";
  const [removal, setRemoval] = useState("");
  const [individualSong, setIndividualSong] = useState([]);
  const uiReRenderData = useSelector((state) => state.users.favSongUiUpdate);

  const debouncedFavSongFetching = debounce(() => {
    favSongFetching();
  }, 500);

  async function favSongFetching() {
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/music/favorites/like", {
        method: 'PATCH',
        headers: {
          "projectID": "1rttedsgsuaj",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${local.token}`
        },
        body: removal ? JSON.stringify({ "songId": removal }) : "",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status: ${response.status}. Error message: ${errorText}`);
      }

      const result = await response.json();

      if (result.data) {
        setIndividualSong(result.data.songs);
      } else {
        console.log("Data not found in the API response.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // let songs={};
  const handlerRemoveFav = (data) => {
    // console.log("to delete", data);
    setRemoval(data);
    debouncedFavSongFetching();
  }


  const songIdFetching= async()=> {
    try {
      const fetching = await fetch("https://academics.newtonschool.co/api/v1/music/favorites/like", {
        method: 'GET',
        headers: { "projectID": "1rttedsgsuaj", "Authorization": `Bearer ${local.token}` },
      });
      const response = await fetching.json();
      setIndividualSong(response.data.songs);
    } catch (error) {
      console.log(error);
    }
  }


  const artistName=(id)=> {
    let artistName = ""
    const allSongsList = JSON.parse(localStorage.getItem("allData")) || [];
    allSongsList.some((item) => {
      if (item.artist[0]?._id === id) {
        artistName = item.artist[0].name;
        return true; // Stop iterating once a match is found
      }
      return false;
    });
    return artistName;
  }

  useEffect(() => {
    songIdFetching();
  }, [uiReRenderData]);

  return (
    <>
      <div className="mySongs">
        <h2>Favorite Songs</h2>
        {individualSong.length === 0 &&
          (<div style={{ textAlign: "center" }}>
            No Songs Found
          </div>
          )
        }
        <div className="music-player-section-2">
          <div className="table-td-2-img">
            {individualSong.map((item) => (
              <div key={item._id} className="songs-collection">
                <div className="inside-song-collection">
                  <img src={item.thumbnail} alt="img" className="table-mob-view-poster" />
                  <div className="flex">
                    <div className="table-button-artist">
                      <p className="table-mob-artist">{artistName(item.artist[0])}</p>
                    </div>
                    <p className="table-song-name">{item.title}</p>
                  </div>
                </div>
                <div>
                  <AiOutlineClose onClick={() => handlerRemoveFav(item._id)} className="heart-in" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Debounce function to prevent rapid API calls
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default MySongs;
