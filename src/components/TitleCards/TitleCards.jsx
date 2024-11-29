import React, { useState,useEffect, useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import {Link} from 'react-router-dom'
const TitleCards = ({title,category}) => {

//As we are getting data from an api in form of array we are taking as array use state
const[apiData, setApiData] = useState([]);


  // Scrolling without scrollbar
  const cardsRef = useRef();
  //To fetch data from an external movie site
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTIxODg5NTE3MzI3MzZjOGJmYjU0MmZkZGUzMDIxYiIsIm5iZiI6MTczMjY0MzUzNi45MTQ3NjkyLCJzdWIiOiI2NzQ2MDllYmE3ZDIzOTM3MDhkODIxM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.76j5CTZcZdnKADq-aW5lbcgF9dnw6ijerVNKwRUr3Hk'
    }
  };
  
  


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  // Attach the wheel event listener when the component mounts
  useEffect(() => {
    const cardsElement = cardsRef.current;
    if (cardsElement) {
//After every reload will fetch the data
//According to the category iam changin the api's 
fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    //Main thing setting data from Api
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

      cardsElement.addEventListener('wheel', handleWheel);

      // Cleanup function to remove the event listener
      return () => {
        cardsElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
  {/* Using link here so that after clicking on the cards will got the player page */}
        {apiData.map((card, index) => (
// When to Use Backticks (``)
// Backticks (``) are used for template literals, 
// which allow embedding variables or dynamic values 
// into a string using ${} syntax.
         <Link to={`/player/${card.id}`} className="card" key={index}>
            {/* In Api the path is different so we are appending original path and backdrop path */}
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
