import { useEffect, useState } from "react";
import axios from "axios";

export default function List({ token }) {
  const [taskData, setTaskData] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ title: "", description: "" });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await axios.get("http://localhost:3200/tasks", axiosConfig);
      if (response.data && response.data.tasks) {
        setTaskData(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/delete-task/${id}`, axiosConfig);
      setTaskData(taskData.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditTaskId(item._id);
    setEditTaskData({
      title: item.title,
      description: item.description,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3200/update-task/${id}`, editTaskData, axiosConfig);
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

  const handleStatusChange = async (task) => {
    try {
      const response = await axios.patch(
        `http://localhost:3200/toggle-task/${task._id}`,
        {},
        axiosConfig
      );
      const updatedTask = response.data.task;
      setTaskData(taskData.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
        To Do List
      </h1>

      {/* Header */}
      <div className="hidden md:grid grid-cols-12 bg-gray-200 p-3 rounded font-semibold text-gray-700 mb-4">
        <div className="col-span-1 text-center">S.No</div>
        <div className="col-span-3">Title</div>
        <div className="col-span-5">Description</div>
        <div className="col-span-1 text-center">Done</div>
        <div className="col-span-2 text-center">Action</div>
      </div>

      <ul className="space-y-4">
        {taskData.map((item, index) => (
          <li
            key={item._id}
            className={`grid grid-cols-1 md:grid-cols-12 gap-2 border rounded-lg p-3 shadow-sm transition 
              ${item.completed ? "bg-green-100 border-green-400 line-through" : "bg-gray-50 border-gray-300"}`}
          >
            {/* S.No */}
            <div className="md:col-span-1 flex items-center justify-center font-semibold">
              {index + 1}
            </div>

            {/* Title */}
            <div className="md:col-span-3 flex items-center">
              {editTaskId === item._id ? (
                <input
                  type="text"
                  value={editTaskData.title}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              ) : (
                <span
                  className={`${
                    item.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-5 flex items-center mt-2 md:mt-0">
              {editTaskId === item._id ? (
                <textarea
                  value={editTaskData.description}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded h-20"
                ></textarea>
              ) : (
                <span
                  className={`${
                    item.completed ? "line-through text-gray-500" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </span>
              )}
            </div>

            {/* Completed */}
            <div className="md:col-span-1 flex items-center justify-center mt-2 md:mt-0">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleStatusChange(item)}
                className="h-5 w-5"
              />
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-2 items-center justify-center mt-2 md:mt-0">
              {editTaskId === item._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded w-full md:w-auto"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded w-full md:w-auto"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded w-full md:w-auto"
                    disabled={item.completed}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto"
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
