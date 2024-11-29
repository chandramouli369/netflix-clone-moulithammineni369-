import React, { useState,useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams,useNavigate } from 'react-router-dom';

const Player = () => {

//Using params to extract id from url
const {id} = useParams();
//Navigate with back btn in video player
const navigate= useNavigate();
//For manipulating api data
const [apiData, setApiData] = useState({ 

name: "",
key: "",
published_at: "",
type: ""
})

//Add useEfect fro rendering whenever the player loads
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTIxODg5NTE3MzI3MzZjOGJmYjU0MmZkZGUzMDIxYiIsIm5iZiI6MTczMjY0MzUzNi45MTQ3NjkyLCJzdWIiOiI2NzQ2MDllYmE3ZDIzOTM3MDhkODIxM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.76j5CTZcZdnKADq-aW5lbcgF9dnw6ijerVNKwRUr3Hk'
  }
};

useEffect(() => {
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  // Get the info of first obj so we are taking res[0]
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
}, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div className='player'>
      <img src={back_arrow_icon}  style={{ cursor: 'pointer' }} alt="" onClick={()=>{navigate(-1)}}/>
      <iframe 
        width='90%' 
        height='90%' 
        // apiData.key means here every youtube video has unique key so manually taking it from api
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='Trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      {/* below information */}
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
