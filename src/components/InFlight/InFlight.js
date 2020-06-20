import React from "react";
import InFlightDetails from "./InFlightDetails";
import InFlightMealDetails from "./InFlightMealDetails";
import InFlightPassangerDetails from "../InFlightPassangerDetails/InFlightPassangerDetails";
import SelectInput from "../common/SelectInput";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as chosenFlightActions from "../../redux/actions/chosenFlightActions";

class InFlight extends React.Component {
  state = {
    isFlight: false,
    isMeal: false,
    isPassanger: false,
    flight: "",
  };

  componentDidMount() {
    const { chosenFlight, actions } = this.props;

    if (this.props.location.state) {
      this.setState({ flight: chosenFlight });
      this.setState({ isFlight: false, isMeal: false, isPassanger: true });
    } else {
      actions.getChosenFlightName();
    }
  }

  spaceClass = "space-inbetween-buttons";

  flightCombobox = [
    { value: "Air Asia", text: "Air Asia" },
    { value: "Indigo", text: "Indigo" },
    { value: "Jet Airways", text: "Jet Airways" },
    { value: "Go Air", text: "Go Air" },
  ];

  handleFlightDetails = () => {
    this.setState({ isFlight: true, isMeal: false, isPassanger: false });
  };

  handleMealDetails = () => {
    this.setState({ isFlight: false, isMeal: true, isPassanger: false });
  };

  handlePassangerDetails = () => {
    this.setState({ isFlight: false, isMeal: false, isPassanger: true });
  };

  handleFlightChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val }, () => {
      this.props.actions.addChosenFlight(this.state.flight);
      this.setState({ isFlight: false, isMeal: false, isPassanger: false });
    });
  };

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <SelectInput
          name="flight"
          label="Choose a Flight"
          value={this.state.flight}
          defaultOption="Select Flight"
          options={this.flightCombobox.map((flightItem) => ({
            value: flightItem.value,
            text: flightItem.text,
          }))}
          onChange={this.handleFlightChange}
        />
        <div style={{ marginTop: "10px" }}>
          <button
            className="btn btn-primary"
            onClick={this.handleFlightDetails}
          >
            Flight Details
          </button>
          <span className={this.spaceClass}></span>
          <button className="btn btn-primary" onClick={this.handleMealDetails}>
            In Flight Meal Details
          </button>
          <span className="space-inbetween-buttons2"></span>
          <button
            className="btn btn-primary"
            onClick={this.handlePassangerDetails}
          >
            In Flight Passanger Details
          </button>
          {!this.state.isPassanger &&
            !this.state.isFlight &&
            !this.state.isMeal && (
              <div style={{ marginTop: "10px" }}>
                {" "}
                Kinldy Click any of the above button to display Specific details{" "}
              </div>
            )}
          {this.state.isFlight && (
            <div>
              <InFlightDetails flightName={this.state.flight} />
            </div>
          )}
          {this.state.isPassanger && (
            <div>
              <InFlightPassangerDetails flightName={this.state.flight} />
            </div>
          )}
          {this.state.isMeal && (
            <div>
              <InFlightMealDetails flightName={this.state.flight} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

InFlight.propTypes = {
  chosenFlight: PropTypes.string,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    chosenFlight: state.chosenFlight,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addChosenFlight: bindActionCreators(
        chosenFlightActions.addChosenFlight,
        dispatch
      ),
      getChosenFlightName: bindActionCreators(
        chosenFlightActions.getChosenFlightName,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InFlight);
