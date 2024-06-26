import React from "react";
import styles from "./Backlog.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";

function Backlog() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>Backlog</h5>
        <img src={collapseAll} />
      </div>
    </div>
  );
}

export default Backlog;
