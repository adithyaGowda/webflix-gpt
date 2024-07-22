import React from "react";

const VideoInfo = ({ title, overview }) => {
  return (
    <div className="px-12 pt-[20%] absolute text-white w-screen aspect-video bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/2">{overview}</p>
      <div>
        <button className="bg-white text-black py-2 px-10 text-xl bg-opacity-59 rounded-lg hover:opacity-80">
          Play
        </button>
        <button className="bg-gray-600 mx-2 text-white py-2 px-10 text-xl bg-opacity-59 rounded-lg">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;
