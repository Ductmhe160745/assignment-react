import axios from "axios";

const fetchContract = () => {
  return axios.get("http://localhost:9999/Contracts");
};

const postContract = (contract) => {
  return axios.post("http://localhost:9999/Contracts", contract);
};

export { fetchContract, postContract };
