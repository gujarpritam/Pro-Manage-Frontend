import React, { useEffect, useState } from "react";
import { saveTask } from "../../apis/task";
import styles from "./Task.module.css";
import pinkCircle from "../../assets/icons/pink_circle.png";
import greenCircle from "../../assets/icons/green_circle.png";
import blueCircle from "../../assets/icons/blue_circle.png";
import plus from "../../assets/icons/plus.png";
import del from "../../assets/icons/delete.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import task from "../../../../pro-manage-backend/models/task";

function Task({ setTask }) {
  const [checklistArr, setChecklistArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedNumber, setCheckedNumber] = useState(0);
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    assignedTo: "",
    queue: "todo",
    tasks: [],
    dueDate: null,
    user: email,
  });

  useEffect(() => {
    localStorage.removeItem("isTaskCreated");
  }, []);

  const addTask = () => {
    let arr = checklistArr;
    let tasks = taskData.tasks;

    if (arr.length === 0) {
      arr.push(0);
    } else {
      console.log("arr.at(-1)", arr.at(-1));
      arr.push(arr.at(-1) + 1);
    }
    console.log("arr", arr);
    tasks.push("");
    setTaskData({ ...taskData, ["tasks"]: tasks });
    setChecklistArr([...arr]);
  };

  const handleCheckbox = (event) => {
    // setIsFormChecked(event.target.checked);
    if (event.target.checked === true) {
      setCheckedNumber(checkedNumber + 1);
    } else {
      setCheckedNumber(checkedNumber - 1);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTaskData({ ...taskData, ["title"]: e.target.value });
    }
    if (e.target.name === "priority") {
      setTaskData({ ...taskData, ["priority"]: e.target.id });

      if (e.target.id === "high") {
        document
          .getElementById("high")
          .setAttribute("style", `background: #EEECEC;`);
        document
          .getElementById("low")
          .setAttribute("style", `background: none;`);
        document
          .getElementById("moderate")
          .setAttribute("style", `background: none;`);
      }
      if (e.target.id === "moderate") {
        document
          .getElementById("moderate")
          .setAttribute("style", `background: #EEECEC;`);
        document
          .getElementById("low")
          .setAttribute("style", `background: none;`);
        document
          .getElementById("high")
          .setAttribute("style", `background: none;`);
      }
      if (e.target.id === "low") {
        document
          .getElementById("low")
          .setAttribute("style", `background: #EEECEC;`);
        document
          .getElementById("moderate")
          .setAttribute("style", `background: none;`);
        document
          .getElementById("high")
          .setAttribute("style", `background: none;`);
      }
    }
  };

  const deleteTask = (item) => {
    let arr = checklistArr;
    arr = Array.from(arr);

    arr.splice(item, 1);
    for (let index = item; index < arr.length; index++) {
      arr[index] = arr[index] - 1;
    }
    console.log("arr", arr);
    setChecklistArr([...arr]);

    let taskArray = taskData.tasks;
    taskArray.splice(item, 1);

    setTaskData({ ...taskData, ["tasks"]: taskArray });
  };

  const handleTaskChange = (e, item) => {
    if (e.target.name === "task") {
      let taskArr = taskData.tasks;
      taskArr[item] = e.target.value;

      setTaskData({ ...taskData, ["tasks"]: taskArr });
    }
  };

  const handleCancel = () => {
    setTask(0);
  };

  const chooseDate = (d) => {
    d = String(d);
    console.log(d);

    let dateArray = d.split(" ");
    console.log(dateArray);

    let str = dateArray[1] + " " + dateArray[2];
    console.log(str);

    setTaskData({ ...taskData, ["dueDate"]: str });
  };

  const handleSubmit = async () => {
    console.log(taskData);
    if (taskData?.title.length === 0) {
      toast("Please enter the title", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (taskData?.priority.length === 0) {
      toast("Please enter the priority", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (taskData?.tasks.length === 0 || taskData?.tasks[0].length === 0) {
      toast("Please enter the first task", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    for (let val of taskData?.tasks) {
      if (val.length === 0) {
        toast("Tasks can't be empty", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }

    // if (selectedDate !== null) {
    //   console.log(typeof String(selectedDate));
    // }

    console.log(taskData);
    const result = await saveTask(taskData);
    setTask(0);
  };

  // const selectDate = (e) => {
  //   let d = e.target.value;
  //   let arr = d.split("-");
  //   let str = "";

  //   console.log(arr);
  //   str = arr[1] + "/" + arr[2] + "/" + arr[0];
  //   console.log(str);

  //   setTaskData({ ...taskData, ["dueDate"]: str });
  // };

  console.log(taskData);
  console.log(checklistArr);
  console.log(typeof checklistArr);
  // console.log(selectedDate);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <label className={styles.label}>
            Title <span className={styles.asterisk}>*</span>
          </label>

          <input
            className={styles.input}
            name="title"
            id="title"
            placeholder="Enter Task Title"
            value={taskData.title}
            onChange={handleChange}
            type={"text"}
          ></input>

          <div className={styles.priorityBox}>
            <label className={styles.label}>
              Select Priority <span className={styles.asterisk}>*</span>
            </label>
            <button
              className={styles.button}
              name="priority"
              id="high"
              onClick={handleChange}
            >
              <img src={pinkCircle} className={styles.pinkCircle} />
              HIGH PRIORITY
            </button>

            <button
              className={styles.button}
              name="priority"
              id="moderate"
              onClick={handleChange}
            >
              <img src={blueCircle} className={styles.blueCircle} />
              MODERATE PRIORITY
            </button>

            <button
              className={styles.button}
              name="priority"
              id="low"
              onClick={handleChange}
            >
              <img src={greenCircle} className={styles.greenCircle} />
              LOW PRIORITY
            </button>
          </div>

          <label className={styles.label}>
            Checklist ({checkedNumber}/{checklistArr.length})
            <span className={styles.asterisk}>*</span>
          </label>

          <div className={styles.checklistBox}>
            {checklistArr?.map((item) => {
              return (
                <div key={item} className={styles.task}>
                  <span className={styles.taskBox}>
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name="checkbox"
                      id={item}
                      className={styles.checkbox}
                    />

                    <input
                      className={styles.taskInput}
                      name="task"
                      value={taskData.tasks[item]}
                      onChange={(e) => handleTaskChange(e, item)}
                      type={"text"}
                      placeholder="Add a Task"
                    ></input>
                  </span>
                  <img src={del} onClick={() => deleteTask(item)} />
                </div>
              );
            })}

            <button className={styles.addNew} onClick={addTask}>
              <img className={styles.plusImg} src={plus} />
              Add New
            </button>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Datepicker
            placeholderText="Select Due Date"
            selected={taskData.dueDate}
            onChange={(date) => chooseDate(date)}
          />
          <span className={styles.buttons}>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.save} onClick={handleSubmit}>
              Save
            </button>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Task;
