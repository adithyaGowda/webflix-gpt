import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_LOGO, WEBFLIX_LOGO } from "../utils/constants";

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

  return (
    <div className="absolute bg-gradient-to-b from-black opacity-90 z-50 w-screen flex justify-between">
      <img className="w-64 px-12 py-4" src={WEBFLIX_LOGO} alt="logo" />
      {user && (
        <div className="flex">
          <div className="flex items-center">
            <p className="text-base font-bold text-red-400 w-32">
              {user ? user.displayName : "WEBFLIX_USER"}
            </p>
            <img className="w-10 h-10" src={USER_LOGO} alt="user-profile" />
          </div>
          <button
            className="px-4 mr-8 text-white font-bold rounded-md"
            onClick={handleSignout}
          >
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
