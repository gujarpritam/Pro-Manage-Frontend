import React, { useEffect, useState } from "react";
import styles from "./SharedTask.module.css";
import lowPriorityImg from "../../assets/icons/green_circle.png";
import moderatePriorityImg from "../../assets/icons/blue_circle.png";
import highPriorityImg from "../../assets/icons/pink_circle.png";

function SharedTask({ taskDetails }) {
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState("");
  // const [checkedNumber, setCheckedNumber] = useState(0);
  // const [taskData, setTaskData] = useState({});

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const today = new Date();
    setMonth(months[today.getMonth()]);

    // setTaskData({ ...taskDetails });
  }, []);

  // const handleCheckbox = (event) => {
  //   if (event.target.checked === true) {
  //     setCheckedNumber(checkedNumber + 1);
  //   } else {
  //     setCheckedNumber(checkedNumber - 1);
  //   }
  // };

  // console.log(taskData);
  console.log(taskDetails);

  return (
    <div className={styles.task}>
      <div className={styles.innerBox}>
        <div className={styles.boxOne}>
          {taskDetails?.priority === "low" && <img src={lowPriorityImg} />}
          {taskDetails?.priority === "moderate" && (
            <img src={moderatePriorityImg} />
          )}
          {taskDetails?.priority === "high" && <img src={highPriorityImg} />}
          <span className={styles.priority}>
            {taskDetails?.priority?.toUpperCase()} PRIORITY
          </span>
        </div>

        <h4 className={styles.boxTwo}>{taskDetails?.title}</h4>
        <div className={styles.checklist}>
          <span>
            Checklist ({taskDetails?.checkedNumber} /{" "}
            {taskDetails?.tasks?.length})
          </span>
        </div>

        <div className={styles.checklistBox}>
          {taskDetails?.tasks?.map((subItem, index) => {
            return (
              <div className={styles.taskBox}>
                <input
                  type="checkbox"
                  // onChange={handleCheckbox}
                  name="checkbox"
                  // id={item}
                  checked={taskDetails?.checkedTasks[index]}
                  className={styles.checkbox}
                />

                <p className={styles.taskInput} name="task" type={"text"}>
                  {subItem}
                </p>
              </div>
            );
          })}
        </div>

        {taskDetails?.dueDate !== null ? (
          <div className={styles.dueDate}>
            <p className={styles.dateStyle}>Due Date</p>
            <span
              // style={{
              //   background:
              //     months.indexOf(taskDetails?.dueDate?.split(" ")[0]) <
              //       months.indexOf(month) ||
              //     (months.indexOf(taskDetails?.dueDate?.split(" ")[0]) ===
              //       months.indexOf(month) &&
              //       Number(taskDetails?.dueDate?.split(" ")[1]) < day)
              //       ? "#CF3636"
              //       : "#DBDBDB",
              //   color:
              //     months.indexOf(taskDetails?.dueDate?.split(" ")[0]) <
              //       months.indexOf(month) ||
              //     (months.indexOf(taskDetails?.dueDate?.split(" ")[0]) ===
              //       months.indexOf(month) &&
              //       Number(taskDetails?.dueDate?.split(" ")[1]) < day)
              //       ? "white"
              //       : "black",
              // }}
              className={styles.dateStatus}
            >
              {taskDetails?.dueDate}
            </span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default SharedTask;
