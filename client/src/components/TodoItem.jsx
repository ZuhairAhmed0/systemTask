import { FaCheck, FaTrashAlt } from "react-icons/fa";

const TodoItem = ({ task, onToggleTask, onDeleteTask }) => {
  return (
    <div className="flex items-center justify-between p-2 mb-3 bg-[#1e293b] border border-slate-700/50 rounded-lg transition-all hover:border-slate-600">
      <div
        className="flex items-center gap-4 cursor-pointer flex-1"
        onClick={() => onToggleTask(task.id)}
      >
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-full border transition-colors ${
            task.completed
              ? "bg-[#059669] border-[#059669]"
              : "border-slate-500 hover:border-[#059669]"
          }`}
        >
          {task.completed && (
            <FaCheck className="text-white text-sm" strokeWidth={3} />
          )}
        </div>

        <span
          className={`text-sm sm:text-base transition-all duration-200 ${
            task.completed ? "text-slate-500 line-through" : "text-slate-200"
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="text-xs text-slate-500 ml-2">
        {new Date(task.createdAt).toLocaleTimeString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="shrink-0 text-slate-500 hover:text-rose-500 transition-colors p-2 rounded-md hover:bg-slate-800/50 ml-2"
        title="Delete task"
      >
        <FaTrashAlt className="text-lg" />
      </button>
    </div>
  );
};

export default TodoItem;
