import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/ancillary/";

export function getAncillary() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function createModifyAncillary(ancillary) {
  return fetch(baseUrl + (ancillary.id || ""), {
    method: ancillary.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ancillary),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAncillary(ancillaryId) {
  return fetch(baseUrl + ancillaryId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
