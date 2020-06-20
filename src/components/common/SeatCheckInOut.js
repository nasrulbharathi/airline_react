import React from "react";

const SeatCheckInOut = ({
  id,
  selected,
  isCheckedIn,
  isHavingInfant,
  isWheelChair,
  onClick,
}) => (
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
      background:
        isCheckedIn && isHavingInfant
          ? "yellow"
          : isCheckedIn && isWheelChair
          ? "red"
          : isCheckedIn
          ? "green"
          : selected
          ? "orange"
          : "steelblue",
    }}
    onClick={() => onClick(id)}
  >
    <span>{id}</span>
  </div>
);

export default SeatCheckInOut;
