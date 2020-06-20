import * as types from "./actionTypes";
import * as flightApi from "../../api/flightApi";

export function loadFlightSuccess(flights) {
  return { type: types.LOAD_FLIGHT_SUCCESS, flights };
}

export function createFlightSuccess(flight) {
  return { type: types.CREATE_FLIGHT_SUCCESS, flight };
}

export function updateFlightSuccess(flight) {
  return { type: types.UPDATE_FLIGHT_SUCCESS, flight };
}

export function updateAncillaryFlightSuccess(flight) {
  return { type: types.UPDATE_ANCILLARY_FLIGHT_SUCCESS, flight };
}

export function loadFlightByName(flight) {
  return { type: types.LOAD_FLIGHT_NAME, flight };
}

export function loadFlight() {
  return function (dispatch) {
    return flightApi
      .getFlight()
      .then((flights) => {
        dispatch(loadFlightSuccess(flights));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getFlightByName(flight) {
  return function (dispatch) {
    return flightApi
      .getFlightByName(flight)
      .then((flight) => {
        dispatch(loadFlightByName(flight));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveFlight(flight) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return flightApi
      .createModifyFlight(flight)
      .then((savedFlight) => {
        flight.id
          ? dispatch(updateFlightSuccess(savedFlight))
          : dispatch(createFlightSuccess(savedFlight));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveAncillaryItemInFlight(flight) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return flightApi
      .createModifyFlight(flight)
      .then((savedFlight) => {
        dispatch(updateAncillaryFlightSuccess(savedFlight));
      })
      .catch((error) => {
        throw error;
      });
  };
}
