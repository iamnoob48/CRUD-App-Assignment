import React, { useEffect, useState } from "react";
import PopupModal from "./PopupModal";
import AddCard from "./AddCard.jsx";
import NavBar from "./NavBar";

function DashBoard() {
  const token = localStorage.getItem("token");
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState([]);
  const [errors, setErrors] = useState([]);

  const prefix = "/api/v1";

  const fetchTodos = async () => {
    const response = await fetch(prefix + "/todo", {
      headers: { Authorization: token },
    });
    const data = await response.json();
    setTask(data);
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);
  const handleSubmit = async (newTask) => {
    const {
      task,
      description,
      priority,
      dueDate,
      category,
      completed,
      isDeleted,
    } = newTask;
    const response = await fetch(prefix + "/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: token,
      },
      body: JSON.stringify({
        task: task,
        description: description,
        priority: priority,
        dueDate: dueDate,
        category: category,
        completed: completed,
        isDeleted: isDeleted,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setErrors(data.errors);
      return;
    }

    setPopup(false);
    setTask((prev) => [...prev, data]);
  };
  const handleUpdate = async (newCreds, index) => {
    const { completed } = newCreds;
    await fetch(prefix + "/todo/" + index, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id: index, completed: completed }),
    });
    fetchTodos();
  };
  const handleDelete = async (newCreds, id) => {
    const { isDeleted } = newCreds;
    const res = await fetch(prefix + "/todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id: id, isDeleted: isDeleted }),
    });
    if (!res.ok) {
      return;
    }
    fetchTodos();
  };
  const handleUndo = async (newCreds, id) => {
    const { completed } = newCreds;
    const res = await fetch(prefix + "/todo/" + id + "/undo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id: id, completed: completed }),
    });
    if (!res.ok) {
      return;
    }
    fetchTodos();
  };

  return (
    <div className="flex">
      <NavBar />

      <div className="text-blue-500 flex-1 p-6">
        <h1 className="text-left text-3xl font-bold">Home</h1>
        <div className="flex items-center justify-center gap-4 mt-15">
          <input
            type="text"
            placeholder="Enter a task"
            className="text-white p-3 w-100 border-1 rounded-2xl"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="font-medium border-1 p-3 rounded-2xl bg-blue-500 text-black hover:bg-blue-300 hover:scale-105 hover:cursor-pointer"
            onClick={() => setPopup(true)}
          >
            Add Task
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {task.map((t) => (
            <AddCard
              key={t.id}
              task={t}
              update={handleUpdate}
              deletedFun={handleDelete}
              undo={handleUndo}
            />
          ))}
        </div>
        {popup && (
          <PopupModal
            isOpen={popup}
            onSubmit={handleSubmit}
            onClose={() => {
              setPopup(false);
              setErrors([]);
            }}
            title={title}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
}

export default DashBoard;
