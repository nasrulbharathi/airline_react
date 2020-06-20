import React from "react";

const Seat = ({ id, selected, taken, isSpecialMeal, onClick }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 30,
      width: 30,
      margin: 5,
      borderRadius: 50,
      color: "white",
      background: isSpecialMeal ? "yellow" : selected ? "orange" : "steelblue",
    }}
    onClick={() => onClick(id)}
  >
    <span>{id}</span>
  </div>
);

export default Seat;
