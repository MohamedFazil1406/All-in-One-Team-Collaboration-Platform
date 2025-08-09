import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../../../Backend/src/validation/uservalidation"; // Adjust the import path as necessary

export default function Signup() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | Record<string, string> | null>(
    null
  );
  const navigate = useNavigate();

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = createUserSchema.safeParse({ name, email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};

      (["name", "email", "password"] as const).forEach((key) => {
        if (fieldErrors[key]?.length) {
          formattedErrors[key] = fieldErrors[key]![0]; // show only first error per field
        }
      });

      setError(formattedErrors);
      return; // stop form submission
    }

    try {
      const response = await axios.post("http://localhost:3000/api/data", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login"); // Redirect to login after successful sign-up
      } else {
        setError("Error creating user");
        console.error("Error creating user:", response.status);
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error during sign-up:", error);
    }
  };
  // Logic for sign-up can be added here, such as API calls to create a user
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 space-y-2 ">
      <h1 className="text-2xl font-bold font-mono mb-4">
        Sign Up for Our Platform
      </h1>
      <p className="text-2xl font-mono mb-4">
        Join us to start collaborating on your projects seamlessly.
      </p>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col space-y-4 border-2 p-4 rounded-2xl bg-blue-50"
      >
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border-2 rounded-2xl p-2 font-mono"
        ></input>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </button>
      </form>
      {/* Show backend error here */}
      {error &&
        (typeof error === "string" ? (
          <p className="font-mono text-2xl bg-red-800">{error}</p>
        ) : (
          <ul className="font-mono text-2xl bg-red-800 rounded p-2">
            {Object.entries(error).map(([field, msg]) => (
              <li key={field}>
                {field}: {msg}
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
