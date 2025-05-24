import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthForm = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      onAuth(userCredential.user.email);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button
        onClick={() => setIsLogin((prev) => !prev)}
        className="mt-4 text-blue-600 hover:underline w-full text-center"
      >
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthForm;
