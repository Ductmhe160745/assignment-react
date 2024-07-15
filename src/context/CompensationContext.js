import { createContext, useEffect, useState } from "react";
import {
  fetchAllCompensation,
  postCompensation,
  putCompensation,
} from "../service/CompensationService";
import { fetchAllAccidents, postAccident } from "../service/AccidentService";

export const CompensationContext = createContext();
function CompensationProvider({ children }) {
  const [compensations, setCompensations] = useState([]);
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    getAllCompensation();
    getAllAccidents();
  }, [compensations]);

  const getAllCompensation = async () => {
    const res = await fetchAllCompensation();
    if (res && res.data) {
      setCompensations(res.data);
    }
  };

  const getAllAccidents = async () => {
    const res = await fetchAllAccidents();
    if (res && res.data) {
      setAccidents(res.data);
    }
  };

  const addCompensation = async (compensation) => {
    await postCompensation({
      ...compensation,
      id: compensations.length + 1 + "",
    });
  };

  const addAccident = async (accident) => {
    const newAccident = { ...accident, id: (accidents.length + 1).toString() };

    const res = await postAccident(newAccident);
    if (res && res.data) {
      setAccidents([...accidents, newAccident]);
      return newAccident.id;
    }
  };

  const updateCompensation = async (compensation) => {
    await putCompensation(compensation);
  };

  const totalCompensation = compensations.length;
  const totalAccident = accidents.length;

  const countPending = () => {
    return compensations.filter(
      (compensation) => compensation.claimStatus === "pending"
    ).length;
  };

  const countApproved = () => {
    return compensations.filter(
      (compensation) => compensation.claimStatus === "approved"
    ).length;
  };

  const countRejected = () => {
    return compensations.filter(
      (compensation) => compensation.claimStatus === "rejected"
    ).length;
  };
  return (
    <CompensationContext.Provider
      value={{
        compensations,
        accidents,
        totalCompensation,
        totalAccident,
        addCompensation,
        addAccident,
        updateCompensation,
        countApproved,
        countPending,
        countRejected,
      }}
    >
      {children}
    </CompensationContext.Provider>
  );
}

export default CompensationProvider;
