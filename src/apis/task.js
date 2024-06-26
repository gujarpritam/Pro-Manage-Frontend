import axios from "axios";

export const saveTask = async ({
  title,
  priority,
  assignedTo,
  queue,
  tasks,
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
      dueDate,
      user,
    });

    localStorage.setItem("isTaskCreated", response?.data?.isTaskCreated);
  } catch (error) {
    console.log(error);
  }
};

export const getToDoTask = async (filter) => {
  try {
    console.log(filter);
    const reqUrl = `${
      process.env.REACT_APP_BACKEND_URL
    }/task/getToDo?category=${filter || ""}`;

    // const response = await axios.get(reqUrl);

    // return response?.data;
  } catch (error) {
    console.log(error);
  }
};
