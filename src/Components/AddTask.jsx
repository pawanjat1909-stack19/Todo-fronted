import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function AddTask() {
    const [taskData,setTaskData]=useState({title:"",description:""});
    const navigate= useNavigate();

  const handleAddTask = async () => {
    try {
      console.log("Sending task:", taskData);
      const result = await axios.post("http://localhost:3200/add-task", taskData);
      console.log("Response:", result.data);
     
      if (result.data.success) {
        //  ADD HOTE HI LIST PAGE PE 
        navigate("/"); 
      }      
      // Reset form
      setTaskData({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }

    }
  return (
    <div className="max-w-xl w-full mx-auto my-8 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add New Task</h1>

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-700" htmlFor="title">Title</label>
        <input
        onChange={(event)=>setTaskData({...taskData,title:event.target.value})}
          id="title"
          type="text"
          name='title'
          placeholder='Enter task title'
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-700" htmlFor="description">Description</label>
        <textarea
      onChange={(event)=>setTaskData({...taskData,description:event.target.value})}
          id="description"
          name="description"
          placeholder='Enter task description'
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-32"
        ></textarea>
      </div>

      <button
       onClick={handleAddTask}
       className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors">
        Add New Task
      </button>
    </div>
  )
}
