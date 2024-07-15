import { createContext, useEffect, useState } from "react";
import { fetchUser, postUser, putUser } from "../service/UserService";
import {
  fetchRegistration,
  postRegister,
} from "../service/RegistrationService";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [registers, setRegisters] = useState([]);
  const [customer, setCustomer] = useState({});
  const [registration, setRegistration] = useState({});

  useEffect(() => {
    getAllUser();
    getAllRegister();
  }, [users]);

  const getAllUser = async () => {
    let res = await fetchUser();
    if (res && res.data) {
      setUsers(res.data);
    }
  };

  const getAllRegister = async () => {
    let res = await fetchRegistration();
    if (res && res.data) {
      setRegisters(res.data);
    }
  };

  const addUser = async (user) => {
    const newUser = { ...user, id: (users.length + 1).toString() };
    const res = await postUser(newUser);
    if (res && res.data) {
      setUsers([...users, newUser]);
      return newUser.id; // Return the ID of the new user
    }
  };

  const addRegister = async (register) => {
    const newRegister = { ...register, id: (registers.length + 1).toString() };
    const res = await postRegister(newRegister);
    if (res && res.data) {
      setRegisters([...registers, newRegister]);
      return newRegister.id;
    }
  };

  const updateUser = async (user) => {
    const res = await putUser(user);
    if (res) {
      return true;
    }
  };
  const countCustomers = () => {
    return users.filter((user) => user.role === "customer").length;
  };

  const countStaffs = () => {
    return users.filter((user) => user.role === "staff").length;
  };

  const countMaleCustomers = () => {
    return users.filter(
      (user) => user.role === "customer" && user.gender === "male"
    ).length;
  };

  const countFemaleCustomers = () => {
    return users.filter(
      (user) => user.role === "customer" && user.gender === "female"
    ).length;
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        customer,
        setCustomer,
        registration,
        setRegistration,
        addRegister,
        updateUser,
        registers,
        countCustomers,
        countStaffs,
        countMaleCustomers,
        countFemaleCustomers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
