import React from "react";
import styles from "./Done.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";

function Done() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>Done</h5>
        <img src={collapseAll} />
      </div>
    </div>
  );
}

export default Done;
