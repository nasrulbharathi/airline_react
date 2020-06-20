import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as passangerActions from "../../redux/actions/passangerActions";
import PassangerList from "./PassangerList";
import { Redirect } from "react-router-dom";

class Passanger extends React.Component {
  state = {
    redirectToAddPassangerPage: false,
  };

  componentDidMount() {
    const { passangers, actions } = this.props;

    if (passangers.length === 0) {
      actions.loadPassanger().catch((error) => {
        alert("Loading Passanger failed" + error);
      });
    }
  }

  handleDeletePassanger = (passanger) => {
    this.props.actions.deletePassanger(passanger);
  };

  render() {
    return (
      <>
        {this.state.redirectToAddPassangerPage && (
          <Redirect to="/admin/passanger" />
        )}
        <h2>Passanger</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddPassangerPage: true })}
        >
          Add Passanger
        </button>
        <PassangerList
          passangers={this.props.passangers}
          onDeleteClick={this.handleDeletePassanger}
        />
      </>
    );
  }
}

Passanger.propTypes = {
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
      deletePassanger: bindActionCreators(
        passangerActions.deletePassanger,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Passanger);
