import axios from "axios";

const fetchUser = () => {
  return axios.get("http://localhost:9999/Users");
};

const postUser = (user) => {
  return axios.post("http://localhost:9999/Users", user);
};

const putUser = (user) => {
  return axios.put(`http://localhost:9999/Users/${user.id}`, user);
};

export { fetchUser, postUser, putUser };
