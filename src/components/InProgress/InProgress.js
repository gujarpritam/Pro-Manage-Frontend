import React, { useEffect, useState } from "react";
import { getTask, updateTaskQueueById } from "../../apis/task";
import styles from "./InProgress.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import dots from "../../assets/icons/dots.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import arrowUp from "../../assets/icons/arrow-up.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InProgress({ trigger, setTrigger }) {
  const [progressTask, setProgressTask] = useState([]);
  const [checkedNumber, setCheckedNumber] = useState(0);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState("");
  const [checklistVisibility, setChecklistVisibility] = useState([]);
  const [collapseAllVal, setCollapseAllVal] = useState(1);
  const [popUp, setPopUp] = useState(false);

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

  const fetchProgress = async () => {
    const result = await getTask("progress");
    setProgressTask(result);

    let array = [];
    for (let i = 0; i < result.length; i++) {
      array.push(0);
    }
    console.log(array);
    setChecklistVisibility([...array]);
  };

  useEffect(() => {
    const today = new Date();
    setMonth(months[today.getMonth()]);

    fetchProgress();
  }, []);

  useEffect(() => {
    // let isTaskCreated = localStorage.getItem("isTaskCreated");
    console.log(trigger);
    fetchProgress();
  }, [trigger]);

  useEffect(() => {
    handleCollapseAll();
  }, [collapseAllVal]);

  const handleCheckbox = (event) => {
    // setIsFormChecked(event.target.checked);
    if (event.target.checked === true) {
      setCheckedNumber(checkedNumber + 1);
    } else {
      setCheckedNumber(checkedNumber - 1);
    }
  };

  const handleCollapseAll = () => {
    let array = [];
    if (collapseAllVal === 1) {
      for (let i = 0; i < checklistVisibility?.length; i++) {
        array.push(0);
      }
    } else {
      for (let i = 0; i < checklistVisibility?.length; i++) {
        array.push(1);
      }
    }
    setChecklistVisibility([...array]);
  };

  const changeQueue = async (id, queue) => {
    console.log(id, queue);

    let result = await updateTaskQueueById(id, queue);
    if (result === true) {
      setTrigger(!trigger);
    }
  };

  const openPopUp = () => {
    setPopUp(!popUp);
  };

  console.log(collapseAllVal);
  console.log(checklistVisibility);
  console.log(progressTask);
  console.log(day);
  console.log(month);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>In Progress</h5>
        <img
          src={collapseAll}
          onClick={() => {
            collapseAllVal === 1 ? setCollapseAllVal(0) : setCollapseAllVal(1);
          }}
        />
      </div>

      <div className={styles.taskContainer}>
        {progressTask?.map((item, index) => {
          return (
            <div className={styles.task}>
              <div className={styles.innerBox}>
                <div className={styles.boxOne}>
                  <span>{item?.priority.toUpperCase()} PRIORITY</span>
                  <img src={dots} onClick={openPopUp} />
                </div>

                {popUp === true && (
                  <div className={styles.popUp}>
                    <button className={styles.edit}>Edit</button>
                    <button className={styles.share}>Share</button>
                    <button className={styles.delete}>Delete</button>
                  </div>
                )}

                <h4 className={styles.boxTwo}>{item?.title}</h4>
                <div className={styles.checklist}>
                  <span>
                    Checklist ({checkedNumber} / {item?.tasks.length})
                  </span>
                  {checklistVisibility[index] === 0 ? (
                    <img
                      src={arrowDown}
                      onClick={() => {
                        let array = checklistVisibility;
                        array[index] = 1;
                        setChecklistVisibility([...array]);
                      }}
                    />
                  ) : (
                    <img
                      src={arrowUp}
                      onClick={() => {
                        let array = checklistVisibility;
                        array[index] = 0;
                        setChecklistVisibility([...array]);
                      }}
                    />
                  )}
                </div>

                <div
                  className={styles.taskList}
                  style={{
                    display:
                      checklistVisibility[index] === 0 ? "none" : "block",
                  }}
                >
                  {item?.tasks.map((subItem) => {
                    return (
                      <div className={styles.taskBox}>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          name="checkbox"
                          // id={item}
                          className={styles.checkbox}
                        />

                        <p
                          className={styles.taskInput}
                          name="task"
                          type={"text"}
                        >
                          {subItem}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.dueDate}>
                  {item?.dueDate !== null ? (
                    <span
                      style={{
                        background:
                          months.indexOf(item?.dueDate?.split(" ")[0]) <
                            months.indexOf(month) ||
                          (months.indexOf(item?.dueDate?.split(" ")[0]) ===
                            months.indexOf(month) &&
                            Number(item?.dueDate?.split(" ")[1]) < day)
                            ? "#CF3636"
                            : "#DBDBDB",
                        color:
                          months.indexOf(item?.dueDate?.split(" ")[0]) <
                            months.indexOf(month) ||
                          (months.indexOf(item?.dueDate?.split(" ")[0]) ===
                            months.indexOf(month) &&
                            Number(item?.dueDate?.split(" ")[1]) < day)
                            ? "white"
                            : "black",
                      }}
                      className={styles.dateStatus}
                    >
                      {item?.dueDate}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <span className={styles.statusBox}>
                    <span
                      className={styles.taskStatus}
                      onClick={() => changeQueue(item?._id, "todo")}
                    >
                      TO-DO
                    </span>
                    <span
                      className={styles.taskStatus}
                      onClick={() => changeQueue(item?._id, "backlog")}
                    >
                      BACKLOG
                    </span>
                    <span
                      className={styles.taskStatus}
                      onClick={() => changeQueue(item?._id, "done")}
                    >
                      DONE
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
}

export default InProgress;
