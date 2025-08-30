import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SigninUserSchema } from "../../../Backend/src/validation/uservalidation";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | Record<string, string> | null>(
    null
  );

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const result = SigninUserSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};

      (["email", "password"] as const).forEach((key) => {
        if (fieldErrors[key]?.length) {
          formattedErrors[key] = fieldErrors[key]![0]; // show only first error per field
        }
      });

      setError(formattedErrors);
      return; // stop form submission
    }
    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Login successful");
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        console.error("Login failed:", response.status);
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 space-y-2 ">
      <h1 className="text-2xl font-bold font-mono mb-4">
        Login to Your Account
      </h1>
      <p className="text-2xl font-mono mb-4">
        Access your projects and collaborate with your team.
      </p>
      <form
        onSubmit={handleLogin}
        className="flex flex-col space-y-4 border-2 p-4   
                rounded-2xl bg-blue-50"
      >
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-2 rounded-2xl p-2 font-mono"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-2 rounded-2xl p-2 font-mono"
        />
        <button
          type="submit"
          className="border-2 rounded-2xl p-1.5 font-mono bg-blue-50 hover:bg-blue-200"
        >
          Login
        </button>
      </form>
      {error && (
        <div className="bg-red-800 mt-2 font-mono text-2xl">
          {typeof error === "string" ? (
            error
          ) : (
            <ul>
              {Object.entries(error).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
