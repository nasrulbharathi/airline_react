import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadFlight,
  saveAncillaryItemInFlight,
} from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightForm from "./FlightForm";
import { newFlight } from "../../../tools/mockData";
import { loadAncillary } from "../../redux/actions/ancillaryActions";

function ManageFlight({
  ancillary,
  loadFlight,
  saveAncillaryItemInFlight,
  loadAncillary,
  history,
  ...props
}) {
  const [flight, setFlight] = useState({ ...props.flight });
  const [errors, setErrors] = useState({});
  const [flights, setFlights] = useState([...props.flights]);

  useEffect(() => {
    loadFlight().catch((error) => {
      alert("Loading flight failed" + error);
    });
    if (flights.length != 0) {
      setFlight({ ...props.flight });
    }

    if (ancillary.length === 0) {
      loadAncillary().catch((error) => {
        alert("Loading Ancillary failed" + error);
      });
    }
  }, [props.flight]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFlight((prevFlight) => ({
      ...prevFlight,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    const path = history.location.pathname;
    const anciId = path.charAt(path.length - 1);
    setFlights((prevFlights) => {
      prevFlights.map((flightItem) => {
        if (flightItem.id == flight.id) {
          ancillary.map((ancillaryItem) => {
            if (ancillaryItem.id == anciId) {
              if (ancillaryItem.type.shoppingItem) {
                flightItem.shoppingItems = [
                  ...flightItem.shoppingItems,
                  ancillaryItem.name,
                ];
              } else if (ancillaryItem.type.specialMeal) {
                flightItem.meals = [...flightItem.meals, ancillaryItem.name];
              } else {
                flightItem.ancillaryService = [
                  ...flightItem.ancillaryService,
                  ancillaryItem.name,
                ];
              }
              saveAncillaryItemInFlight(flightItem).then(() => {
                history.push("/admin/ancillarymaintanence");
              });
            }
          });
        }
      });
    });
  }

  return (
    <FlightForm
      flights={props.flights}
      flight={flight}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageFlight.propTypes = {
  flight: PropTypes.object.isRequired,
  flights: PropTypes.array.isRequired,
  ancillary: PropTypes.array.isRequired,
  loadFlight: PropTypes.func.isRequired,
  saveAncillaryItemInFlight: PropTypes.func.isRequired,
  loadAncillary: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getFlightById(flights, id) {
  return flights.find((flight) => flight.id == id) || null;
}

function mapStateToProps(state) {
  const flight = newFlight;
  return {
    flight,
    flights: state.flights,
    ancillary: state.ancillary,
  };
}

const mapDispatchToProps = {
  loadFlight,
  saveAncillaryItemInFlight,
  loadAncillary,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageFlight);
