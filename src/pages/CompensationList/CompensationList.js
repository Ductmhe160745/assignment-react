import { useContext, useState } from "react";
import NavDashboard from "../../layouts/components/NavDashboard/NavDashboard";
import { AuthContext } from "../../context/AuthContext";
import { Container } from "react-bootstrap";
import { CompensationContext } from "../../context/CompensationContext";
import { ContractContext } from "../../context/ContractContext";
import { UserContext } from "../../context/UserContext";
import { Pagination, Modal, Button, Tabs, Input } from "antd";

function CompensationList() {
  const { user, handleLogout } = useContext(AuthContext);
  const { compensations, accidents, updateCompensation } =
    useContext(CompensationContext);
  const { contracts } = useContext(ContractContext);
  const { users } = useContext(UserContext);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getContract = (id) => {
    return contracts.find((contract) => contract.id === id);
  };

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

  const getAccident = (id) => {
    return accidents.find((accident) => accident.id === id);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccident, setSelectedAccident] = useState(null);
  const [editingCompensationId, setEditingCompensationId] = useState(null);
  const [editingNotes, setEditingNotes] = useState("");
  const pageSize = 10;
  const currentCompensations = compensations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const pendingCompensations = currentCompensations.filter(
    (comp) => comp.claimStatus === "pending"
  );
  const approvedCompensations = currentCompensations.filter(
    (comp) => comp.claimStatus !== "pending"
  );

  const showModal = (accidentId) => {
    const accident = getAccident(accidentId);
    setSelectedAccident(accident);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditNotes = (compensationId, notes) => {
    setEditingCompensationId(compensationId);
    setEditingNotes(notes);
  };

  const handleNotesChange = (e) => {
    setEditingNotes(e.target.value);
  };

  const saveNotes = (compensation) => {
    const updatedCompensation = { ...compensation, notes: editingNotes };
    updateCompensation(updatedCompensation);
    window.location.reload();
  };

  const handleChangeStatus = (compensation) => {
    const dateNow = new Date();

    updateCompensation({
      ...compensation,
      dateApproved: dateNow.toLocaleDateString(),
    });
  };

  const renderCompensationTable = (compensations, showButtons) => (
    <table className="posts-table">
      <thead>
        <tr className="users-table-info">
          <th>Mã bảo hiểm</th>
          <th>Khách hàng</th>
          <th>Tai nạn</th>
          <th>Chi phí sửa chữa</th>
          <th>Ngày làm đơn</th>
          <th>Ghi chú</th>
          <th>{showButtons ? "Xem xét đơn" : "Tình trạng"}</th>
        </tr>
      </thead>
      <tbody>
        {compensations.map((compensation, index) => {
          return (
            <tr key={index}>
              <td>{getContract(compensation.contractId)?.Code}</td>
              <td>
                {getUser(compensation.customerId)?.firstName +
                  " " +
                  getUser(compensation.customerId)?.lastName}
              </td>
              <td>
                <Button
                  type="link"
                  onClick={() => showModal(compensation.accidentId)}
                >
                  Chi tiết
                </Button>
              </td>
              <td>
                {formatCurrency(
                  getAccident(compensation.accidentId)?.estimatedRepairCost
                )}
              </td>
              <td>{compensation.dateFiled}</td>
              <td
                onClick={() =>
                  handleEditNotes(compensation.id, compensation.notes)
                }
              >
                {editingCompensationId === compensation.id ? (
                  <Input
                    value={editingNotes}
                    onChange={handleNotesChange}
                    onBlur={() => saveNotes(compensation)}
                    autoFocus
                  />
                ) : (
                  compensation.notes || "Nhấn để thêm ghi chú"
                )}
              </td>
              <td>
                {showButtons ? (
                  <div>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#52c41a",
                        borderColor: "#52c41a",
                        marginRight: "5px",
                      }}
                      onClick={() =>
                        handleChangeStatus({
                          ...compensation,
                          claimStatus: "approved",
                        })
                      }
                    >
                      Đồng ý
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() =>
                        handleChangeStatus({
                          ...compensation,
                          claimStatus: "rejected",
                        })
                      }
                    >
                      Từ chối
                    </Button>
                  </div>
                ) : (
                  <span
                    style={{
                      color:
                        compensation.claimStatus === "approved"
                          ? "#52c41a"
                          : "#ff4d4f",
                    }}
                  >
                    {compensation.claimStatus === "approved"
                      ? "Đồng ý"
                      : "Từ chối"}
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const tabItems = [
    {
      key: "1",
      label: "Duyệt đơn",
      children: renderCompensationTable(pendingCompensations, true),
    },
    {
      key: "2",
      label: "Đơn đã duyệt",
      children: renderCompensationTable(approvedCompensations, false),
    },
  ];

  return (
    <>
      <NavDashboard
        title={"Nhân viên"}
        user={user}
        handleLogout={handleLogout}
      />

      <div style={{ marginLeft: "250px" }}>
        <Container>
          <div className="users-table table-wrapper">
            <h2>Duyệt đơn</h2>
            <Tabs defaultActiveKey="1" items={tabItems} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={compensations.length}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: "20px", textAlign: "center" }}
              />
            </div>
          </div>
        </Container>
      </div>

      {selectedAccident && (
        <Modal
          title="Chi tiết tai nạn"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Ngày tai nạn: {selectedAccident.dateOfAccident}</p>
          <p>Vị trí tai nạn: {selectedAccident.accidentLocation}</p>
          <p>Số báo cáo của cảnh sát: {selectedAccident.policeReportNumber}</p>
          <p>Mô tả tai nạn: {selectedAccident.descriptionOfAccident}</p>
          <p>Thiệt hại xe: {selectedAccident.vehicleDamage}</p>
          <p>
            Chi phí sửa chữa ước tính:{" "}
            {formatCurrency(selectedAccident.estimatedRepairCost)}
          </p>
        </Modal>
      )}
    </>
  );
}

export default CompensationList;
