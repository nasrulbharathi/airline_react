import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { resetFilterPassanger } from "../../redux/actions/passangerActions";
import PropTypes from "prop-types";

const Header = ({ ...props }) => {
  const activeStyle = { color: "#F15B2A" };

  const clearState = () => {
    props.resetFilterPassanger();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">Admin</div>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/admin/passangers"
              activeStyle={activeStyle}
              exact
            >
              Passanger
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/admin/ancillarymaintanence"
              activeStyle={activeStyle}
            >
              Ancillary Maintanence
            </NavLink>
          </li>
        </ul>
        <Link to={"/"}>
          <button
            style={{
              backgroundColor: "rgb(223, 81, 52)",
            }}
            className="btn btn-primary add-course"
            onClick={clearState}
          >
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

Header.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
