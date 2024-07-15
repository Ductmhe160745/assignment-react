import { Modal } from "antd";
import "./Modal.css";
import { Col, Row, Table } from "react-bootstrap";

function ModalContract({
  open,
  handleOk,
  handleCancel,
  contract,
  handleSetRegister,
  vehicles,
  handleSetCustomer,
}) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <Modal
        open={open}
        title="Chi tiết hợp đồng"
        onOk={handleOk}
        onCancel={handleCancel}
        width="90vw"
        style={{ height: "100vh", flex: "5" }}
        styles={{ body: { height: "calc(80vh - 108px)", overflow: "auto" } }}
        cancelText="Đóng"
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
          </>
        )}
      >
        <div className="full-screen-modal-content">
          <Row>
            <Col md={6}>
              <span className="title-contract">Chương trình bảo hiểm</span>
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Mục </th>
                      <th>Thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Loại bảo hiểm</td>
                      <td>
                        {
                          vehicles.find(
                            (vehicle) => vehicle.id === contract.VehicleId
                          )?.name
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Thời gian bảo hiểm</td>
                      <td> {contract.StartDate + " - " + contract.EndDate} </td>
                    </tr>
                    <tr>
                      <td>Đã thanh toán</td>
                      <td>{formatCurrency(contract.Payment)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col md={6}>
              <span className="title-contract">Thông tin phương tiện</span>
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Tên trường</th>
                      <th>Thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tên chủ xe</td>
                      <td>
                        {handleSetRegister(contract.VehicleRegistration)
                          ?.firstName +
                          " " +
                          handleSetRegister(contract.VehicleRegistration)
                            ?.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Địa chỉ</td>
                      <td>
                        {
                          handleSetRegister(contract.VehicleRegistration)
                            ?.address
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Biển số xe</td>
                      <td>
                        {handleSetRegister(contract.VehicleRegistration)?.plate}
                      </td>
                    </tr>
                    <tr>
                      <td>Số máy </td>
                      <td>
                        {
                          handleSetRegister(contract.VehicleRegistration)
                            ?.engine
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Số khung</td>
                      <td>
                        {
                          handleSetRegister(contract.VehicleRegistration)
                            ?.chassis
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <span className="title-contract">Người yêu cầu bảo hiểm</span>
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Mục </th>
                      <th>Thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tên người yêu cầu</td>
                      <td>
                        {handleSetCustomer(contract.CustomerId)?.firstName +
                          " " +
                          handleSetCustomer(contract.CustomerId)?.lastName}
                      </td>
                    </tr>

                    <tr>
                      <td>Số điện thoại</td>
                      <td>{handleSetCustomer(contract.CustomerId)?.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{handleSetCustomer(contract.CustomerId)?.email}</td>
                    </tr>
                    <tr>
                      <td>Địa chỉ</td>
                      <td>{handleSetCustomer(contract.CustomerId)?.address}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export default ModalContract;
