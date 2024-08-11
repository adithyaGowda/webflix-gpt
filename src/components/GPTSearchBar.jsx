import React from "react";
import { lang } from "../utils/language";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const selectLanguage = useSelector((store) => store.config.selectLanguage);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[selectLanguage].searchPlaceholder}
        />
        <button className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white">
          {lang[selectLanguage].searchBtn}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;