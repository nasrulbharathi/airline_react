import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PasssangerList = ({ passangers }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Seat No</th>
        <th>Ancillary Service</th>
        <th>Checked In</th>
        <th>Having Infant</th>
        <th>Wheel chair</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {passangers.map((passanger) => {
        return (
          <tr key={passanger.id}>
            <td>{passanger.name}</td>
            <td>{passanger.seatNo}</td>
            <td>{passanger.ancillaryService}</td>
            <td>{passanger.isCheckedIn ? "yes" : "no"}</td>
            <td>{passanger.isHavingInfant ? "yes" : "no"}</td>
            <td>{passanger.wheelChair ? "yes" : "no"}</td>
            <td>
              {passanger.isCheckedIn && (
                <Link
                  to={{
                    pathname: "/user/passangerdetails/" + passanger.id,
                    state: {
                      passangerCheckIn: passanger.isCheckedIn,
                      seatNo: passanger.seatNo,
                    },
                  }}
                >
                  {" "}
                  <button
                    style={{
                      backgroundColor: "rgb(223, 81, 52)",
                    }}
                    className="btn btn-primary"
                  >
                    Check Out
                  </button>
                  {/*  <FontAwesomeIcon
                    style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                    icon={faCheckCircle}
                  /> */}
                </Link>
              )}
              {!passanger.isCheckedIn && (
                <Link
                  to={{
                    pathname: "/user/passangerdetails/" + passanger.id,
                    state: { passangerCheckIn: passanger.isCheckedIn },
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "rgb(223, 81, 52)",
                      paddingRight: "23px",
                    }}
                    className="btn btn-primary"
                  >
                    Check In
                  </button>
                  {/*  <FontAwesomeIcon
                    onClick={() => onDeleteClick(passanger)}
                    style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                    icon={faTimesCircle}
                  /> */}
                </Link>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

PasssangerList.propTypes = {
  passangers: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default PasssangerList;
