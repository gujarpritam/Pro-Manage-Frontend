import React, { useEffect, useState } from "react";
import { saveTask, updateTask, getAssignee } from "../../apis/task";
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

function Task({ setTask, taskDetails, setTaskDetails }) {
  const [checklistArr, setChecklistArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [assignee, setAssignee] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "" || taskDetails?.title,
    priority: "" || taskDetails?.priority,
    assignedTo: "" || taskDetails?.assignedTo,
    queue: taskDetails?.queue || "todo",
    tasks: taskDetails?.tasks || [],
    dueDate: taskDetails?.dueDate || null,
    checkedTasks: taskDetails?.checkedTasks || [],
    checkedNumber: taskDetails?.checkedNumber || 0,
    user: taskDetails?.email || email,
  });

  useEffect(() => {
    localStorage.removeItem("isTaskCreated");

    if (taskData?.priority === "high") {
      document
        .getElementById("high")
        .setAttribute("style", `background: #EEECEC;`);
    }
    if (taskData?.priority === "moderate") {
      document
        .getElementById("moderate")
        .setAttribute("style", `background: #EEECEC;`);
    }
    if (taskData?.priority === "low") {
      document
        .getElementById("low")
        .setAttribute("style", `background: #EEECEC;`);
    }
    if (taskDetails?._id) {
      let checklist = [];
      for (let i = 0; i < taskDetails?.tasks.length; i++) {
        checklist.push(i);
      }
      setChecklistArr([...checklist]);
    }

    fetchAssignee();
  }, []);

  const addTask = () => {
    let arr = checklistArr;
    let tasks = taskData.tasks;
    let checkedTasks = taskData?.checkedTasks;

    if (arr.length === 0) {
      arr.push(0);
    } else {
      arr.push(arr.at(-1) + 1);
    }
    tasks.push("");
    checkedTasks.push(false);
    setTaskData({
      ...taskData,
      ["tasks"]: tasks,
      ["checkedTasks"]: checkedTasks,
    });
    setChecklistArr([...arr]);
  };

  const handleCheckbox = (event, item) => {
    let checkedTasks = taskData?.checkedTasks;
    let checkedNumber = taskData?.checkedNumber;

    if (event.target.checked === true) {
      checkedTasks[item] = true;
      checkedNumber = checkedNumber + 1;
    } else {
      checkedTasks[item] = false;
      checkedNumber = checkedNumber - 1;
    }
    setTaskData({
      ...taskData,
      ["checkedTasks"]: checkedTasks,
      ["checkedNumber"]: checkedNumber,
    });
  };

  const fetchAssignee = async () => {
    let result = await getAssignee();
    result = Array.from(result);

    setAssignee([...result]);
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
    let checkedNumber = taskData?.checkedNumber;

    arr.splice(item, 1);
    for (let index = item; index < arr.length; index++) {
      arr[index] = arr[index] - 1;
    }
    setChecklistArr([...arr]);

    let taskArray = taskData.tasks;
    taskArray.splice(item, 1);
    setTaskData({ ...taskData, ["tasks"]: taskArray });

    let checkedTasks = taskData?.checkedTasks;

    if (checkedTasks[item] === true) {
      checkedNumber = checkedNumber - 1;
    }

    checkedTasks.splice(item, 1);
    setTaskData({
      ...taskData,
      ["checkedTasks"]: [...checkedTasks],
      ["checkedNumber"]: checkedNumber,
    });
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
    setTaskDetails({});
  };

  const chooseDate = (d) => {
    d = String(d);

    let dateArray = d.split(" ");

    let str = dateArray[1] + " " + dateArray[2];

    setTaskData({ ...taskData, ["dueDate"]: str });
  };

  const handleAssigneeChange = (e) => {
    setTaskData({ ...taskData, ["assignedTo"]: e.target.value });
  };

  const handleSubmit = async () => {
    if (taskData?.title == null || taskData?.title?.length === 0) {
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

    if (taskData?.priority == null || taskData?.priority?.length === 0) {
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

    if (taskData?.tasks?.length === 0 || taskData?.tasks[0]?.length === 0) {
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

    if (taskDetails?._id) {
      await updateTask(taskDetails?._id, taskData);
      setTaskDetails({});
      setTask(0);
      return;
    }

    const result = await saveTask(taskData);
    setTaskDetails({});
    setTask(0);
  };

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

          <div className={styles.assignee}>
            <label className={styles.assigneeLabel} htmlFor="assignee">
              Assign to
            </label>

            {taskDetails?._id != null && taskDetails?.user != email ? (
              <select
                className={styles.selectAssignee}
                type="text"
                name="assignee"
                value={taskDetails?.assignedTo}
              >
                <option className={styles.option} disabled selected>
                  {taskDetails?.assignedTo}
                </option>
              </select>
            ) : (
              <select
                className={styles.selectAssignee}
                type="text"
                name="assignee"
                value={taskData?.assignedTo}
                onChange={(e) => handleAssigneeChange(e)}
              >
                <option className={styles.option} disabled selected>
                  Add a assignee
                </option>

                {assignee?.map((element) => (
                  <option className={styles.option}>{element?.email}</option>
                ))}
              </select>
            )}
          </div>

          <label className={styles.label}>
            Checklist ({taskData?.checkedNumber}/{checklistArr?.length})
            <span className={styles.asterisk}>*</span>
          </label>

          <div className={styles.checklistBox}>
            {checklistArr?.map((item, index) => {
              return (
                <div key={item} className={styles.task}>
                  <span className={styles.taskBox}>
                    <input
                      type="checkbox"
                      onChange={(event) => handleCheckbox(event, item)}
                      name="checkbox"
                      id={item}
                      checked={taskData?.checkedTasks[item]}
                      className={styles.checkbox}
                    />

                    <input
                      className={styles.taskInput}
                      name="task"
                      value={taskData?.tasks[item]}
                      onChange={(e) => handleTaskChange(e, item)}
                      type={"text"}
                      placeholder="Add a Task"
                    ></input>
                  </span>
                  <img src={del} onClick={() => deleteTask(item)} />
                </div>
              );
            })}
          </div>

          <button className={styles.addNew} onClick={addTask}>
            <img className={styles.plusImg} src={plus} />
            Add New
          </button>
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
