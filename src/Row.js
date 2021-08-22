 import React from 'react'
import { useEffect,useState } from 'react';
import axios from './axios';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import './Row.css'
const base_url="https://image.tmdb.org/t/p/original/"

const Row = ({title,fetchUrl,islargeRow}) => {
const[movies,setMovies]=useState([]);
const [trailerUrl,setTrailerUrl]=useState("")

useEffect(()=>{
async function fetchData(){
   const request= await axios.get(fetchUrl)
   setMovies(request.data.results)
  //console.log(request.data.results)
   return request;
}

fetchData()


},[fetchUrl])

const opts={
    height:"390",
    width:"100%",
    playerVars:{
        autoplay:1,
    }
}

const handleClick=(movie)=>{
if(trailerUrl){
    setTrailerUrl("")
}
else{
   movieTrailer(movie.title||movie.name||movie.id)
   .then((url)=>{
     const urlParams= new URLSearchParams(new URL(url).search)

       setTrailerUrl(urlParams.get("v"))
     console.log(url)
   })
   .catch(err=>{
       console.log(err)
   })
}
}

    return (
        <div className="row">
            <h2 style={{color:"white"}}>{title}</h2>
          <div className="row_posters">
              {
                  movies.map(movie=>{
                      return(
                         
                        <img key={movie.id} 
                        src={`${base_url}${islargeRow? movie.poster_path:movie.backdrop_path}`} 
                        onClick={()=>handleClick(movie)}
                        className={`row_poster ${islargeRow && "row_posterLarge"}`}
                        alt={movie.name}/>
                      
                      )
                      
                  })
              }
          </div>
         { trailerUrl?<YouTube videoId={trailerUrl} opts={opts}/>:""}
        </div>
    )
}

export default Row;