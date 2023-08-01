const express = require("express");
const taskRouter = express.Router();
const pool = require("../../db");
//Get all tasks
taskRouter.get("/", async (req, res) => {
  try {
    const alltasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY  id DESC",
      [req.user.id]
    );
    res.status(200).send(alltasks.rows);
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: "error", message: err.message });
  }
});

//Add a new tasks
taskRouter.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks(task_name, user_id, status) VALUES($1, $2, $3) RETURNING *",
      [task, req.user.id, "todo"]
    );
    console.log("new task", newTask);
    res.status(200).send({ status: "success", task: newTask.rows[0] });
  } catch (err) {
    res.status(401).send({ status: "error", message: err.message });
  }
});

//update single tasks status
taskRouter.put("/update-status/:id", async (req, res) => {
  try {
    const { task } = req.body;
    const { id } = req.params;

    const updatetask = await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2",
      [task.status, id]
    );
    res.status(200).send({
      status: "success",
      message: "Task Status  Updated Successfully!",
    });
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

//update single tasks content
taskRouter.put("/update-info/:id", async (req, res) => {
  try {
    const { task } = req.body;
    const { id } = req.params;

    const updatetask = await pool.query(
      "UPDATE tasks SET task_name = $1 WHERE id = $2",
      [task, id]
    );
    res.status(200).send({
      status: "success",
      message: "Task Content Updated Successfully!",
    });
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});
// Delete a single task from database
taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("backend id", id);

  try {
    const deletedProduct = await pool.query(
      "DELETE FROM  tasks WHERE id = $1",
      [id]
    );
    res
      .status(200)
      .send({ status: "success", message: "Task deleted Successfully" });
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

module.exports = taskRouter;
