import React, { useEffect, useState } from "react";
import { getTask, updateTaskQueueById } from "../../apis/task";
import styles from "./ToDo.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import plus from "../../assets/icons/plus.png";
import dots from "../../assets/icons/dots.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import arrowUp from "../../assets/icons/arrow-up.png";
import Task from "../Task/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToDo({ trigger, setTrigger }) {
  const [task, setTask] = useState(0);
  const [toDoTask, setToDoTask] = useState([]);
  const [checkedNumber, setCheckedNumber] = useState(0);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState("");
  const [checklistVisibility, setChecklistVisibility] = useState([]);
  const [collapseAllVal, setCollapseAllVal] = useState(1);
  const [popUp, setPopUp] = useState([]);

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

  const addTask = () => {
    setTask(1);
  };

  const fetchToDo = async () => {
    const result = await getTask("todo");
    setToDoTask(result);

    let array = [];
    let popUpArray = [];
    for (let i = 0; i < result.length; i++) {
      array.push(0);
      popUpArray.push(false);
    }
    console.log(array);
    setChecklistVisibility([...array]);
    setPopUp([...popUp]);
  };

  useEffect(() => {
    const today = new Date();
    setMonth(months[today.getMonth()]);

    fetchToDo();
  }, []);

  useEffect(() => {
    // let isTaskCreated = localStorage.getItem("isTaskCreated");
    fetchToDo();
  }, [task, trigger]);

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

  const openPopUp = (index) => {
    let popUpArray = popUp;
    popUpArray[index] = !popUp[index];
    setPopUp([...popUpArray]);
  };

  console.log(collapseAllVal);
  console.log(checklistVisibility);
  console.log(toDoTask);
  console.log(day);
  console.log(month);
  console.log(popUp);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>To Do</h5>
        <div className={styles.imgBox}>
          <img className={styles.plusImg} src={plus} onClick={addTask} />
          <img
            src={collapseAll}
            onClick={() => {
              collapseAllVal === 1
                ? setCollapseAllVal(0)
                : setCollapseAllVal(1);
            }}
          />
        </div>
      </div>

      <div className={styles.taskContainer}>
        {toDoTask?.map((item, index) => {
          return (
            <div className={styles.task}>
              <div className={styles.innerBox}>
                <div className={styles.boxOne}>
                  <span>{item?.priority.toUpperCase()} PRIORITY</span>
                  <img src={dots} onClick={() => openPopUp(index)} />
                </div>
                {popUp[index] === true && (
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
                      onClick={() => changeQueue(item?._id, "backlog")}
                    >
                      BACKLOG
                    </span>
                    <span
                      className={styles.taskStatus}
                      onClick={() => changeQueue(item?._id, "progress")}
                    >
                      PROGRESS
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

      {task === 1 && <Task setTask={setTask} />}
      <ToastContainer />
    </div>
  );
}

export default ToDo;
