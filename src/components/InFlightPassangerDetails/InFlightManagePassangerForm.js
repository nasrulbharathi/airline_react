import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as passangerActions from "../../redux/actions/passangerActions";
import * as flightActions from "../../redux/actions/flightActions";
import InFlightPassangerForm from "./InFlightPassangerForm";
import { newPassanger } from "../../../tools/mockData";

class InFlightManagePassangerForm extends React.Component {
  state = {
    ancillary: "",
    shopping: "",
    meals: "",
    tempPassanger: {},
  };

  componentDidMount() {
    const { chosenFlight, actions } = this.props;
    actions
      .getFlightByName(chosenFlight)
      .then(() => {})
      .catch((error) => {
        alert("Loading Flight failed" + error);
      });
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleSave = (event) => {
    event.preventDefault();
    let special;
    if (this.state.meals == "specialMeal") {
      special = true;
    } else if (this.state.meals == "ordinaryMeal") {
      special = false;
    }
    this.setState({ tempPassanger: this.props.passanger }, () => {
      let copy = JSON.parse(JSON.stringify(this.state.tempPassanger));
      if (this.state.ancillary != "") {
        copy.ancillaryService = [
          ...copy.ancillaryService,
          this.state.ancillary,
        ];
      }
      if (this.state.shopping != "") {
        copy.shoppingItems = [...copy.shoppingItems, this.state.shopping];
      }
      this.setState(
        {
          tempPassanger: {
            ...this.state.tempPassanger,
            isSpecialMeals: special,
            ancillaryService: copy.ancillaryService,
            shoppingItems: copy.shoppingItems,
          },
        },
        () => {
          this.props.actions
            .savePassanger(this.state.tempPassanger)
            .then(() => {
              this.props.history.push({
                pathname: "/user/inflight",
                state: true,
              });
            });
        }
      );
    });
  };

  render() {
    return (
      <div>
        {this.props.flights[0] && (
          <InFlightPassangerForm
            ancillaryItems={this.props.flights[0].ancillaryService}
            shoppingItems={this.props.flights[0].shoppingItems}
            onSave={this.handleSave}
            parentState={this.state}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

InFlightManagePassangerForm.propTypes = {
  chosenFlight: PropTypes.string.isRequired,
  passanger: PropTypes.object.isRequired,
  passangers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  flights: PropTypes.array.isRequired,
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
    chosenFlight: state.chosenFlight,
    flights: state.flights,
    passanger,
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
      savePassanger: bindActionCreators(
        passangerActions.savePassanger,
        dispatch
      ),
      getFlightByName: bindActionCreators(
        flightActions.getFlightByName,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InFlightManagePassangerForm);
