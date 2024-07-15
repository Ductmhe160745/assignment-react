import { Col, Container, Row, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Divider, Table } from "antd";

import { FaRegFolderOpen } from "react-icons/fa6";

import { ContractContext } from "../../context/ContractContext";
import Header from "../../layouts/components/Header/Header";
import { UserContext } from "../../context/UserContext";
import { fetchVehicle } from "../../service/VehicleService";
import ModalContract from "../../layouts/components/ModalContract/ModalContract";
function SearchContract() {
  const { contracts } = useContext(ContractContext);
  const { registers, users } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [codeSearch, setCodeSearch] = useState("");
  const [isFind, setIsFind] = useState(false);
  const [contract, setContract] = useState({
    CustomerId: "",
    VehicleRegistration: "",
    VehicleId: "",
    Code: "",
    StartDate: "",
    EndDate: "",
    Payment: "",
  });

  useEffect(() => {
    getAllVehicle();
  }, []);

  const getAllVehicle = async () => {
    let res = await fetchVehicle();
    if (res && res.data) {
      setVehicles(res.data);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const contractFind = contracts.find(
      (contract) => contract.Code === codeSearch
    );
    if (contractFind) {
      setContract(contractFind);
      setIsFind(true);
    } else {
      setIsFind(false);
    }
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

  const showModal = () => {
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
      title: "Tên chủ xe",
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

  const data = isFind
    ? [
        {
          key: contract.Code,
          owner:
            handleSetRegister(contract.VehicleRegistration).firstName +
            " " +
            handleSetRegister(contract.VehicleRegistration).lastName,
          plate: handleSetRegister(contract.VehicleRegistration).plate,
          chassis: handleSetRegister(contract.VehicleRegistration).chassis,
          engine: handleSetRegister(contract.VehicleRegistration).engine,
          vehicleType: vehicles.find(
            (vehicle) => vehicle.id === contract.VehicleId
          ).name,
          startDate: contract.StartDate,
          endDate: contract.EndDate,
          details: (
            <span style={{ cursor: "pointer" }} onClick={showModal}>
              <FaRegFolderOpen style={{ color: "#54b4d3" }} />
            </span>
          ),
        },
      ]
    : [];

  return (
    <>
      <Header />
      <Container>
        <Row style={{ marginTop: "30px" }}>
          <Col>
            <h1 className="fw-bold text-danger" style={{ fontSize: "34px" }}>
              Tra cứu hợp đồng
            </h1>
          </Col>
          <Col>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    width: "400px",
                    height: "100%",
                  }}
                  placeholder="Nhập mã bảo hiểm"
                  value={codeSearch}
                  onChange={(e) => {
                    setCodeSearch(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </form>
          </Col>
        </Row>
        {isFind ? (
          <>
            <Divider />
            <Table columns={columns} dataSource={data} />
          </>
        ) : (
          <div style={{ marginTop: "50px" }}>
            <h1 className="text-center">Không có bảo hiểm</h1>
          </div>
        )}
      </Container>

      <ModalContract
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        contract={contract}
        vehicles={vehicles}
        handleSetRegister={handleSetRegister}
        handleSetCustomer={handleSetCustomer}
      />
    </>
  );
}

export default SearchContract;
