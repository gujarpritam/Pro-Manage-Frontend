import React, { useState } from "react";
import styles from "./Register.module.css";
import { registerUser } from "../../apis/userAuth";
import email from "../../assets/icons/email.png";
import lock from "../../assets/icons/lock.png";
import name from "../../assets/icons/name.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ setAuth }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const changeRegister = () => {
    setAuth(0);
  };

  const handleSubmit = async () => {
    document
      .getElementsByClassName(styles.error)[0]
      .setAttribute("style", `display: none;`);
    document
      .getElementsByClassName(styles.error)[1]
      .setAttribute("style", `display: none;`);
    document
      .getElementsByClassName(styles.error)[2]
      .setAttribute("style", `display: none;`);
    document
      .getElementsByClassName(styles.error)[3]
      .setAttribute("style", `display: none;`);
    document
      .getElementsByClassName(styles.error)[4]
      .setAttribute("style", `display: none;`);

    if (!userData.name) {
      document
        .getElementsByClassName(styles.error)[0]
        .setAttribute("style", `display: flex;`);
      return;
    }

    if (!userData.email) {
      document
        .getElementsByClassName(styles.error)[1]
        .setAttribute("style", `display: flex;`);
      return;
    }

    if (!userData.password) {
      document
        .getElementsByClassName(styles.error)[2]
        .setAttribute("style", `display: flex;`);
      return;
    }

    if (!userData.confirmPassword) {
      document
        .getElementsByClassName(styles.error)[3]
        .setAttribute("style", `display: flex;`);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      document
        .getElementsByClassName(styles.error)[4]
        .setAttribute("style", `display: flex;`);
      return;
    }
    console.log(userData);
    const result = await registerUser(userData);
    console.log(result);

    if (result) {
      changeRegister();
    }

    toast("User already exists", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  console.log(userData);
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <img src={name} />
          <input
            className={styles.input}
            name="name"
            id="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleFormChange}
            type={"text"}
          ></input>
        </div>
        <p className={styles.error}>Name can't be empty</p>

        <div className={styles.inputBox}>
          <img src={email} />
          <input
            className={styles.input}
            name="email"
            id="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleFormChange}
            type={"email"}
          ></input>
        </div>
        <p className={styles.error}>Email can't be empty</p>

        <div className={styles.inputBox}>
          <img src={lock} />
          <input
            className={styles.input}
            name="password"
            id="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleFormChange}
            type={"password"}
          ></input>
        </div>
        <p className={styles.error}>Password can't be empty</p>

        <div className={styles.inputBox}>
          <img src={lock} />
          <input
            className={styles.input}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleFormChange}
            type={"password"}
          ></input>
        </div>
        <p className={styles.error}>Confirm Password can't be empty</p>
        <p className={styles.error}>Passwords are not matching</p>

        <button onClick={handleSubmit} className={styles.register}>
          Register
        </button>
        <p className={styles.text}>Have an account?</p>
        <button onClick={changeRegister} className={styles.login}>
          Log In
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
