import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_LOGO, WEBFLIX_LOGO } from "../utils/constants";
import { toggleGpt } from "../utils/gptSlice";
import { lang, langOptions } from "../utils/language";
import { changeDefaultLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const toggleGptView = useSelector((store) => store.gpt.toggleGptView);
  const selectLanguage = useSelector((store) => store.config.selectLanguage);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));

        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAskGPTView = () => {
    dispatch(toggleGpt());
  };

  const handleSelectOptions = (e) => {
    dispatch(changeDefaultLanguage(e.target.value));
  };

  return (
    <div className="absolute bg-gradient-to-b from-black opacity-90 z-50 w-full flex justify-between">
      <img className="w-64 px-12 py-4" src={WEBFLIX_LOGO} alt="logo" />
      <div className="flex">
        <select
          onChange={handleSelectOptions}
          className="px-2 my-10 mx-4 bg-gray-700 text-white rounded-md"
          value={selectLanguage}
        >
          {langOptions.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.language}
            </option>
          ))}
        </select>

        {user && (
          <div className="flex">
            <button
              className="text-white mx-6 my-8 rounded-md bg-slate-500 w-28"
              onClick={handleAskGPTView}
            >
              {toggleGptView
                ? lang[selectLanguage].browse
                : lang[selectLanguage].askGpt}
            </button>

            <div className="flex flex-col mx-2 justify-center items-center">
              <img className="w-8" src={USER_LOGO} alt="user-profile" />
              <p className="text-sm font-bold text-red-400 w-30">
                {user ? user.displayName : "WEBFLIX_USER"}
              </p>
            </div>
            <button
              className="px-2 text-white font-bold rounded-md"
              onClick={handleSignout}
            >
              ({lang[selectLanguage].userAuth.signOut})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
