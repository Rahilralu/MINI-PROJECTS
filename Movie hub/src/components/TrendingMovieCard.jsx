  import React from "react";
  import noMovie from "../assets/no-movie.png";

  const TrendingMovieCard = ({ movie, index }) => {
  const imageUrl = movie.poster_url || noMovie;


    return (
      <li className="trending-movie-card">
        <p>{index + 1}</p>
        <img
          src={imageUrl}
          alt={movie.title}
          style={{ width: "150px", borderRadius: "8px" }}
          onError={() => console.log("Image failed:", imageUrl)}
          onLoad={() => console.log("Image loaded:", imageUrl)}
        />
        <p>{movie.title}</p>
      </li>
    );
  };

  export default TrendingMovieCard;
