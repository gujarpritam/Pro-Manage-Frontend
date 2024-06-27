import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/userAuth";
import styles from "./Login.module.css";
import email from "../../assets/icons/email.png";
import lock from "../../assets/icons/lock.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setAuth }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    document
      .getElementsByClassName(styles.error)[0]
      .setAttribute("style", `display: none;`);
    document
      .getElementsByClassName(styles.error)[1]
      .setAttribute("style", `display: none;`);

    if (!formData.email) {
      document
        .getElementsByClassName(styles.error)[0]
        .setAttribute("style", `display: flex;`);
      return;
    }

    if (!formData.password) {
      document
        .getElementsByClassName(styles.error)[1]
        .setAttribute("style", `display: flex;`);
      return;
    }

    const result = await loginUser(formData);

    if (result) {
      console.log("logged in");
      localStorage.setItem("trigger", 0);
      navigate("/home");
      return;
    }

    toast("Invalid Credentials", {
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

  const changeLogin = () => {
    setAuth(1);
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <img src={email} />
          <input
            className={styles.input}
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleFormChange}
            type={"password"}
          ></input>
        </div>
        <p className={styles.error}>Password can't be empty</p>

        <button onClick={() => handleSubmit()} className={styles.login}>
          Log In
        </button>
        <p className={styles.text}>Have no account yet?</p>
        <button onClick={changeLogin} className={styles.register}>
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
