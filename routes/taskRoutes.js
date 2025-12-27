const express = require("express");
const router = express.Router();

let tasks = require("../mockData/taskData");

// Get all tasks
router.get("/", (req, res) => {
  console.log("Fetching all tasks");
  res.json(tasks);
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

router.post("/", (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log("Creating task:", title);
    console.log("Description:", description);
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both Title and Description are required",
      });
    }
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => parseInt(t.id))) + 1 : 1;
    const newTask = {
      id: newId,
      title,
      description: description || "",
      completed: false,
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
    const { title, description, completed } = req.body;
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
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
