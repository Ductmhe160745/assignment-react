import { createContext, useEffect, useState } from "react";
import { fetchContract, postContract } from "../service/ContractService";

export const ContractContext = createContext();
function ContractProvider({ children }) {
  const [contracts, setContracts] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [vehicleTypeContract, setVehicleTypeContract] = useState("");
  const [vehicleTypeNum, setVehicleTypeNum] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    getAllContracts();
  }, [contracts]);

  const getAllContracts = async () => {
    let res = await fetchContract();
    if (res && res.data) {
      setContracts(res.data);
    }
  };

  const addContract = async (contract) => {
    await postContract({ ...contract, id: contracts.length + 1 + "" });
  };

  const totalContract = contracts.length;
  const totalAllPayment = () => {
    return contracts.reduce((pre, current) => {
      return pre + current.Payment;
    }, 0);
  };

  const calculateMonthlyRevenue = () => {
    const monthlyRevenue = Array(12).fill(0);
    contracts.forEach((contract) => {
      const [day, month, year] = contract.StartDate.split("/").map(Number);
      const monthIndex = month - 1;
      monthlyRevenue[monthIndex] += contract.Payment;
    });

    return monthlyRevenue;
  };
  return (
    <ContractContext.Provider
      value={{
        totalPayment,
        setTotalPayment,
        vehicleTypeContract,
        setVehicleTypeContract,
        dateStart,
        setDateStart,
        duration,
        setDuration,
        addContract,
        vehicleTypeNum,
        setVehicleTypeNum,
        contracts,
        totalContract,
        totalAllPayment,
        calculateMonthlyRevenue,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export default ContractProvider;
