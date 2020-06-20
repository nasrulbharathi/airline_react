import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/flight/";

export function getFlight() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getFlightByName(flight) {
  const url = baseUrl + "?name=" + flight;
  return fetch(url).then(handleResponse).catch(handleError);
}

export function createModifyFlight(flight) {
  return fetch(baseUrl + (flight.id || ""), {
    method: flight.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(flight),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteFlight(flightId) {
  return fetch(baseUrl + flightId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
