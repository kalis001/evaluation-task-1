import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto border rounded text-center mt-5 " style={{width:'500px',height:'350px'}}>
      <h2 className="res-h2 text-2xl Italic text-secondary text mb-4 ">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" className="w-75 mx-5 form-control p-2  border border-black" onChange={handleChange} />
        <br></br>
        <input name="email" type="email" placeholder="Email" className="w-75 mx-5 form-control  p-2 border border-black" onChange={handleChange} />
        <br></br>
        <input name="password" type="password" placeholder="Password" className="w-75 mx-5 form-control  p-2 border border-black" onChange={handleChange} />
        <br></br>
        <button className="bg-blue-500 bg-primary border mx-2 text-white px-4  rounded py-2">Register</button>
      </form>
    </div>
  );
};

export default Register;