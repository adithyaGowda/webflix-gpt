import React from "react";
import VideoInfo from "./VideoInfo";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const nowPLayingMovies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );
  if (!nowPLayingMovies) return;

  const { original_title, overview, id } = nowPLayingMovies[0];

  return (
    <div>
      <VideoInfo title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
