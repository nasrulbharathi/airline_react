import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as passangerActions from "../../redux/actions/passangerActions";
import Seat from "../common/Seat";

class InFlightMealDetails extends React.Component {
  state = {
    checkedInPassanger: [],
    count: 0,
  };

  initialRowState = [
    { id: 1, taken: false },
    { id: 2, taken: false },
    { id: 3, taken: false },
    { id: 4, taken: false },
    { id: 5, taken: false },
    { id: 6, taken: false },
    { id: 7, taken: false },
    { id: 8, taken: false },
    { id: 9, taken: false },
    { id: 10, taken: false },
    { id: 11, taken: false },
    { id: 12, taken: false },
    { id: 13, taken: false },
    { id: 14, taken: false },
    { id: 15, taken: false },
    { id: 16, taken: false },
    { id: 17, taken: false },
    { id: 18, taken: false },
    { id: 19, taken: false },
    { id: 20, taken: false },
    { id: 21, taken: false },
    { id: 22, taken: false },
    { id: 23, taken: false },
    { id: 24, taken: false },
  ];
  componentDidMount() {
    const { actions } = this.props;

    actions
      .filterPassanger(this.props.flightName)
      .then(() => {
        this.setState(
          {
            checkedInPassanger: this.props.passangers.filter((passanger) => {
              return passanger.isCheckedIn == true;
            }),
          },
          () => {
            console.log("filterData..", this.state.checkedInPassanger);
            this.initialRowState.map((row) => {
              this.state.checkedInPassanger.map((passanger) => {
                if (passanger.seatNo == row.id) {
                  row.specialMeal = passanger.isSpecialMeals;
                  row.selected = true;
                }
              });
            });
            this.setState({ count: 1 });
            console.log(" this.initialRowState..", this.initialRowState);
          }
        );
      })
      .catch((error) => {
        alert("Loading Passanger failed" + error);
      });
  }

  handleClick = () => {
    console.log("Insisdae cleick");
  };

  render() {
    return (
      <div>
        {" "}
        {this.props.flightName}
        <div>
          {this.state.count > 0 &&
            this.initialRowState.map((row) => (
              <Seat
                key={row.id}
                id={row.id}
                taken={row.taken}
                selected={row.selected}
                isSpecialMeal={row.specialMeal}
                onClick={this.handleClick}
              />
            ))}
        </div>
        <div>
          <Seat key={0} id="" selected={true} isSpecialMeal={false} />
          <span> Ordinary Meals</span>
        </div>
        <div>
          <Seat key={0} id="" selected={true} isSpecialMeal={true} />
          <span> Special Meals</span>
        </div>
        <div>
          <Seat key={0} id="" selected={false} isSpecialMeal={false} />
          <span> Free Seats</span>
        </div>
      </div>
    );
  }
}

InFlightMealDetails.propTypes = {
  flightName: PropTypes.string.isRequired,
  passangers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

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

function mapStateToProps(state) {
  return {
    passangers: state.passangers,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InFlightMealDetails);
