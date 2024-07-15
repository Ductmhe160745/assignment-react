import axios from "axios";

const fetchAllCompensation = () => {
  return axios.get("http://localhost:9999/Compensations");
};

const postCompensation = (compensation) => {
  return axios.post("http://localhost:9999/Compensations", compensation);
};
const putCompensation = (compensation) => {
  return axios.put(
    `http://localhost:9999/Compensations/${compensation.id}`,
    compensation
  );
};

export { fetchAllCompensation, putCompensation, postCompensation };
