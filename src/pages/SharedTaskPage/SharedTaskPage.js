import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskById } from "../../apis/task";
import styles from "./SharedTaskPage.module.css";
import codesandbox from "../../assets/icons/codesandbox.png";
import SharedTask from "../../components/SharedTask/SharedTask";

function SharedTaskPage() {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState({});
  console.log(id);

  const fetchTask = async (taskId) => {
    console.log(taskId);
    let result = await fetchTaskById(taskId);
    console.log(result);
    setTaskDetails(result);
  };

  useEffect(() => {
    fetchTask(id);
  }, []);

  console.log(taskDetails);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={codesandbox} />
        <h1 className={styles.heading}>Pro Manage</h1>
      </div>

      <SharedTask taskDetails={taskDetails} />
    </div>
  );
}

export default SharedTaskPage;
