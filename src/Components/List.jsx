import { useEffect, useState } from "react";
import axios from "axios";

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

  // ⭐ NEW: Toggle Completed / Pending
  const handleStatusChange = async (task) => {
    try {
      await axios.patch(`http://localhost:3200/update-task/${task._id}`, {
        completed: !task.completed,
      });

      setTaskData(
        taskData.map((t) =>
          t._id === task._id ? { ...t, completed: !task.completed } : t
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">To Do List</h1>

      <div className="grid grid-cols-12 bg-gray-200 p-3 rounded font-semibold text-gray-700 mb-4">
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
            className={`grid grid-cols-12 gap-2 border rounded-lg p-3 shadow-sm transition 
              ${item.completed ? "bg-green-100 border-green-400" : "bg-gray-50 border-gray-300"}`}
          >
            <div className="col-span-1 flex items-center justify-center font-semibold">
              {index + 1}
            </div>

            <div className="col-span-3 flex items-center">
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
                <span className={`${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                  {item.title}
                </span>
              )}
            </div>

            <div className="col-span-5 flex items-center">
              {editTaskId === item._id ? (
                <textarea
                  value={editTaskData.description}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded h-20"
                ></textarea>
              ) : (
                <span className={`${item.completed ? "line-through text-gray-500" : "text-gray-600"}`}>
                  {item.description}
                </span>
              )}
            </div>

            {/* ✔ Checkbox for Completed */}
            <div className="col-span-1 flex items-center justify-center">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleStatusChange(item)}
                className="h-5 w-5"
              />
            </div>

            {/* Edit / Delete Buttons */}
            <div className="col-span-2 flex gap-3 items-center justify-center">
              {editTaskId === item._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    disabled={item.completed}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
