import React, { useEffect } from "react";
import Input from "../Input/input";
import Task from "../Tasks/Task";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTasks } from "../../Redux/features/Slices/Tasks/tasks";
import {
  selectTodoTasks,
  selectDoingTasks,
  selectDoneTasks,
  selectTaskCount,
} from "../../Redux/features/Slices/Tasks/tasks";
import { Droppable } from "react-beautiful-dnd";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);
  const mode = useSelector(selectTheme);
  const todoTasks = useSelector(selectTodoTasks);
  const doingTasks = useSelector(selectDoingTasks);
  const doneTasks = useSelector(selectDoneTasks);
  const taskCount = useSelector(selectTaskCount);


  return (
    <div className={` home-container-${mode}`}>
      <div className={`container  content-${mode}`}>
        <div className="text-center ">
          <Input />
        </div>
        <h3 className={`content-${mode}`}>{taskCount}</h3>
        <div className="row  mt-4">
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="col-12 col-sm-6 col-md-4 mt-4"
                id={`custom-border-${mode}-1`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <header className="heading" id={`heading-1-${mode}`}>
                  <h2>To Do</h2>
                </header>
                <div className="task-container ">
                  {todoTasks.map((task, index) => {
                    return <Task task={task} index={index} />;
                  })}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided) => (
              <div
                className="col-12 col-sm-6 col-md-4 mt-4"
                // id={`custom-border-${mode}-2`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <header className="heading" id={`heading-1-${mode}`}>
                  <h2>In Progress</h2>
                </header>
                <div className="task-container ">
                  {doingTasks.map((task, index) => {
                    return <Task task={task} index={index} />;
                  })}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="col-12 col-sm-6 col-md-4 mt-4"
                id={`custom-border-${mode}-3`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {" "}
                <header className="heading" id={`heading-3-${mode}`}>
                  <h2>Done</h2>
                </header>
                {doneTasks.map((task, index) => {
                  return <Task task={task} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default Home;
