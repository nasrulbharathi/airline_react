import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/user/";

export function getUserByUsername(username) {
  const url = baseUrl + "?username=" + username;
  console.log("baseUrl..", url);
  return fetch(url).then(handleResponse).catch(handleError);
}
