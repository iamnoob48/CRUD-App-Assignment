import React, { useState } from "react";

function PopupModal({ isOpen, onClose, onSubmit, title, errors }) {
  const [task, setTask] = useState(title);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Work");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({
      task,
      description,
      priority,
      dueDate,
      category,
      completed: false,
      isDeleted: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-900 text-blue-400 p-6 rounded-xl w-full max-w-md shadow-lg">
        {errors && errors.length > 0 && (
          <div className="border-1 border-red-400 text-white p-2 rounded mb-3">
            <ul className="list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err.msg || err}</li>
              ))}
            </ul>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

        <input
          type="text"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />

        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="block text-sm mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1">Due Date*</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Health</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 text-black font-extrabold">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
