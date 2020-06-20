import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const FlightForm = ({
  flights,
  flight,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>Add Ancillary Item to a Flight</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <SelectInput
        name="id"
        label="Choose a Flight"
        value={flight.id || ""}
        defaultOption="Select Flight"
        options={flights.map((flightItem) => ({
          value: flightItem.id,
          text: flightItem.name,
        }))}
        onChange={onChange}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

FlightForm.propTypes = {
  flights: PropTypes.array.isRequired,
  flight: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default FlightForm;
