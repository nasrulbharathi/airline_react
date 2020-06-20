import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as passangerActions from "../../redux/actions/passangerActions";
import PassangerList from "./PassangerDetailsList";
import SelectInput from "../common/SelectInput";
import * as chosenFlightActions from "../../redux/actions/chosenFlightActions";

class PassangerDetails extends React.Component {
  state = {
    flight: "",
    passangerDetails: [],
  };

  flightCombobox = [
    { value: "Air Asia", text: "Air Asia" },
    { value: "Indigo", text: "Indigo" },
    { value: "Jet Airways", text: "Jet Airways" },
    { value: "Go Air", text: "Go Air" },
  ];

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val }, () => {
      this.props.actions.addChosenFlight(this.state.flight);
      this.props.actions.filterPassanger(this.state.flight);
    });
  };

  componentDidMount() {
    const { passangers, actions } = this.props;

    if (passangers.length === 0) {
      actions.filterPassanger(this.state.flight).catch((error) => {
        alert("Loading Passanger failed" + error);
      });
    }
  }
  handleDeletePassanger = (passanger) => {
    // this.props.actions.deletePassanger(passanger);
  };

  render() {
    return (
      <>
        <SelectInput
          name="flight"
          label="Choose Flight"
          value={this.state.flight}
          defaultOption="Select Flight"
          options={this.flightCombobox.map((flightComboboxItem) => ({
            value: flightComboboxItem.value,
            text: flightComboboxItem.text,
          }))}
          onChange={this.handleChange}
        />
        <PassangerList
          passangers={this.props.passangers}
          onDeleteClick={this.handleDeletePassanger}
        />
      </>
    );
  }
}

PassangerDetails.propTypes = {
  passangers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    passangers: state.passangers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadPassanger: bindActionCreators(
        passangerActions.loadPassanger,
        dispatch
      ),
      filterPassanger: bindActionCreators(
        passangerActions.filterPassanger,
        dispatch
      ),
      addChosenFlight: bindActionCreators(
        chosenFlightActions.addChosenFlight,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PassangerDetails);
