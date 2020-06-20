import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PasssangerList = ({ passangers, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>DateOfBirth</th>
        <th>PassportNumber</th>
        <th>Address</th>
        <th>SeatNo</th>
        <th>Ancillary Services</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {passangers.map((passanger) => {
        return (
          <tr key={passanger.id}>
            <td>{passanger.name}</td>
            <td>{passanger.dateOfBirth}</td>
            <td>{passanger.passportNumber}</td>
            <td>{passanger.address}</td>
            <td>{passanger.seatNo}</td>
            <td>{passanger.ancillaryService}</td>
            <td>
              <Link to={"/admin/passanger/" + passanger.id}>
                {" "}
                <FontAwesomeIcon
                  style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                  icon={faEdit}
                />
              </Link>
              <span className="space-between"></span>
              <FontAwesomeIcon
                onClick={() => onDeleteClick(passanger)}
                style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                icon={faTrash}
              />
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
