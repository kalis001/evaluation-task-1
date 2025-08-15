import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", status: "pending" });
  const navigate = useNavigate();

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", task);
    navigate("/dashboard");
  };
  

  return (
    <div className=" max-w-lg text-center border w-50 mx-auto" style={{height:'400px'}}>
      <h2 className=" text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="w-75 mx-5 form-control p-2 border border-black" onChange={handleChange} />
        <br></br>
        <textarea name="description" placeholder="Description" className="w-75 mx-5 form-control border border-black" onChange={handleChange} />
        <br></br>
        <input name="dueDate" type="date" className="w-75 mx-5 form-control p-2  border border-black" onChange={handleChange} />
         <br></br>
        <select name="status" className="w-75 mx-5 form-control p-2 px-5 border border-black" onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <br></br>
        <button className="bg-success text-white px-5 border rounded py-2">Create</button>
        
      </form>
    </div>
  );
};

export default CreateTask;