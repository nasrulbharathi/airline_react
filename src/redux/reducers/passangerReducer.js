import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function passangerReducer(
  state = initialState.passangers,
  action
) {
  switch (action.type) {
    case types.CREATE_PASSANGER_SUCCESS:
      return [...state, { ...action.passanger }];
    case types.UPDATE_PASSANGER_SUCCESS:
      return state.map((passanger) =>
        passanger.id === action.passanger.id ? action.passanger : passanger
      );
    case types.LOAD_PASSANGER_SUCCESS:
      return action.passangers;
    case types.DELETE_PASSANGER_OPTIMISTIC:
      return state.filter((passanger) => passanger.id !== action.passanger.id);
    case types.FILTER_PASSANGER_FLIGHT:
      return action.passangers;
    case types.RESET_FILTER_PASSANGER_FLIGHT:
      return initialState.passangers;
    case types.UPDATE_ANCILLARY_PASSANGER_SUCCESS:
      console.log("Insinde reducer");
      return state.map((passanger) =>
        passanger.id === action.passanger.id ? action.passanger : passanger
      );

    /* state.map((passanger) => {
        if (passanger.id === action.passanger.id) {
          passanger.name = action.passanger.name;
        }
      }); */
    default:
      return state;
  }
}
