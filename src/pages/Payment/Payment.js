import React, { useContext, useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FaMotorcycle } from "react-icons/fa6";
import { addYears, format } from "date-fns";
import { parse } from "date-fns/parse";
import Header from "../../layouts/components/Header/Header";
import Footer from "../../layouts/components/Footer/Footer";
import "./Payment.css";
import { UserContext } from "../../context/UserContext";
import { ContractContext } from "../../context/ContractContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {
  const { customer, registration, addUser, addRegister } =
    useContext(UserContext);
  const { isLogin, user } = useContext(AuthContext);
  const {
    totalPayment,
    vehicleTypeContract,
    dateStart,
    duration,
    vehicleTypeNum,
    addContract,
  } = useContext(ContractContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [activeMethod, setActiveMethod] = useState("");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleCode = () => {
    const characters = "0123456789";
    let result = "";
    const length = 10;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  };

  const handlePay = async () => {
    const parsedStartDate = parse(dateStart, "dd/MM/yyyy", new Date());
    const endDate = addYears(parsedStartDate, duration);
    const formattedEndDate = format(endDate, "dd/MM/yyyy");
    const code = handleCode();
    const serviceId = "service_3z00zal";
    const templateId = "template_e6qkxnb";
    const publicKey = "k85o5juTw71kiQ3n_";

    const templateParams = {
      from_name: "F-care",
      form_email: isLogin ? user.email : customer.email,
      to_name: isLogin
        ? user.firstName + " " + user.lastName
        : customer.firstName + " " + customer.lastName,
      message: code,
    };
    try {
      if (!isLogin) {
        const newUserId = await addUser(customer);
        const newRegistrationId = await addRegister(registration);
        if (newUserId && newRegistrationId) {
          const newContract = {
            CustomerId: newUserId,
            VehicleRegistration: newRegistrationId,
            VehicleId: vehicleTypeNum,
            Code: code,
            StartDate: dateStart,
            EndDate: formattedEndDate,
            Payment: totalPayment,
          };
          await addContract(newContract);
        }
      } else {
        const newRegistrationId = await addRegister(registration);
        if (newRegistrationId) {
          const newContract = {
            CustomerId: user.id,
            VehicleRegistration: newRegistrationId,
            VehicleId: vehicleTypeNum,
            Code: code,
            StartDate: dateStart,
            EndDate: formattedEndDate,
            Payment: totalPayment,
          };
          await addContract(newContract);
        }
      }

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log("success", response);
        })
        .catch((error) => {
          console.log("error", error);
        });

      toast.success("Thanh toán thành công!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md={8}>
            <h1 className="title-paymentType">Chọn phương thức thanh toán</h1>
            <div className="payment-choice">
              <div
                className={`payment-method ${
                  activeMethod === "Momo" ? "active-payment" : ""
                }`}
                onClick={() => {
                  setIsChecked(true);
                  setActiveMethod("Momo");
                }}
              >
                <div className="img">
                  <img src="/images/momo.jpg" alt="" />
                </div>
                <div className="name">Ví Momo</div>
              </div>
              <div
                className={`payment-method ${
                  activeMethod === "VNPAY" ? "active-payment" : ""
                }`}
                onClick={() => {
                  setIsChecked(true);
                  setActiveMethod("VNPAY");
                }}
              >
                <div className="img">
                  <img src="/images/m6.png" alt="" />
                </div>
                <div className="name">Ví VNPAY</div>
              </div>
            </div>

            <h2 style={{ color: "#3f8dcb", margin: "24px 0" }}>
              Thông tin người nhận giấy Chứng nhận bảo hiểm
            </h2>
            <div className="info-customer">
              <div className="info-customer-wrapper">
                <span className="info-label">Họ tên: </span>
                <span className="info-value">
                  {isLogin
                    ? user.firstName + " " + user.lastName
                    : customer.firstName + " " + customer.lastName}
                </span>
              </div>
              <div className="info-customer-wrapper">
                <span className="info-label">Số điện thoại: </span>
                <span className="info-value">
                  {isLogin ? user.phone : customer.phone}{" "}
                </span>
              </div>
              <div className="info-customer-wrapper">
                <span className="info-label">Email: </span>
                <span className="info-value">
                  {isLogin ? user.email : customer.email}{" "}
                </span>
              </div>
              <div className="info-customer-wrapper">
                <span className="info-label">Địa chỉ: </span>
                <span className="info-value">
                  {isLogin ? user.address : customer.address}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
              <Link to="/declare-info">
                <button className="btn-back">Quay lại</button>
              </Link>
              <button
                onClick={handleShowModal}
                className={`btn-payment ${isChecked ? "" : "disable-btn"}`}
              >
                Thanh toán
              </button>
            </div>
          </Col>
          <Col md={4}>
            <div className="bill-form-wrapper">
              <div className="bill-header">
                <FaMotorcycle className="bill-icon" />
                <div className="bill-header-name">Bảo hiểm xe máy</div>
                <div className="bill-header-price">
                  {formatCurrency(totalPayment)}
                </div>
              </div>
              <div className="bill-body">
                <div className="bill-body-wrapper">
                  <span className="bill-body-name">Tên sản phẩm</span>
                  <span className="bill-body-value"> Bảo hiểm xe máy</span>
                </div>
                <div className="bill-body-wrapper">
                  <span className="bill-body-name">Loại xe: </span>
                  <span className="bill-body-value">{vehicleTypeContract}</span>
                </div>
                <div className="bill-body-wrapper">
                  <span className="bill-body-name">Ngày bắt đầu bảo hiểm </span>
                  <span className="bill-body-value">{dateStart}</span>
                </div>
                <div className="bill-body-wrapper">
                  <span className="bill-body-name">Thời hạn </span>
                  <span className="bill-body-value"> {duration} năm</span>
                </div>
                <div className="bill-body-wrapper">
                  <span>Phí bảo hiểm </span>
                  <span style={{ color: "#023d7a" }}>
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
              </div>
              <hr />
              <div className="bill-payment">
                <span style={{ fontSize: "20px", fontWeight: "600" }}>
                  Phí cần thanh toán
                </span>
                <span
                  style={{
                    color: "#023d7a",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {formatCurrency(totalPayment)}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn thanh toán không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handlePay}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default Payment;
