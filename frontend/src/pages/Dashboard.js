import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks/getAllTasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deleted");
    if (!confirm) return;

    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate?.substring(0, 10),
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditForm({ title: "", description: "", status: "pending", dueDate: "" });
  };

  const handleSaveEdit = async (id) => {
    try {
      await API.put(`/tasks/${id}`, editForm);
      setEditingTaskId(null);
      loadTasks();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className=" py-4 mx-auto text-center rounded w-50">
      <Link to="/create" className=" p-1 px-2 mb-4">
        <button className="px-4 py-1 border bg-info text-black rounded" style={{fontWeight:'bold'}}>Create</button>
      </Link>

      <h2 className="text-2xl py-2 font-bold fs-3 ">My Task</h2>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <div key={task._id} className="border p-4 mb-4 rounded">
          {editingTaskId === task._id ? (
            <>
              
              <input
                type="text"
                name="title"
                placeholder="title"
                value={editForm.title}
                onChange={handleEditChange}
                className=" form-control border border-black mb-2 p-2 border"
              />
              <textarea
              placeholder="description"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="form-control mb-2 p-2 border border-black"
              />
              <input
                type="date"
                name="dueDate"
                value={editForm.dueDate}
                onChange={handleEditChange}
                className="form-control mb-2 p-2 border border-black"
              />
              <select
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
                className="form-control mb-2 p-2 border border-black"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleSaveEdit(task._id)}
                  className="btn btn-success text-white px-4 mx-3 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-secondary text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due: {task.dueDate?.substring(0, 10)}</p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="btn btn-primary text-white px-4 mx-3 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
