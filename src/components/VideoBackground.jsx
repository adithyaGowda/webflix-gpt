import React, { useEffect, useState } from "react";
import { API_OPTIONS, TMDB_URL, YOUTUBE_API } from "../utils/constants";
import { useSelector } from "react-redux";
import useFetchMoviesToStore from "../hooks/useFetchMoviesToStore";
import { getMovieTrailer } from "../utils/movieSlice";

const VideoBackground = ({ movieId }) => {
  const url = `${TMDB_URL + movieId}/videos?language=en-US`;
  const selectTrailer = (store) => store.movies.movieTrailer;

  useFetchMoviesToStore(url, API_OPTIONS, getMovieTrailer, selectTrailer);

  const trailer = useSelector(selectTrailer);

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={
          YOUTUBE_API +
          trailer?.key +
          "?autoplay=1&mute=1&controls=0&frameborder=0&loop=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; modestbranding; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
