import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);

  const toggleSignInForm = () => {
    setIsSignupForm((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          //   src="https://web-flix.netlify.app/images/misc/home-bg.jpg"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg"
          alt="background"
          className="brightness-50"
        />
      </div>
      <form className=" mx-auto right-0 left-0 absolute w-4/12 bg-black text-white p-14 my-36 rounded-md bg-opacity-80">
        <h1 className="text-3xl font-bold py-4">
          {isSignupForm ? "Sign Up" : "Sign In"}
        </h1>
        {isSignupForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 my-4 rounded-md border border-white bg-gray-900 bg-opacity-35"
          />
        )}
        <input
          type="text"
          placeholder="Email address"
          className="w-full p-4 my-4 rounded-md border border-white bg-gray-900 bg-opacity-35"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 my-4 rounded-md border border-white bg-gray-900 bg-opacity-35"
        />
        <button className="p-4 my-6 w-full bg-[#E50914] rounded-md">
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
