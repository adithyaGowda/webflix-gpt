import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieTrailer: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    getMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload.find(
        (videos) => videos?.type === "Trailer"
      );
    },
  },
});

export const { addNowPlayingMovies, getMovieTrailer } = movieSlice.actions;

export default movieSlice.reducer;
