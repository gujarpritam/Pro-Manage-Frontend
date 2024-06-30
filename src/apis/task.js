import axios from "axios";

export const saveTask = async ({
  title,
  priority,
  assignedTo,
  queue,
  tasks,
  checkedTasks,
  checkedNumber,
  dueDate,
  user,
}) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/add`;
    console.log(dueDate);

    const response = await axios.post(reqUrl, {
      title,
      priority,
      assignedTo,
      queue,
      tasks,
      checkedTasks,
      checkedNumber,
      dueDate,
      user,
    });

    localStorage.setItem("isTaskCreated", response?.data?.isTaskCreated);
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (filter) => {
  try {
    console.log(filter);
    const reqUrl = `${
      process.env.REACT_APP_BACKEND_URL
    }/task/getTask?category=${filter || ""}`;

    const response = await axios.get(reqUrl);
    console.log(response?.data?.data);
    console.log(typeof response?.data?.data);

    let result = Array.from(response?.data?.data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskQueueById = async (taskId, queue) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/updateQueue?id=${
      taskId || ""
    }&queue=${queue || ""}`;

    // const token = localStorage.getItem("swiptoryToken");

    // axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl);

    if (response?.data?.updated === true) {
      // let trigger = localStorage.getItem("trigger");
      // console.log(trigger);
      // if (trigger == 1) {
      //   localStorage.setItem("trigger", 0);
      // } else {
      //   localStorage.setItem("trigger", 1);
      // }
      localStorage.setItem("queue", queue);
    }
    return response?.data?.updated;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTaskById = async (taskId) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/getOne?id=${
      taskId || ""
    }`;

    const response = await axios.get(reqUrl);
    // console.log(response?.data);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/update?id=${
      id || ""
    }`;

    const response = await axios.put(reqUrl, taskData);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    console.log(id);
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/delete?id=${
      id || ""
    }`;

    const response = await axios.delete(reqUrl);
    // console.log(response?.data?.data);
    // console.log(typeof response?.data?.data);

    // let result = Array.from(response?.data?.data);
    return response?.data?.isDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async () => {
  try {
    // console.log(filter);
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/getAnalyticsDetails`;

    const response = await axios.get(reqUrl);
    console.log(response?.data?.data);
    // console.log(typeof response?.data?.data);

    let result = response?.data?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (email) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/addUser?email=${
      email || ""
    }`;

    const response = await axios.post(reqUrl);

    return response?.data?.isUserCreated;
    // localStorage.setItem("isTaskCreated", response?.data?.isTaskCreated);
  } catch (error) {
    console.log(error);
  }
};

export const getAssignee = async () => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/getAssignee`;

    console.log("assignee");
    const response = await axios.get(reqUrl);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
