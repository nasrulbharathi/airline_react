import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as flightActions from "../../redux/actions/flightActions";

class InFlightDetails extends React.Component {
  componentDidMount() {
    const { flightName, actions } = this.props;

    actions
      .getFlightByName(flightName)
      .then(() => {
        this.flightDetails = this.props.flights[0];
      })
      .catch((error) => {
        alert("Loading Flight failed" + error);
      });
  }

  getItems = (items) => {
    console.log(items);
    if (items.length > 0) {
      return items.map((item) => {
        <span>{item}</span>;
      });
    } else {
      return "";
    }
  };

  render() {
    return (
      <div style={{ marginTop: "5px" }}>
        <h2>Inflight Details</h2>
        {this.props.flights.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Contents</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td> {this.props.flights[0].name} </td>
              </tr>
              <tr>
                <td>Total Seats</td>
                <td> {this.props.flights[0].totalSeats} </td>
              </tr>
              <tr>
                <td>Ancillary Service</td>
                <td>
                  {this.props.flights[0].ancillaryService.map((i, index) => {
                    return <span key={index}>{i} </span>;
                  })}
                </td>
              </tr>
              <tr>
                <td>Meals</td>
                <td>
                  {this.props.flights[0].meals.map((i, index) => {
                    return <span key={index}>{i} </span>;
                  })}
                </td>
              </tr>
              <tr>
                <td>Shopping Items</td>
                <td>
                  {this.props.flights[0].shoppingItems.map((i, index) => {
                    return <span key={index}>{i} </span>;
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

InFlightDetails.propTypes = {
  flightName: PropTypes.string.isRequired,
  flights: PropTypes.array,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    flights: state.flights,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getFlightByName: bindActionCreators(
        flightActions.getFlightByName,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InFlightDetails);
