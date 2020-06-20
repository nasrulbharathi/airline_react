import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as passangerActions from "../../redux/actions/passangerActions";
import InFlightPasssangerList from "./InFlightPassangerDetailsList";

class InFlightPassangerDetails extends React.Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.filterPassanger(this.props.flightName).catch((error) => {
      alert("Loading Passanger failed" + error);
    });
  }

  render() {
    return (
      <>
        <InFlightPasssangerList passangers={this.props.passangers} />
      </>
    );
  }
}

InFlightPassangerDetails.propTypes = {
  flightName: PropTypes.string.isRequired,
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
      filterPassanger: bindActionCreators(
        passangerActions.filterPassanger,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InFlightPassangerDetails);
