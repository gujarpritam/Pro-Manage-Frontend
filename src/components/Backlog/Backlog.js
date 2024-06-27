import React, { useEffect, useState } from "react";
import { getTask, updateTaskQueueById } from "../../apis/task";
import styles from "./Backlog.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import plus from "../../assets/icons/plus.png";
import dots from "../../assets/icons/dots.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import arrowUp from "../../assets/icons/arrow-up.png";
import Task from "../Task/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Backlog() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>Backlog</h5>
      </div>
    </div>
  );
}

export default Backlog;

{
  /* <img
          src={collapseAll}
          onClick={() => {
            collapseAllVal === 1 ? setCollapseAllVal(0) : setCollapseAllVal(1);
          }}
        /> */
}
