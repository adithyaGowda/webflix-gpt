import React from "react";
import { MOVIE_POSTER_API } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img src={MOVIE_POSTER_API + posterPath} alt="movie-poster" />
    </div>
  );
};

export default MovieCard;
