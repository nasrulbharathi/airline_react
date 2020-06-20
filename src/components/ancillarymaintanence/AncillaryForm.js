import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const AncillaryForm = ({
  ancillaryItem,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{ancillaryItem.id ? "Edit" : "Add"} Ancillary Item</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={ancillaryItem.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="description"
        label="Description"
        value={ancillaryItem.description}
        onChange={onChange}
        error={errors.description}
      />

      <SelectInput
        name="typeValue"
        label="Type"
        value={ancillaryItem.typeValue || ""}
        defaultOption="Select Type"
        options={ancillaryCombobox.map((ancillaryComboboxItem) => ({
          value: ancillaryComboboxItem.value,
          text: ancillaryComboboxItem.text,
        }))}
        onChange={onChange}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

const ancillaryCombobox = [
  { value: "specialMeal", text: "Special Meal" },
  { value: "shoppingItem", text: "Shopping Item" },
  { value: "others", text: "Others" },
];

AncillaryForm.propTypes = {
  ancillaryItem: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AncillaryForm;
