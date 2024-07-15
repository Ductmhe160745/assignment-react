import axios from "axios";

const fetchVehicle = () => {
  return axios.get("http://localhost:9999/Vehicles");
};

export { fetchVehicle };
