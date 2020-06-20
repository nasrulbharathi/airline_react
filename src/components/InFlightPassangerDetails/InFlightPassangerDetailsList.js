import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const InFlightPasssangerList = ({ passangers }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Seat No</th>
        <th>Ancillary Service</th>
        <th>Shopping Items</th>
        <th>Meals</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {passangers.map((passanger) => {
        if (passanger.isCheckedIn) {
          return (
            <tr key={passanger.id}>
              <td>{passanger.name}</td>
              <td>{passanger.seatNo}</td>
              <td>
                {passanger.ancillaryService.map((i, index) => {
                  return <span key={index}>{i} </span>;
                })}
              </td>
              <td>
                {passanger.shoppingItems.map((i, index) => {
                  return <span key={index}>{i} </span>;
                })}
              </td>
              <td>{passanger.meals}</td>
              <td>
                <Link to={"/user/inflightForm/" + passanger.id}>
                  {" "}
                  <FontAwesomeIcon
                    style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                    icon={faEdit}
                  />
                </Link>
              </td>
            </tr>
          );
        }
      })}
    </tbody>
  </table>
);

InFlightPasssangerList.propTypes = {
  passangers: PropTypes.array.isRequired,
};

export default InFlightPasssangerList;
