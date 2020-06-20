import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as ancillaryActions from "../../redux/actions/ancillaryActions";
import * as flightActions from "../../redux/actions/flightActions";
import AncillaryList from "./AncillaryList";
import { Redirect } from "react-router-dom";

class AncillaryMaintanence extends React.Component {
  state = {
    redirectToAddAncillaryPage: false,
  };

  componentDidMount() {
    const { ancillary, flights, actions } = this.props;

    if (ancillary.length === 0) {
      actions.loadAncillary().catch((error) => {
        alert("Loading Ancillary failed" + error);
      });
    }

    if (flights.length === 0) {
      actions.loadFlights().catch((error) => {
        alert("Loading Flights failed" + error);
      });
    }
  }

  handleDeleteAncillaryItem = (item) => {
    this.props.actions.deleteAncillaryItem(item);
  };

  render() {
    return (
      <>
        {this.state.redirectToAddAncillaryPage && (
          <Redirect to="/admin/ancillaryItem" />
        )}
        <h2>Ancillary</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddAncillaryPage: true })}
        >
          Add Ancillary
        </button>
        <AncillaryList
          ancillary={this.props.ancillary}
          flights={this.props.flights}
          onDeleteClick={this.handleDeleteAncillaryItem}
        />
      </>
    );
  }
}

AncillaryMaintanence.propTypes = {
  ancillary: PropTypes.array.isRequired,
  flights: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ancillary: state.ancillary,
    flights: state.flights,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAncillary: bindActionCreators(
        ancillaryActions.loadAncillary,
        dispatch
      ),
      loadFlights: bindActionCreators(flightActions.loadFlight, dispatch),
      deleteAncillaryItem: bindActionCreators(
        ancillaryActions.deleteAncillaryItem,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AncillaryMaintanence);
