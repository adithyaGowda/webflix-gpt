import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { LOGIN_BG } from "../utils/constants";

const GPTView = () => {
  return (
    <div>
      <div className="absolute -z-20">
        <img src={LOGIN_BG} alt="background" className="brightness-50" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTView;
