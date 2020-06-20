import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function chosenFlightReducer(
  state = initialState.chosenFlightName,
  action
) {
  switch (action.type) {
    case types.CHOSEN_FLIGHT_NAME_SUCCESS:
      return action.flightName;
    case types.CLEAR_CHOSEN_FLIGHT_NAME:
      return initialState.chosenFlightName;
    case types.GET_CHOSEN_FLIGHT_NAME:
      return state;
    default:
      return state;
  }
}
