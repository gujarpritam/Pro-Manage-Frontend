import axios from "axios";

export const registerUser = async ({ name, email, password }) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/register`;
    console.log(name);
    console.log(email);
    console.log(password);

    const response = await axios.post(reqUrl, { name, email, password });

    let result;

    if (response?.data?.email) {
      result = response?.data?.email;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

    console.log(email);
    console.log(password);

    const response = await axios.post(reqUrl, { email, password });

    localStorage.setItem("proManageToken", response?.data?.proManageToken);
    localStorage.setItem("email", response?.data?.email);

    let result;
    if (response?.data?.email) {
      result = response?.data?.email;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
