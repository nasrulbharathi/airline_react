import * as types from "./actionTypes";
import * as ancillaryApi from "../../api/ancillaryApi";

export function loadAncillarySuccess(ancillary) {
  return { type: types.LOAD_ANCILLARY_SUCCESS, ancillary };
}

export function createAncillarySuccess(ancillaryItem) {
  return { type: types.CREATE_ANCILLARY_SUCCESS, ancillaryItem };
}

export function updateAncillarySuccess(ancillaryItem) {
  return { type: types.UPDATE_ANCILLARY_SUCCESS, ancillaryItem };
}

export function deleteAncillaryOptimistic(ancillaryItem) {
  return { type: types.DELETE_ANCILLARY_OPTIMISTIC, ancillaryItem };
}

export function loadAncillary() {
  return function (dispatch) {
    return ancillaryApi
      .getAncillary()
      .then((ancillary) => {
        dispatch(loadAncillarySuccess(ancillary));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveAncillary(ancillaryItem) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return ancillaryApi
      .createModifyAncillary(ancillaryItem)
      .then((savedAncillaryItem) => {
        ancillaryItem.id
          ? dispatch(updateAncillarySuccess(savedAncillaryItem))
          : dispatch(createAncillarySuccess(savedAncillaryItem));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteAncillaryItem(ancillaryItem) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteAncillaryOptimistic(ancillaryItem));
    return ancillaryApi.deleteAncillary(ancillaryItem.id);
  };
}
