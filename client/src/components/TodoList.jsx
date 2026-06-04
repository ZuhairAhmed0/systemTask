import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onToggleTask, onDeleteTask }) => {

  return (
    <div className="mt-6">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
