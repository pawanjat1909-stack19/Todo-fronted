// src/Components/Login.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3200/login", {
        email,
        password,
      });

   console.log("LOGIN RESPONSE --->", response.data);
      const token = response.data.token;

      if (!token) {
        setError(response.data.message || "Login failed");
        return;
      }

      
      localStorage.setItem("token", token);
      setToken(token);
    
console.log("Token stored in localStorage:", localStorage.getItem("token"));


      // set token for future axios requests
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      setError("");
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
    

<p className="text-center mt-4">
  Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
</p>


        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
