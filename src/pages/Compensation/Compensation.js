import { Container } from "react-bootstrap";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";

import Header from "../../layouts/components/Header/Header";
import Footer from "../../layouts/components/Footer/Footer";

import { AuthContext } from "../../context/AuthContext";
import { CompensationContext } from "../../context/CompensationContext";
import { ContractContext } from "../../context/ContractContext";
import { Link } from "react-router-dom";
function Compensation() {
  const { user } = useContext(AuthContext);
  const { compensations } = useContext(CompensationContext);
  const { contracts } = useContext(ContractContext);

  const columns = [
    {
      title: "Người làm đơn",
      dataIndex: "owner",
    },
    {
      title: "Mã bảo hiểm",
      dataIndex: "code",
    },
    {
      title: "Ngày làm đơn",
      dataIndex: "startDate",
    },
    {
      title: "Ngày duyệt đơn",
      dataIndex: "dateApproved",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Mô tả",
      dataIndex: "note",
    },
  ];

  const statusMap = {
    pending: { text: "Đang xử lý", color: "#d4b106" },
    rejected: { text: "Từ chối", color: "#ff4d4f" },
    approved: { text: "Đồng ý", color: "#52c41a" },
  };
  const getContract = (id) => {
    return contracts.find((contract) => contract.id === id);
  };

  const getStatusDisplay = (claimStatus) => {
    const status = statusMap[claimStatus];
    return (
      <span style={{ color: status ? status.color : "" }}>
        {status ? status.text : ""}
      </span>
    );
  };

  const data = compensations
    .filter((compensation) => compensation.customerId === user.id)
    .map((compensation, index) => {
      return {
        key: index,
        owner: user.firstName + " " + user.lastName,
        code: getContract(compensation.contractId)?.Code,
        startDate: compensation.dateFiled,
        dateApproved: compensation.dateApproved,
        status: getStatusDisplay(compensation.claimStatus),
        note: compensation.notes,
      };
    });

  return (
    <>
      <Header />

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <h2
            style={{ marginTop: "20px", fontWeight: "bold", fontSize: "26px" }}
          >
            Lịch sử yêu cầu đền bù
          </h2>

          <Link to="/compensation_request">
            <Button type="primary" icon={<PlusOutlined />}>
              Yêu cầu bồi thường
            </Button>
          </Link>
        </div>

        <Table columns={columns} dataSource={data} />
      </Container>

      {/* <Footer /> */}
    </>
  );
}

export default Compensation;
