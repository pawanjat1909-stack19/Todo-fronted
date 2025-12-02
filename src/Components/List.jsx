import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function List() {
  const [taskData, setTaskData] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ title: "", description: "" });


  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await axios.get("http://localhost:3200/tasks");
      if (response.data && response.data.tasks) {
        setTaskData(response.data.tasks);
        
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/delete-task/${id}`);
      setTaskData(taskData.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditTaskData({ title: task.title, description: task.description });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3200/update-task/${id}`, editTaskData);
      setTaskData(
        taskData.map((task) =>
          task._id === id ? { ...task, ...editTaskData } : task
        )
      );
      setEditTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">To Do List</h1>

      {/* Header Row */}
      <div className="grid grid-cols-12 bg-gray-200 p-3 rounded font-semibold text-gray-700 mb-4">
        <div className="col-span-1 text-center">S.No</div>
        <div className="col-span-3">Title</div>
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-center">Action</div>
      </div>

      {/* Tasks List */}
      <ul className="space-y-4">
        {taskData.map((item, index) => (
          <li
            key={item._id}
            className="grid grid-cols-12 gap-2 bg-gray-50 border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition"
          >
            {/* S.No */}
            <div className="col-span-1 flex items-center justify-center font-semibold text-gray-800">
              {index + 1}
            </div>

            {/* Title */}
            <div className="col-span-3 flex items-center">
              {editTaskId === item._id ? (
                <input
                  type="text"
                  value={editTaskData.title}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <span className="text-gray-800">{item.title}</span>
              )}
            </div>

            {/* Description */}
            <div className="col-span-6 flex items-center">
              {editTaskId === item._id ? (
                <textarea
                  value={editTaskData.description}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded h-20"
                ></textarea>
              ) : (
                <span className="text-gray-600">{item.description}</span>
              )}
            </div>

            {/* Actions */}
            <div className="col-span-2 flex gap-3 items-center justify-center">
              {editTaskId === item._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
