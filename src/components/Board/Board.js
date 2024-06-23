import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import addPeople from "../../assets/icons/addPeople.png";

function Board() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const days = [
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

  useEffect(() => {
    const today = new Date();
    console.log(today);

    setDay(today.getDate());
    setMonth(days[today.getMonth()]);
    setYear(today.getFullYear());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.nameDisplay}>
        <span className={styles.welcomeMessage}>Welcome! {name}</span>
        <span className={styles.date}>
          {day} {month}, {year}
        </span>
      </div>

      <div className={styles.heading}>
        <div className={styles.board}>
          <h2>Board</h2>
          <span className={styles.addPeople}>
            <img src={addPeople} />
            Add People
          </span>
        </div>
      </div>

      <div className={styles.ticketContainer}>
        <div className={styles.subContainer}></div>
        <div className={styles.subContainer}></div>
        <div className={styles.subContainer}></div>
        <div className={styles.subContainer}></div>
      </div>
    </div>
  );
}

export default Board;
