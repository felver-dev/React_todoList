/* eslint-disable react/prop-types */

import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTasks,
  fetchAllTasks,
  removeTasks,
  readTasks,
  selectAllTodos,
  selectTodoStatus,
  restoreTasks,
} from "../redux/slices/todoSlice";
import { useEffect } from "react";

function TaskList() {
  const tasks = useSelector(selectAllTodos);
  const status = useSelector(selectTodoStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllTasks());
      console.log(tasks);
    }
  }, [status, dispatch, tasks]);

  const handleCompleteTask = (id) => {
    dispatch(completeTasks(id));
  };
  const handleRemoveTask = (id) => {
    dispatch(removeTasks(id));
  };
  const handleReadTask = (id) => {
    dispatch(readTasks(id));
  };
  const handleRestoreTask = (id) => {
    dispatch(restoreTasks(id));
  };

  return (
    <div className="tasksContainer">
      {tasks.map((task) => (
        <div
          className="tasks"
          style={{ background: task.isDeleted ? "#ddd" : "#ceceff" }}
          key={task.id}
        >
          <div className="task-header">
            <h1
              style={{
                textDecoration: task.isDeleted ? "line-through" : "",
                color: "#111",
                overflow: "hidden",
              }}
              className="title"
            >
              {task.title}
            </h1>
            <span
              onClick={() => handleCompleteTask(task.id)}
              className="check"
              style={{ color: task.IsCompleted ? "#034ac5" : "#666" }}
            >
              Finir
              <Icon
                width="22"
                color={task.isCompleted ? "#034ac5" : "#666"}
                icon="lucide:circle-check-big"
              />
            </span>
          </div>
          <p style={{ overflow: "scroll" }} className="description">
            {" "}
            {task.description}{" "}
          </p>
          <div className="btns">
            <div onClick={() => handleRemoveTask(task.id)}>
              Supprimer
              <Icon
                width="16"
                color={task.isDeleted ? "#666" : "red"}
                icon="fluent-mdl2:delete"
              />
            </div>
            <div
              disabled={task.isDeleted ? true : false}
              onClick={() => handleReadTask(task.id)}
            >
              Marquer comme lue
              <Icon
                width="16"
                color={task.isRead ? "#034ac5" : "#666"}
                icon="fa-solid:book-reader"
              />
            </div>
          </div>

          <div
            onClick={() => {
              handleRestoreTask(task.id);
            }}
            className="restoreBtn"
          >
            Restaurer
            <Icon width="22" icon="ic:twotone-restore" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
