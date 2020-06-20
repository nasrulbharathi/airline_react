import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as passangerActions from "../../redux/actions/passangerActions";
import SeatCheckInOut from "../common/SeatCheckInOut";
import { newPassanger } from "../../../tools/mockData";

class CheckInOut extends React.Component {
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

  state = {
    count: 0,
    checkedInPassangers: [],
    row: [],
    tempPassanger: {},
  };

  componentDidMount() {
    const { actions } = this.props;

    actions
      .filterPassanger(this.props.chosenFlight)
      .then(() => {
        this.setState(
          {
            checkedInPassangers: this.props.passangers.filter((passanger) => {
              return passanger.isCheckedIn == true;
            }),
          },
          () => {
            this.initialRowState.map((row) => {
              this.state.checkedInPassangers.map((passanger) => {
                if (passanger.seatNo == row.id) {
                  row.isWheelChair = passanger.wheelChair;
                  row.isCheckedIn = passanger.isCheckedIn;
                  row.isHavingInfant = passanger.isHavingInfant;
                  if (passanger.isCheckedIn) {
                    row.taken = true;
                  }
                }
              });
            });
            this.setState({ row: this.initialRowState }, () => {
              this.setState({ count: 1 });
            });
          }
        );
      })
      .catch((error) => {
        alert("Loading Passanger failed" + error);
      });
  }

  handleClick = (id) => {
    this.initialRowState.map((data) => {
      if (!this.props.location.state.passangerCheckIn) {
        if (data.id == id && !data.isCheckedIn && !data.taken) {
          data.selected = true;
          this.markedId = data.id;
        } else if (data.id == id && data.isCheckedIn && !data.taken) {
          data.isWheelChair = false;
          data.isHavingInfant = false;
          data.selected = true;
          this.markedId = data.id;
        } else {
          data.selected = false;
        }
      } else if (this.props.location.state.passangerCheckIn) {
        if (
          data.id == id &&
          data.taken &&
          this.props.location.state.seatNo == data.id
        ) {
          data.isWheelChair = false;
          data.isHavingInfant = false;
          data.isCheckedIn = false;
          data.selected = true;
          this.markedId = data.id;
        }
      }
    });
    this.setState({ row: this.initialRowState });
  };

  handleSave = () => {
    if (
      !this.props.location.state.passangerCheckIn &&
      this.markedId != undefined
    ) {
      this.setState({ tempPassanger: this.props.passanger }, () => {
        console.log("this.state.tempPassanger..", this.state.tempPassanger);
        this.setState(
          {
            tempPassanger: {
              ...this.state.tempPassanger,
              seatNo: this.markedId,
              isCheckedIn: true,
            },
          },
          () => {
            console.log(
              "this.state.tempPassange in 2r..",
              this.state.tempPassanger
            );
            this.props.actions
              .savePassanger(this.state.tempPassanger)
              .then(() => {
                this.props.history.push({
                  pathname: "/user/passangerdetails",
                  state: true,
                });
              });
          }
        );
      });
    } else if (this.markedId) {
      console.log("else");
      this.setState({ tempPassanger: this.props.passanger }, () => {
        this.setState(
          {
            tempPassanger: {
              ...this.state.tempPassanger,
              isCheckedIn: false,
            },
          },
          () => {
            this.props.actions
              .savePassanger(this.state.tempPassanger)
              .then(() => {
                this.props.history.push({
                  pathname: "/user/passangerdetails",
                  state: true,
                });
              });
          }
        );
      });
    }
  };

  render() {
    return (
      <>
        {this.props.location.state.passangerCheckIn && <h2>Check Out</h2>}
        {!this.props.location.state.passangerCheckIn && <h2>Check In</h2>}
        {this.state.count > 0 &&
          this.state.row.map((row) => (
            <SeatCheckInOut
              key={row.id}
              id={row.id}
              taken={row.taken}
              selected={row.selected}
              isCheckedIn={row.isCheckedIn}
              isHavingInfant={row.isHavingInfant}
              isWheelChair={row.isWheelChair}
              onClick={this.handleClick}
            />
          ))}

        <div>
          <button
            style={{
              backgroundColor: "rgb(223, 81, 52)",
            }}
            className="btn btn-primary"
            onClick={this.handleSave}
          >
            {this.props.location.state.passangerCheckIn
              ? "Check Out"
              : "Check In"}
          </button>
        </div>
        <div>
          <SeatCheckInOut
            key={0}
            id=""
            selected={false}
            isHavingInfant={true}
            isCheckedIn={true}
          />
          <span> Infant</span>
        </div>

        <div>
          <SeatCheckInOut
            key={0}
            id=""
            selected={false}
            isWheelChair={true}
            isCheckedIn={true}
          />
          <span> WheelChair</span>
        </div>
        <div>
          <SeatCheckInOut key={0} id="" selected={false} isCheckedIn={true} />
          <span>Reserved</span>
        </div>
        <div>
          <SeatCheckInOut key={0} id="" selected={true} isSpecialMeal={false} />
          <span> Marked</span>
        </div>
      </>
    );
  }
}

CheckInOut.propTypes = {
  chosenFlight: PropTypes.string.isRequired,
  passangers: PropTypes.array.isRequired,
  passanger: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      filterPassanger: bindActionCreators(
        passangerActions.filterPassanger,
        dispatch
      ),
      savePassanger: bindActionCreators(
        passangerActions.savePassanger,
        dispatch
      ),
    },
  };
}

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
    passanger,
    chosenFlight: state.chosenFlight,
    passangers: state.passangers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInOut);
