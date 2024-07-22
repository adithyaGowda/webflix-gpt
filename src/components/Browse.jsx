import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS, TMDB_NOW_PLAYING } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import useFetchMoviesToStore from "../hooks/useFetchMoviesToStore";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  const selectNowPlayingMovies = (store) => store.movies.nowPlayingMovies;

  useFetchMoviesToStore(
    TMDB_NOW_PLAYING,
    API_OPTIONS,
    addNowPlayingMovies,
    selectNowPlayingMovies
  );

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
