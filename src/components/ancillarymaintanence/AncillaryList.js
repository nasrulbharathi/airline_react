import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AncillaryList = ({ ancillary, flights, onDeleteClick }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
            <th>Add Item to Flight</th>
          </tr>
        </thead>
        <tbody>
          {ancillary.map((ancillaryItem) => {
            return (
              <tr key={ancillaryItem.id}>
                <td>{ancillaryItem.name}</td>
                <td>{ancillaryItem.description}</td>
                <td> {callAncillaryType(ancillaryItem.type)}</td>
                <td>
                  <Link to={"/admin/ancillaryItem/" + ancillaryItem.id}>
                    {" "}
                    <FontAwesomeIcon
                      style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                      icon={faEdit}
                    />
                  </Link>
                  <span className="space-between"></span>
                  <FontAwesomeIcon
                    onClick={() => onDeleteClick(ancillaryItem)}
                    style={{ color: "rgb(223, 81, 52)", cursor: "pointer" }}
                    icon={faTrash}
                  />
                </td>
                <td>
                  <Link to={"/admin/manageFlight/" + ancillaryItem.id}>
                    {" "}
                    <button
                      style={{
                        marginBottom: 20,
                        backgroundColor: "rgb(223, 81, 52)",
                      }}
                      className="btn btn-primary add-course"
                    >
                      Add Item to Flight
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function callAncillaryType(type) {
  let typeValue = "Others";
  if (type.shoppingItem) {
    typeValue = "Shopping Item";
  } else if (type.specialMeal) {
    typeValue = "Special Meal";
  }
  return typeValue;
}

AncillaryList.propTypes = {
  ancillary: PropTypes.array.isRequired,
  flights: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AncillaryList;
