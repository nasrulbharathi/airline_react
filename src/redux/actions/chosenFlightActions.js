import * as types from "./actionTypes";

export function clearFlightState() {
  return { type: types.CLEAR_CHOSEN_FLIGHT_NAME };
}

export function addChosenFlightState(flightName) {
  return { type: types.CHOSEN_FLIGHT_NAME_SUCCESS, flightName };
}

export function getChosenFlightState() {
  return { type: types.GET_CHOSEN_FLIGHT_NAME };
}

export function clearChosenFlightName() {
  return function (dispatch) {
    dispatch(clearFlightState());
  };
}

export function addChosenFlight(flightName) {
  return function (dispatch) {
    dispatch(addChosenFlightState(flightName));
  };
}

export function getChosenFlightName() {
  return function (dispatch) {
    dispatch(getChosenFlightState());
  };
}
