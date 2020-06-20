import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const PassangerForm = ({
  passanger,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{passanger.id ? "Edit" : "Add"} passanger</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={passanger.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="dateOfBirth"
        label="dateOfBirth"
        value={passanger.dateOfBirth}
        onChange={onChange}
        error={errors.dateOfBirth}
      />

      <TextInput
        name="passportNumber"
        label="Passport Number"
        value={passanger.passportNumber}
        onChange={onChange}
        error={errors.passportNumber}
      />

      <TextInput
        name="address"
        label="Address"
        value={passanger.address}
        onChange={onChange}
        error={errors.passportNumber}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

PassangerForm.propTypes = {
  passanger: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default PassangerForm;
