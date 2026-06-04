import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskStats from "../components/TaskStats";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import ClearCompleted from "../components/ClearCompleted";

const Dashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const API_URL = `${apiUrl}/api/tasks`;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("failed to fetch tasks");
        const data = await response.json();

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [API_URL]);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const addTask = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("failed to add task");
      const data = await response.json();
      setTasks((prevTasks) => [data, ...prevTasks]);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      if (!response.ok) throw new Error("failed to update task");
      const data = await response.json();
      const updatedTasks = tasks.map((task) =>
        task.id === data.id ? { ...task, completed: data.completed } : task,
      );
      setTasks(updatedTasks);
      setError("");

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("failed to delete task");
      const data = await response.json();
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== data.id));
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const clearCompletedTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/clear-completed`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("failed to clear completed tasks");

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.completed === false),
      );
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const hasCompletedTasks = completedTasks > 0;

  return (
    <>
      <section className=" min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-[#059669] selection:text-white">
        <Header username={username} onLogout={onLogout} />
        <div className="max-w-3xl mx-auto px-4 pt-4 sm:px-6">
          <main className="w-full">
            <TaskStats
              completedTasks={completedTasks}
              totalTasks={tasks.length}
            />
            <TodoForm onAddTask={addTask} />

            {isLoading ? (
              <p>loading...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <TodoList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            )}
            {hasCompletedTasks && !error && (
              <ClearCompleted onClearCompleted={clearCompletedTasks} />
            )}
          </main>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
