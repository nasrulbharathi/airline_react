import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadPassanger,
  savePassanger,
} from "../../redux/actions/passangerActions";
import PropTypes from "prop-types";
import PassangerForm from "./PassangerForm";
import { newPassanger } from "../../../tools/mockData";

function ManagePassanger({
  passangers,
  loadPassanger,
  savePassanger,
  history,
  ...props
}) {
  const [passanger, setPassanger] = useState({ ...props.passanger });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (passangers.length === 0) {
      loadPassanger().catch((error) => {
        alert("Loading Passanger failed" + error);
      });
    } else {
      setPassanger({ ...props.passanger });
    }
  }, [props.passanger]);

  function handleChange(event) {
    const { name, value } = event.target;
    setPassanger((prevPassanger) => ({
      ...prevPassanger,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    savePassanger(passanger).then(() => {
      history.push("/admin/passangers");
    });
  }

  return (
    <PassangerForm
      passanger={passanger}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManagePassanger.propTypes = {
  passanger: PropTypes.object.isRequired,
  passangers: PropTypes.array.isRequired,
  loadPassanger: PropTypes.func.isRequired,
  savePassanger: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getPassangerById(passangers, id) {
  return passangers.find((passanger) => passanger.id == id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const passanger =
    id && state.passangers.length > 0
      ? getPassangerById(state.passangers, id)
      : newPassanger;
  return {
    passanger,
    passangers: state.passangers,
  };
}

const mapDispatchToProps = {
  loadPassanger,
  savePassanger,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePassanger);
