import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/passanger/";

export function getPassanger() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getPassangerByFlight(flight) {
  const url = baseUrl + "?flightName=" + flight;
  return fetch(url).then(handleResponse).catch(handleError);
}

export function createModifyPassanger(passanger) {
  return fetch(baseUrl + (passanger.id || ""), {
    method: passanger.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passanger),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePassanger(passangerId) {
  return fetch(baseUrl + passangerId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
