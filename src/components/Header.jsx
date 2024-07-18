import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, []);

  return (
    <div className="absolute px-36 py-4 bg-gradient-to-b from-black opacity-90 z-50 w-screen flex justify-between">
      <img
        className="w-40"
        src="https://web-flix.netlify.app/static/media/webflix.b3a2269c88bdc931e9d9.png"
        alt="logo"
      />
      {user && (
        <div className="flex p-4">
          <div className="flex flex-col items-center">
            <img
              className="w-10 h-10"
              src="https://occ-0-4994-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
              alt="user-profile"
            />
            <p className="text-base font-bold text-red-800">
              {user ? user.displayName : "WEBFLIX_USER"}
            </p>
          </div>
          <button
            className="px-4 m-4 border border-gray-500 text-white font-bold rounded-md"
            onClick={handleSignout}
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
