import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function flightReducer(state = initialState.flights, action) {
  switch (action.type) {
    case types.CREATE_FLIGHT_SUCCESS:
      return [...state, { ...action.flight }];
    case types.UPDATE_FLIGHT_SUCCESS:
      return state.map((flight) =>
        flight.id === action.flight.id ? action.flight : flight
      );
    case types.UPDATE_ANCILLARY_FLIGHT_SUCCESS:
      return state.map((flight) =>
        flight.id === action.flight.id ? action.flight : flight
      );
    case types.LOAD_FLIGHT_SUCCESS:
      return action.flights;
    case types.LOAD_FLIGHT_NAME:
      return action.flight;
    default:
      return state;
  }
}
