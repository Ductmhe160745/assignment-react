import axios from "axios";

const fetchRegistration = () => {
  return axios.get("http://localhost:9999/Registration");
};

const postRegister = (register) => {
  return axios.post("http://localhost:9999/Registration", register);
};

export { fetchRegistration, postRegister };
