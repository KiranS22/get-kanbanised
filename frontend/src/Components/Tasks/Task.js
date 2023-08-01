import React, { useState } from "react";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { taskDelete, taskUpdateContent } from "../../utils/utils";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  updateContent,
  updateStatus,
} from "../../Redux/features/Slices/Tasks/tasks";

const Task = ({ task, index }) => {
  console.log("task", task);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(task.task_name);
  const dispatch = useDispatch();
  const handleEdit = async () => {
    setIsEdit(!isEdit);
  };

  const handleRemove = async (id) => {
    const data = await taskDelete(id);
    if (data.status === "success") {
      dispatch(deleteTask(id));
    }
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const data = await taskUpdateContent(content, id);
    if (data.status === "success") {
      setIsEdit(false);
      dispatch(updateContent({ content, id }));
    }
  };
  const mode = useSelector(selectTheme);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="card-body"
          id={`card-body-${mode}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="icons">
            <i
              className="fas fa-edit"
              id={`edit-${mode}`}
              onClick={(e) => handleEdit(e)}
            ></i>
            <i
              className="fa-solid fa-xmark"
              id={`remove-${mode}`}
              onClick={(e) => handleRemove(task.id)}
            ></i>
          </div>

          {isEdit ? (
            <form className="mt-3" onSubmit={(e) => handleSubmit(e, task.id)}>
              <input
                value={content}
                className="form-control"
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="text-end">
                <button
                  className={
                    mode == "light"
                      ? `btn btn-primary btn-sm my-2 text-end`
                      : `btn btn-outline-info btn-sm my-2 text-end`
                  }
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="card m-2 p-2" id={`card-${mode}`}>
              <p>{task.task_name}</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
