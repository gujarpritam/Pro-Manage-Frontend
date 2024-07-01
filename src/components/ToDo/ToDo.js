import React, { useEffect, useState } from "react";
import { getTask, updateTaskQueueById, fetchTaskById } from "../../apis/task";
import styles from "./ToDo.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import plus from "../../assets/icons/plus.png";
import dots from "../../assets/icons/dots.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import arrowUp from "../../assets/icons/arrow-up.png";
import lowPriorityImg from "../../assets/icons/green_circle.png";
import moderatePriorityImg from "../../assets/icons/blue_circle.png";
import highPriorityImg from "../../assets/icons/pink_circle.png";
import Task from "../Task/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Delete from "../Delete/Delete";

function ToDo({ trigger, setTrigger, timeStamp }) {
  const [task, setTask] = useState(0);
  const [toDoTask, setToDoTask] = useState([]);
  const [checkedNumber, setCheckedNumber] = useState(0);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState("");
  const [checklistVisibility, setChecklistVisibility] = useState([]);
  const [collapseAllVal, setCollapseAllVal] = useState(1);
  const [popUp, setPopUp] = useState([]);
  const [taskDetails, setTaskDetails] = useState({});
  const [deleteVal, setDeleteVal] = useState(0);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
    const result = await getTask("todo", timeStamp);
    setToDoTask(result);

    let array = [];
    let popUpArray = [];
    for (let i = 0; i < result?.length; i++) {
      array.push(0);
      popUpArray.push(false);
    }
    console.log(array);
    setChecklistVisibility([...array]);
    setPopUp([...popUpArray]);
  };

  useEffect(() => {
    const today = new Date();
    setMonth(months[today.getMonth()]);

    fetchToDo();
  }, []);

  useEffect(() => {
    fetchToDo();
  }, [task, trigger, timeStamp]);

  useEffect(() => {
    handleCollapseAll();
  }, [collapseAllVal]);

  const handleCheckbox = (event, taskIndex, checklistIndex) => {
    // setIsFormChecked(event.target.checked);
    let checkedTasks = toDoTask[taskIndex]?.checkedTasks;
    let checkedNumber = toDoTask[taskIndex].checkedNumber;

    if (event.target.checked === true) {
      checkedTasks[checklistIndex] = true;
      checkedNumber = checkedNumber + 1;
      // setCheckedNumber(checkedNumber + 1);
    } else {
      checkedTasks[checklistIndex] = false;
      checkedNumber = checkedNumber - 1;
      // setCheckedNumber(checkedNumber - 1);
    }

    console.log(checkedTasks);
    let toDoTaskObj = toDoTask[taskIndex];
    toDoTaskObj = {
      ...toDoTaskObj,
      ["checkedTasks"]: checkedTasks,
      ["checkedNumber"]: checkedNumber,
    };

    let toDoTaskArr = toDoTask;
    toDoTaskArr[taskIndex] = toDoTaskObj;
    setToDoTask([...toDoTaskArr]);
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

  const fetchTask = async (taskId) => {
    console.log(taskId);
    let result = await fetchTaskById(taskId);
    console.log(result);
    setTaskDetails(result);
    setTask(1);
  };

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteVal(1);
  };

  // const shareTask = (taskId) => {
  //   console.log(taskId);
  //   let link = "http://localhost:3000/view-task/" + taskId;
  //   console.log(link);
  //   setTaskLink(link);
  // };

  console.log(collapseAllVal);
  console.log(checklistVisibility);
  console.log(toDoTask);
  console.log(day);
  console.log(month);
  console.log(popUp);
  // console.log(toDoTask?.createdAt);
  console.log(timeStamp);

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
                  <span>
                    {item?.priority === "low" && <img src={lowPriorityImg} />}
                    {item?.priority === "moderate" && (
                      <img src={moderatePriorityImg} />
                    )}
                    {item?.priority === "high" && <img src={highPriorityImg} />}
                    <span className={styles.priority}>
                      {item?.priority.toUpperCase()} PRIORITY
                    </span>
                    <span>
                      {item?.assignedTo ? (
                        <span
                          title={item?.assignedTo}
                          className={styles.assignedTo}
                        >
                          {item?.assignedTo?.slice(0, 2).toUpperCase()}
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </span>
                  <img src={dots} onClick={() => openPopUp(index)} />
                </div>

                {popUp[index] === true && (
                  <div className={styles.popUp}>
                    <button
                      className={styles.edit}
                      onClick={() => fetchTask(item?._id)}
                    >
                      Edit
                    </button>

                    <CopyToClipboard
                      text={`https://pro-manage-frontend-rho.vercel.app/view-task/${item._id}`}
                      onCopy={() =>
                        toast("Link Copied", {
                          position: "top-right",
                          autoClose: 4000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        })
                      }
                    >
                      <button
                        className={styles.share}
                        // onClick={() => shareTask(item?._id)}
                      >
                        Share
                      </button>
                    </CopyToClipboard>

                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(item?._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {item?.title?.length < 20 ? (
                  <h4 className={styles.boxTwo}>{item?.title}</h4>
                ) : (
                  <h4 className={styles.boxTwo} title={item?.title}>
                    {item?.title?.slice(0, 19)}...
                  </h4>
                )}

                <div className={styles.checklist}>
                  <span>
                    Checklist ({item?.checkedNumber} / {item?.tasks.length})
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
                  {item?.tasks.map((subItem, i) => {
                    return (
                      <div className={styles.taskBox}>
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckbox(e, index, i)}
                          name="checkbox"
                          // id={item}
                          checked={item?.checkedTasks[i]}
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

      {task === 1 && <Task setTask={setTask} taskDetails={taskDetails} />}
      {deleteVal === 1 && (
        <Delete
          setDeleteVal={setDeleteVal}
          taskToDelete={taskToDelete}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default ToDo;
