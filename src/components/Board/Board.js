import React, { useEffect, useState } from "react";
import Backlog from "../Backlog/Backlog";
import InProgress from "../InProgress/InProgress";
import Done from "../Done/Done";
import styles from "./Board.module.css";
import addPeopleImg from "../../assets/icons/addPeople.png";
import ToDo from "../ToDo/ToDo";
import AddPeople from "../AddPeople/AddPeople";

function Board() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [addPeople, setAddPeople] = useState(0);

  const months = [
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
    setMonth(months[today.getMonth()]);
    setYear(today.getFullYear());
  }, []);

  const handleAddPeople = () => {
    setAddPeople(1);
  };

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
          <span className={styles.addPeople} onClick={handleAddPeople}>
            <img src={addPeopleImg} />
            Add People
          </span>
        </div>
      </div>

      <div className={styles.ticketContainer}>
        <Backlog trigger={trigger} setTrigger={setTrigger} />
        <ToDo trigger={trigger} setTrigger={setTrigger} />
        <InProgress trigger={trigger} setTrigger={setTrigger} />
        <Done trigger={trigger} setTrigger={setTrigger} />
      </div>

      {addPeople === 1 && <AddPeople setAddPeople={setAddPeople} />}
    </div>
  );
}

export default Board;
