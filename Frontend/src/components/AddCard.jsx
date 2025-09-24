import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card.jsx"
import { useState } from "react";

function AddCard({ task, update, deletedFun, undo}) {
  const [done, setDone] = useState(task.completed);
  const [deleted, setDeleted] = useState(task.isDeleted);
  const date = new Date(task.dueDate).toISOString().split("T")[0]

  const handleUpdate = () => {
    setDone(true);
    update({completed : true}, task.id);
  }

  const handleDelete = () => {

    deletedFun({isDeleted : true}, task.id);
  }
  const handleUndo = () => {
    setDone(false);
    undo({completed : false }, task.id);

  }
  return (
    <Card className={`${
      task.priority === "HIGH" ? "bg-gradient-to-r from-red-500 to-red-700" :
      task.priority === "MEDIUM" ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
      "bg-gradient-to-r from-green-400 to-green-600"
    } text-black rounded-xl shadow-lg`}>
      <CardHeader>
        {done ? <CardTitle className="text-lg line-through" >{task.task}</CardTitle> : <CardTitle className="text-lg">{task.task}</CardTitle>}
        <CardDescription className="text-gray-900">{task.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-800">Priority: {task.priority}</span>
          <span className="text-gray-900">Due: {date}</span>
        </div>
        <div className="flex justify-between text-black font-bold mt-10">
          <button className= "w-20 bg-blue-600 p-1 rounded hover:bg-blue-400 hover:scale-100 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-200" onClick={handleUpdate} disabled={done}  >Done</button>
          {done && <button className="w-20 bg-gray-500 hover:scale-105 hover:cursor-pointer hover:shadow-2xl hover:shadow-black" onClick={handleUndo}>Undo</button>}
          <button className="w-20 text-white border-1 border-white rounded font-light hover:bg-gray-500 hover:scale-105 hover:cursor-pointer transition" onClick={handleDelete} >Delete</button>
        </div>
      </CardContent>
      
    </Card>
  )
}

export default AddCard
