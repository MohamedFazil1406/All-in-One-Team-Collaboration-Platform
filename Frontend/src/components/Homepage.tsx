import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const handleSignUp: React.MouseEventHandler<HTMLButtonElement> = () => {
    // Navigate to the sign-up page
    navigate("/signup");
    console.log("Sign-Up button clicked");
  };
  // Logic for sign-up can be added here

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/login");
    // Logic for login can be added here
    console.log("Login button clicked");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 space-y-2 ">
      <h1 className="text-2xl font-bold font-mono mb-4">
        Welcome to the Grade
      </h1>
      <h1 className="text-2xl font-bold font-mono mb-4">
        All-in-One Team Collaboration Platform
      </h1>
      <p className="text-2xl font-mono mb-4">
        Connect, collaborate, and conquer your projects with ease.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleSignUp}
          className="border-2 rounded-2xl p-1.5 font-mono bg-blue-50 hover:bg-blue-200"
        >
          Sign-Up
        </button>
        <button
          onClick={handleLogin}
          className="border-2  rounded-2xl p-1.5 font-mono bg-blue-50 hover:bg-blue-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
