import { useState } from "react";

const TodoForm = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    onAddTask(task.trim());

    setTask("");
    setError("");
  };
  return (
    <>
      {error && (
        <p className="mt-2 px-3 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-md">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-slate-200 p-1 mt-6 flex items-center justify-between space-x-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Add a new task..."
          className="bg-gray-800 text-slate-200 placeholder:text-slate-500 flex-1 border-none focus:outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#059669] hover:bg-[#047857] text-white py-2 px-4 rounded-md transition duration-200"
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default TodoForm;
