import React from "react";
import styles from "./InProgress.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";

function InProgress() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>In Progress</h5>
        <img src={collapseAll} />
      </div>
    </div>
  );
}

export default InProgress;
