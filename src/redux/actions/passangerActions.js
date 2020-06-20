import * as types from "./actionTypes";
import * as passangerApi from "../../api/passangerApi";

export function loadPassangerSuccess(passangers) {
  return { type: types.LOAD_PASSANGER_SUCCESS, passangers };
}

export function createPassangerSuccess(passanger) {
  return { type: types.CREATE_PASSANGER_SUCCESS, passanger };
}

export function updatePassangerSuccess(passanger) {
  return { type: types.UPDATE_PASSANGER_SUCCESS, passanger };
}

export function deletePassangerOptimistic(passanger) {
  return { type: types.DELETE_PASSANGER_OPTIMISTIC, passanger };
}

export function filterPassangerPerFlight(passangers) {
  console.log("passangers..", passangers);
  return { type: types.FILTER_PASSANGER_FLIGHT, passangers };
}

export function resetFilterPassangerPerFlight(value) {
  return { type: types.RESET_FILTER_PASSANGER_FLIGHT, value };
}

export function updateAncillaryPassangerSuccess(passanger) {
  console.log("insinde update ..");
  return { type: types.UPDATE_ANCILLARY_PASSANGER_SUCCESS, passanger };
}

export function loadPassanger() {
  return function (dispatch) {
    return passangerApi
      .getPassanger()
      .then((passangers) => {
        dispatch(loadPassangerSuccess(passangers));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function resetFilterPassanger() {
  return function (dispatch) {
    dispatch(resetFilterPassangerPerFlight(""));
  };
}

export function filterPassanger(flight) {
  return function (dispatch) {
    return passangerApi
      .getPassangerByFlight(flight)
      .then((passangers) => {
        dispatch(filterPassangerPerFlight(passangers));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function savePassanger(passanger) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return passangerApi
      .createModifyPassanger(passanger)
      .then((savedPassanger) => {
        passanger.id
          ? dispatch(updatePassangerSuccess(savedPassanger))
          : dispatch(createPassangerSuccess(savedPassanger));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateAncillaryInPassanger(passanger) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return passangerApi
      .createModifyPassanger(passanger)
      .then((savedPassanger) => {
        dispatch(updateAncillaryPassangerSuccess(savedPassanger));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deletePassanger(passanger) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deletePassangerOptimistic(passanger));
    return passangerApi.deletePassanger(passanger.id);
  };
}
