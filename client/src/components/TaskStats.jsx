const TaskStats = ({ completedTasks, totalTasks }) => {
  return (
    <div>
      <h2>Tasks</h2>
      {completedTasks} of {totalTasks} Completed
    </div>
  );
};

export default TaskStats;
