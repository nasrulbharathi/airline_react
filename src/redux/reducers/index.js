import { combineReducers } from "redux";
import passangers from "./passangerReducer";
import ancillary from "./ancillaryReducer";
import flights from "./flightReducer";
import chosenFlight from "./chosenFlightReducer";

const rootReducer = combineReducers({
  passangers,
  ancillary,
  flights,
  chosenFlight,
});

export default rootReducer;
