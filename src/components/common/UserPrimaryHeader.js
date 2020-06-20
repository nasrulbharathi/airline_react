import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { resetFilterPassanger } from "../../redux/actions/passangerActions";
import PropTypes from "prop-types";

const UserPrimaryHeader = ({ ...props }) => {
  const activeStyle = { color: "#F15B2A" };

  const clearState = () => {
    props.resetFilterPassanger();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">User</div>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/user/passangerdetails"
              activeStyle={activeStyle}
              exact
            >
              Passanger Details
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/user/inflight"
              activeStyle={activeStyle}
            >
              In Flight
            </NavLink>
          </li>
        </ul>
        <Link to={"/"}>
          <button
            style={{
              backgroundColor: "rgb(223, 81, 52)",
            }}
            onClick={clearState}
            className="btn btn-primary add-course"
          >
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

UserPrimaryHeader.propTypes = {
  resetFilterPassanger: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    passangers: state.passangers,
  };
}

const mapDispatchToProps = {
  resetFilterPassanger,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPrimaryHeader);
