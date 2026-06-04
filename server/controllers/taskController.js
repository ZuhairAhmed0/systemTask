import prisma from "../config/prisma.js"

//@desc   Get all tasks
//@route  GET /api/tasks
export const getTasks = async (req, res, next) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (tasks.length === 0) {
    const error = new Error("Tasks list is empty");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(tasks);
};

//@desc   Add a new task
//@route  POST /api/tasks
export const addNewTask = async (req, res, next) => {
  const title = req.body.title;

  if (!title) {
    const err = new Error("Task title is required");
    err.status = 400;
    return next(err);
  }

  const newTask = await prisma.task.create({
    data: {
      title,
      userId: req.user.id,
    },
  });

  if (!newTask) {
    const error = new Error("Failed to create task");
    error.status = 500;
    return next(error);
  }
  res.status(201).json(newTask);
};

//@desc   Update a task
//@route  PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  const id = req.params.id;

  // Validate ID format
  if (!id) {
    const error = new Error("Invalid task ID");
    error.status = 400;
    return next(error);
  }

  const currentTask = await prisma.task.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      completed: true,
      userId: true,
    },
  });

  if (!currentTask) {
    const error = new Error(`Task with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  if (currentTask.userId !== req.user.id) {
    const error = new Error("Unauthorized");
    error.status = 403;
    return next(error);
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: currentTask.id,
    },
    data: {
      completed: !currentTask.completed,
    },
  });

  res.status(200).json(updatedTask);
};

//@desc   Delete a task
//@route  DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  const id = req.params.id;

  // Validate ID format
  if (!id) {
    const error = new Error("Invalid task ID");
    error.status = 400;
    return next(error);
  }

  const currentTask = await prisma.task.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      completed: true,
      userId: true,
    },
  });

  if (!currentTask) {
    const error = new Error(`Task with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  if (currentTask.userId !== req.user.id) {
    const error = new Error("Unauthorized");
    error.status = 403;
    return next(error);
  }
  const deletedTask = await prisma.task.delete({
    where: {
      id: id,
    },
  });

  if (!deletedTask) {
    const error = new Error(`Task with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(deletedTask);
};

//@desc   Clear completed tasks
//@route  DELETE /api/tasks/clear-completed
export const clearCompletedTasks = async (req, res, next) => {
  const deletedTasks = await prisma.task.deleteMany({
    where: {
      completed: true,
      userId: req.user.id,
    },
  });

  res.status(200).json(deletedTasks);
};
