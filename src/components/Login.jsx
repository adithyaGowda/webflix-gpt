import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_BG } from "../utils/constants";
import { lang } from "../utils/language";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  const selectLanguage = useSelector((store) => store.config.selectLanguage);

  const toggleSignInForm = () => {
    setIsSignupForm((prev) => !prev);
  };

  const handleFormSubmit = () => {
    const validate = validateForm(email.current.value, password.current.value);
    setErrors(validate);

    if (validate) return;

    if (isSignupForm) {
      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCred) => {
          //signed up
          const user = userCred.user;

          //update user info
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((err) => {
              const errCode = err.code;
              const errMsg = err.message;
              setErrors(errCode + " - " + errMsg);
            });
        })
        .catch((err) => {
          const errCode = err.code;
          const errMsg = err.message;
          if (errCode.includes("email-already-in-use"))
            setErrors("User exists, Try Signing In!");
        });
    } else {
      //Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCred) => {
          //signed in
          const user = userCred.user;
        })
        .catch((err) => {
          const errCode = err.code;
          const errMsg = err.message;
          if (errCode.includes("invalid-credential"))
            setErrors("Invalid Credentials");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGIN_BG} alt="background" className="brightness-50" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" mx-auto right-0 left-0 absolute w-4/12 bg-black text-white p-14 my-36 rounded-md bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-4">
          {isSignupForm
            ? lang[selectLanguage].userAuth.signUp
            : lang[selectLanguage].userAuth.signIn}
        </h1>
        {isSignupForm && (
          <input
            ref={name}
            type="text"
            placeholder={lang[selectLanguage].userAuth.fullname}
            className="w-full p-4 my-4 rounded-md border bg-gray-900 bg-opacity-35"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder={lang[selectLanguage].userAuth.email}
          className="w-full p-4 my-4 rounded-md border bg-gray-900 bg-opacity-35"
        />
        <input
          ref={password}
          type="password"
          placeholder={lang[selectLanguage].userAuth.password}
          className="w-full p-4 my-4 rounded-md border bg-gray-900 bg-opacity-35"
        />
        <p className="text-[#E50914] text-sm py-2">{errors}</p>
        <button
          className="p-4 my-6 w-full bg-[#E50914] rounded-md"
          onClick={handleFormSubmit}
        >
          {isSignupForm
            ? lang[selectLanguage].userAuth.signUp
            : lang[selectLanguage].userAuth.signIn}
        </button>
        <div>
          <p>
            {isSignupForm
              ? lang[selectLanguage].userAuth.alreadyMember
              : lang[selectLanguage].userAuth.newtoWebflix}
            <span
              className="hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignupForm
                ? lang[selectLanguage].userAuth.signInNow
                : lang[selectLanguage].userAuth.signUpNow}
            </span>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
