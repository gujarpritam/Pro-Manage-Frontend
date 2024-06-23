import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import Board from "../../components/Board/Board";
import Analytics from "../../components/Analytics/Analytics";
import Settings from "../../components/Settings/Settings";
import codesandbox from "../../assets/icons/codesandbox.png";
import layout from "../../assets/icons/layout.png";
import database from "../../assets/icons/database.png";
import setting from "../../assets/icons/settings.png";
import logoutImg from "../../assets/icons/logout.png";
import Logout from "../../components/Logout/Logout";

function HomePage() {
  const [component, setComponent] = useState(1);
  const [logout, setLogout] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (component === 1) {
      document
        .getElementsByClassName(styles.box)[2]
        .setAttribute("style", "background:none;");
      document
        .getElementsByClassName(styles.box)[3]
        .setAttribute("style", "background:none;");
      document
        .getElementsByClassName(styles.box)[1]
        .setAttribute("style", "background:#D6EAF4;");
    }

    if (component === 2) {
      document
        .getElementsByClassName(styles.box)[1]
        .setAttribute("style", "background:none;");
      document
        .getElementsByClassName(styles.box)[3]
        .setAttribute("style", "background:none;");
      document
        .getElementsByClassName(styles.box)[2]
        .setAttribute("style", "background:#D6EAF4;");
    }

    if (component === 3) {
      document
        .getElementsByClassName(styles.box)[1]
        .setAttribute("style", "background:none;");
      document
        .getElementsByClassName(styles.box)[2]
        .setAttribute("style", "background:none;");
      document
        .getElementsByClassName(styles.box)[3]
        .setAttribute("style", "background:#D6EAF4;");
    }
  }, [component]);

  const handleLogout = () => {
    setLogout(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.subContainer}>
          <div className={styles.box}>
            <img src={codesandbox} />
            <h1 className={styles.heading}>Pro Manage</h1>
          </div>

          <div className={styles.box}>
            <img src={layout} />
            <button className={styles.button} onClick={() => setComponent(1)}>
              Board
            </button>
          </div>

          <div className={styles.box}>
            <img src={database} />
            <button className={styles.button} onClick={() => setComponent(2)}>
              Analytics
            </button>
          </div>

          <div className={styles.box}>
            <img src={setting} />
            <button className={styles.button} onClick={() => setComponent(3)}>
              Settings
            </button>
          </div>
        </div>

        <div className={styles.logout}>
          <img src={logoutImg} />
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {component === 1 && <Board />}
      {component === 2 && <Analytics />}
      {component === 3 && <Settings />}
      {logout === 1 && <Logout setLogout={setLogout} />}
    </div>
  );
}

export default HomePage;
