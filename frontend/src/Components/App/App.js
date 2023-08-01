import React, { useEffect, useState } from "react";
import Routing from "./Routing";
import "./App.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logInUser, selectUser } from "../../Redux/features/Slices/Auth/Auth";
import jwt_decode from "jwt-decode";
import { DragDropContext } from "react-beautiful-dnd";

// Importing Update Task
import { taskUpdateStatus } from "../../utils/utils";

import {
  fetchAllTasks,
  updateStatus,
} from "../../Redux/features/Slices/Tasks/tasks";
function App() {
  const mode = useSelector(selectTheme);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleDragEnd = async (result) => {
    const { draggableId: taskId, source, destination } = result;

    if (!destination) return;

    //if source.destinationId matches destination.destinationId

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    //if source.droppableId is progress
    // const destinatio
    if (destination.droppableId !== source.droppableId) {
      let updatedTask = { status: destination.droppableId };

      //API Request
      const data = await taskUpdateStatus(updatedTask, taskId);
      if (data.status === "success") {
    
        dispatch(updateStatus({ status: updatedTask.status, id: taskId }));
      }
    }

    //if source.droppableId is done
  };
  const getLoggedInUser = async () => {
    try {
      const validToken = localStorage.getItem("token");
      if (validToken) {
        const decoded = jwt_decode(validToken);
        dispatch(logInUser({ user: decoded, token: validToken }));
      }
    } catch (err) {
      console.log({ status: "Error", message: err.meesage });
    }
  };

  useEffect(() => {
    // async thunks
    getLoggedInUser();
    if (user !== null) {
      dispatch(fetchAllTasks());
    }
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div id={`body-bg-${mode}`}>
        <Routing />
      </div>
    </DragDropContext>
  );
}

export default App;
