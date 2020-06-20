import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadAncillary,
  saveAncillary,
} from "../../redux/actions/ancillaryActions";
import PropTypes from "prop-types";
import AncillaryForm from "./AncillaryForm";
import { newAncillary } from "../../../tools/mockData";

function ManageAncillary({
  ancillary,
  loadAncillary,
  saveAncillary,
  history,
  ...props
}) {
  const [ancillaryItem, setAncillaryItem] = useState({
    ...props.ancillaryItem,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ancillary.length === 0) {
      loadAncillary().catch((error) => {
        alert("Loading Ancillary failed" + error);
      });
    } else {
      setAncillaryItem({ ...props.ancillaryItem });
    }
  }, [props.ancillaryItem]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAncillaryItem((prevAncillaryItem) => ({
      ...prevAncillaryItem,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    if (ancillaryItem.typeValue == "shoppingItem") {
      ancillaryItem.type = { shoppingItem: true };
    } else if (ancillaryItem.typeValue == "specialMeal") {
      ancillaryItem.type = { specialMeal: true };
    } else {
      ancillaryItem.type = { others: true };
    }
    saveAncillary(ancillaryItem).then(() => {
      history.push("/admin/ancillarymaintanence");
    });
  }

  return (
    <AncillaryForm
      ancillaryItem={ancillaryItem}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageAncillary.propTypes = {
  ancillaryItem: PropTypes.object.isRequired,
  ancillary: PropTypes.array.isRequired,
  loadAncillary: PropTypes.func.isRequired,
  saveAncillary: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getAncillaryById(ancillary, id) {
  return ancillary.find((ancillaryItem) => ancillaryItem.id == id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const ancillaryItem =
    id && state.ancillary.length > 0
      ? getAncillaryById(state.ancillary, id)
      : newAncillary;
  return {
    ancillaryItem,
    ancillary: state.ancillary,
  };
}

const mapDispatchToProps = {
  loadAncillary,
  saveAncillary,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAncillary);
