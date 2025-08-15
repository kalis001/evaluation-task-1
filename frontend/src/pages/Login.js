import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const message = error.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto border text-center rounded mt-5" style={{width:'500px',height:'300px'}}>
      <h2 className="text-2xl font-bold fs-3 mt-4 mb-4" style={{fontFamily:"sans-serif",fontWeight:'bold'}}>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-75 p-2 border mx-5 border-black mt-3 form-control "
          onChange={handleChange}
          value={form.email}
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-75 p-2 mx-5 border border-black mt-3 form-control"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button
          type="submit"
          className={`w-full px-4 mt-3 mx-2 py-2 border rounded bg-success text-white ${loading ? "bg-green-300" : "bg-green-500"}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;