const express = require("express");
const router = express.Router();

let tasks = require("../mockData/taskData");

// Get all tasks
router.get("/", (req, res) => {
  console.log("Fetching all tasks");
  let filteredTasks = [...tasks];

  // Filter by completion status if provided
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === completed
    );
  }

  // Sort by creation date if requested
  if (req.query.sort === "createdAt") {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  res.json(filteredTasks);
});

// Get a specific task by ID
router.get("/:id", (req, res, next) => {
  try {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Get tasks by priority level
router.get("/priority/:level", (req, res, next) => {
  try {
    const { level } = req.params;
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority level. Must be low, medium, or high",
      });
    }
    const filteredTasks = tasks.filter((task) => task.priority === level);
    res.json(filteredTasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    console.log("Creating task:", title);
    console.log("Description:", description);
    console.log("Priority:", priority);
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both Title and Description are required",
      });
    }
    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority. Must be low, medium, or high",
      });
    }
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => parseInt(t.id))) + 1 : 1;
    const newTask = {
      id: newId.toString(),
      title,
      description: description || "",
      completed: false,
      priority: priority || "medium",
      createdAt: new Date(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id == req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    const { title, description, completed, priority } = req.body;
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    if (priority !== undefined) {
      const validPriorities = ["low", "medium", "high"];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority. Must be low, medium, or high",
        });
      }
      tasks[taskIndex].priority = priority;
    }
    res.json(tasks[taskIndex]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id == req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
