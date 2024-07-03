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

export const getTask = async (category, timeStamp, user) => {
  try {
    const reqUrl = `${
      process.env.REACT_APP_BACKEND_URL
    }/task/getTask?category=${category || ""}&timeStamp=${
      timeStamp || ""
    }&user=${user || ""}`;

    const response = await axios.get(reqUrl);

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

    const response = await axios.put(reqUrl);

    if (response?.data?.updated === true) {
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
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/delete?id=${
      id || ""
    }`;

    const response = await axios.delete(reqUrl);

    return response?.data?.isDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async (user) => {
  try {
    const reqUrl = `${
      process.env.REACT_APP_BACKEND_URL
    }/task/getAnalyticsDetails?user=${user || ""}`;

    const response = await axios.get(reqUrl);

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
  } catch (error) {
    console.log(error);
  }
};

export const getAssignee = async () => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/task/getAssignee`;

    const response = await axios.get(reqUrl);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
