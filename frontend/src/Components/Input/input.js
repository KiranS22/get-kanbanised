import React from "react";

import { useState } from "react";
import { taskPost } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTasks } from "../../Redux/features/Slices/Tasks/tasks";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
const Input = () => {
  const mode = useSelector(selectTheme);
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTask("");
    const data = await taskPost(task);
    console.log("task data in frontend", data);
    const { status } = data;
    if (status === "success") {
      dispatch(fetchAllTasks());
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label id={`label-${mode}`} className="mt-4" htmlFor="task">
        Task:
      </label>
      <input
        type="text"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add Task"
        className="mt-4"
      />
    </form>
  );
};

export default Input;
