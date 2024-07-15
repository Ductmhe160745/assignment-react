import axios from "axios";

const fetchAllAccidents = () => {
  return axios.get("http://localhost:9999/Accident");
};

const postAccident = (accident) => {
  return axios.post("http://localhost:9999/Accident", accident);
};

const putAccidents = (accident) => {
  return axios.put(`http://localhost:9999/Accident/${accident.id}`, accident);
};
export { fetchAllAccidents, postAccident, putAccidents };
