import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const InFlightPassangerForm = ({
  parentState,
  ancillaryItems,
  shoppingItems,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  console.log("ancillaryItems..", ancillaryItems);
  console.log("shoppingItems..", shoppingItems);
  return (
    <form onSubmit={onSave}>
      <h2>Add Ancillary Items to Passanger</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      {ancillaryItems.length > 0 && (
        <SelectInput
          name="ancillary"
          label="Ancillary Items"
          value={parentState.ancillary}
          defaultOption="Select Type"
          options={ancillaryItems.map((item) => ({
            value: item,
            text: item,
          }))}
          onChange={onChange}
        />
      )}
      {shoppingItems.length > 0 && (
        <SelectInput
          name="shopping"
          label="Shopping Items"
          value={parentState.shopping}
          defaultOption="Select Type"
          options={shoppingItems.map((item) => ({
            value: item,
            text: item,
          }))}
          onChange={onChange}
        />
      )}
      <SelectInput
        name="meals"
        label="Meals"
        value={parentState.meals}
        defaultOption="Select Type"
        options={mealCombobox.map((item) => ({
          value: item.value,
          text: item.text,
        }))}
        onChange={onChange}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

const mealCombobox = [
  { value: "specialMeal", text: "Special Meal" },
  { value: "ordinaryMeal", text: "Ordinary Meals" },
];

InFlightPassangerForm.propTypes = {
  ancillaryItems: PropTypes.array.isRequired,
  shoppingItems: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  parentState: PropTypes.object.isRequired,
};

export default InFlightPassangerForm;
