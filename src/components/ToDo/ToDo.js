import React, { useEffect, useState } from "react";
import { getToDoTask } from "../../apis/task";
import styles from "./ToDo.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import plus from "../../assets/icons/plus.png";
import Task from "../Task/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToDo() {
  const [task, setTask] = useState(0);

  const addTask = () => {
    setTask(1);
  };

  const fetchToDo = async () => {
    const result = await getToDoTask("todo");
  };

  useEffect(() => {
    let isTaskCreated = localStorage.getItem("isTaskCreated");
    fetchToDo();
  }, [task]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>To Do</h5>
        <div className={styles.imgBox}>
          <img className={styles.plusImg} src={plus} onClick={addTask} />
          <img src={collapseAll} />
        </div>
      </div>
      {task === 1 && <Task setTask={setTask} />}
      <ToastContainer />
    </div>
  );
}

export default ToDo;
