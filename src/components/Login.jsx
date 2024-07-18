import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          console.log(user);

          //update user info
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
              navigate("/browse");
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
          console.log(user);
          navigate("/browse");
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
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_small.jpg"
          alt="background"
          className="brightness-50"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" mx-auto right-0 left-0 absolute w-4/12 bg-black text-white p-14 my-36 rounded-md bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-4">
          {isSignupForm ? "Sign Up" : "Sign In"}
        </h1>
        {isSignupForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-4 my-4 rounded-md border bg-gray-900 bg-opacity-35"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="w-full p-4 my-4 rounded-md border bg-gray-900 bg-opacity-35"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-4 my-4 rounded-md border bg-gray-900 bg-opacity-35"
        />
        <p className="text-[#E50914] text-sm py-2">{errors}</p>
        <button
          className="p-4 my-6 w-full bg-[#E50914] rounded-md"
          onClick={handleFormSubmit}
        >
          {isSignupForm ? "Sign Up" : "Sign In"}
        </button>
        <div>
          <p>
            {isSignupForm ? "Already a member? " : "New to Webflix? "}
            <span
              className="hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignupForm ? "Sign in now" : "Sign up now"}
            </span>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
