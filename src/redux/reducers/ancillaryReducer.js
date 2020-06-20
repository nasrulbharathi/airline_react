import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function ancillaryReducer(
  state = initialState.ancillary,
  action
) {
  switch (action.type) {
    case types.CREATE_ANCILLARY_SUCCESS:
      return [...state, { ...action.ancillaryItem }];
    case types.UPDATE_ANCILLARY_SUCCESS:
      return state.map((ancillaryItem) =>
        ancillaryItem.id === action.ancillaryItem.id
          ? action.ancillaryItem
          : ancillaryItem
      );
    case types.LOAD_ANCILLARY_SUCCESS:
      return action.ancillary;
    case types.DELETE_ANCILLARY_OPTIMISTIC:
      return state.filter(
        (ancillaryItem) => ancillaryItem.id !== action.ancillaryItem.id
      );
    default:
      return state;
  }
}
