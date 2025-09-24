import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card.jsx";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

function Analytics() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(0);
  const token = localStorage.getItem("token");
  const prefix = "/api/v1";

  const fetchStreak = async () => {
    const response = await fetch(prefix + "/analyse", {
      headers: {
        authorization: token,
      },
    });
    const data = await response.json();
    setCompletedTasks(data.completedTask);
    setStreak(data.streak);
    setTodayCompleted(data.todayCompleted);
  };

  useEffect(() => {
    fetchStreak();
  }, [token]);

  return (
    <div className="flex min-h-screen">
      <NavBar className="w-20 bg-gray-900" />

      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card className="bg-gray-900 border border-blue-700 text-blue-400">
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-green-700 text-green-400">
          <CardHeader>
            <CardTitle>Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{streak} 🔥</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-green-700 text-green-400">
          <CardHeader>
            <CardTitle>Today's Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{todayCompleted} 🔥</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
