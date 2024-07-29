import React, { useEffect } from "react";
import Header from "./Header";
import {
  API_OPTIONS,
  TMDB_NOW_PLAYING,
  TMDB_POPULAR,
  TMDB_TOP_RATED,
  TMDB_UPCOMING,
} from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/movieSlice";
import useFetchMoviesToStore from "../hooks/useFetchMoviesToStore";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  const selectNowPlayingMovies = (store) => store.movies.nowPlayingMovies;
  const selectPopularMovies = (store) => store.movies.popularMovies;
  const selectTopRatedMovies = (store) => store.movies.topRatedMovies;
  const selectUpcomingMovies = (store) => store.movies.upcomingMovies;

  useFetchMoviesToStore(
    TMDB_NOW_PLAYING,
    API_OPTIONS,
    addNowPlayingMovies,
    selectNowPlayingMovies
  );

  useFetchMoviesToStore(
    TMDB_POPULAR,
    API_OPTIONS,
    addPopularMovies,
    selectPopularMovies
  );

  useFetchMoviesToStore(
    TMDB_TOP_RATED,
    API_OPTIONS,
    addTopRatedMovies,
    selectTopRatedMovies
  );

  useFetchMoviesToStore(
    TMDB_UPCOMING,
    API_OPTIONS,
    addUpcomingMovies,
    selectUpcomingMovies
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
