import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Divider, Table } from "antd";
import { FaRegFolderOpen } from "react-icons/fa6";

import Header from "../../layouts/components/Header/Header";
import { AuthContext } from "../../context/AuthContext";
import { ContractContext } from "../../context/ContractContext";
import { fetchVehicle } from "../../service/VehicleService";
import { UserContext } from "../../context/UserContext";
import ModalContract from "../../layouts/components/ModalContract/ModalContract";

function ContractList() {
  const { user } = useContext(AuthContext);
  const { contracts } = useContext(ContractContext);
  const [vehicles, setVehicles] = useState([]);
  const { registers, users } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    getAllVehicle();
  }, []);

  const getAllVehicle = async () => {
    let res = await fetchVehicle();
    if (res && res.data) {
      setVehicles(res.data);
    }
  };

  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.name : "Unknown Vehicle";
  };

  const handleSetRegister = (id) => {
    const find = registers.find((register) => register.id === id);
    if (find) {
      return find;
    }
  };

  const handleSetCustomer = (id) => {
    const find = users.find((customer) => (customer.id = id));
    if (find) {
      return find;
    }
  };
  const showModal = (contract) => {
    setSelectedContract(contract);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "owner",
    },
    {
      title: "Biến số xe",
      dataIndex: "plate",
    },
    {
      title: "Số khung",
      dataIndex: "chassis",
    },
    {
      title: "Số máy",
      dataIndex: "engine",
    },
    {
      title: "Loại phương tiện",
      dataIndex: "vehicleType",
    },
    {
      title: "Ngày hiệu lực",
      dataIndex: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
    },
    {
      title: "Chi tiết",
      dataIndex: "details",
    },
  ];

  const data = contracts
    .filter((contract) => contract.CustomerId === user.id)
    .map((contract) => {
      return {
        key: contract.id,
        owner: user.firstName + " " + user.lastName,
        plate: handleSetRegister(contract.VehicleRegistration).plate,
        chassis: handleSetRegister(contract.VehicleRegistration).chassis,
        engine: handleSetRegister(contract.VehicleRegistration).engine,
        vehicleType: getVehicleName(contract.VehicleId),
        startDate: contract.StartDate,
        endDate: contract.EndDate,
        details: (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showModal(contract)}
          >
            <FaRegFolderOpen style={{ color: "#54b4d3" }} />
          </span>
        ),
      };
    });

  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center" style={{ marginTop: "50px" }}>
          Danh sách bảo hiểm
        </h1>

        <Divider />
        <Table columns={columns} dataSource={data} />
      </Container>

      {selectedContract && (
        <ModalContract
          open={open}
          handleCancel={handleCancel}
          handleOk={handleOk}
          contract={selectedContract}
          vehicles={vehicles}
          handleSetRegister={handleSetRegister}
          handleSetCustomer={handleSetCustomer}
        />
      )}
    </>
  );
}

export default ContractList;
