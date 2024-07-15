import { Col, Container, Row, Card } from "react-bootstrap";
import Footer from "../../layouts/components/Footer/Footer";
import Header from "../../layouts/components/Header/Header";
import "./Insurance.css";
import { useContext, useEffect, useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchVehicle } from "../../service/VehicleService";
import { Link } from "react-router-dom";
import { ContractContext } from "../../context/ContractContext";
function Insurance() {
  const {
    setTotalPayment,
    setVehicleTypeContract,
    setDateStart,
    setDuration,
    setVehicleTypeNum,
  } = useContext(ContractContext);
  const [vehicles, setVehicle] = useState([]);
  const [total, setTotal] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleName, setVehicleName] = useState({});
  const [numberYear, setNumberYear] = useState(1);
  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextYearDate, setNextYearDate] = useState(new Date());
  const [showFee, setShowFee] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getVehicle();
    const current = new Date();
    setCurrentDate(current);
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + parseInt(numberYear));
    setNextYearDate(nextYear);
  }, [numberYear]);

  const getVehicle = async () => {
    const res = await fetchVehicle();
    if (res && res.data) {
      setVehicle(res.data);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleType != 0) {
      const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleType);
      setVehicleName(vehicle);
      setShowFee(true);
      setError("");
      setTotal(vehicle.price * parseInt(numberYear));
    } else {
      setError("Vui lòng chọn loại xe");
    }
  };
  return (
    <>
      <CustomModal
        content="Nhập biển số xe của bạn"
        show={show}
        handleClose={handleClose}
      />
      <Header />
      <div className="middle" style={{ marginBottom: "30px" }}>
        <div className="bg-img"></div>
        <div className="middle-content">
          <div className="f-title">BẢO HIỂM F-Care</div>
          <p className="f-quote">
            “Đến với F-Care, chúng tôi cung cấp cho bạn dịch vụ bảo hiểm xe máy
            với chi phí và chính sách tốt nhất.
            <br />
            Đồng hành cùng bạn mỗi bước đường. Bảo hiểm xe máy cho mọi hành
            trình!”
          </p>
        </div>
      </div>

      <Container>
        <div>
          <h2 className="insurance-title">Tính phí bảo hiểm</h2>
          <p>Hãy bắt đầu bằng cách nhập thông tin và ước tính chi phí.</p>

          <div className="search-insurance">
            <form style={{ margin: "5px 10px" }} onSubmit={handleSubmit}>
              <Row>
                <Col md={3}>
                  <div className="form-label-group">
                    <select
                      className="form-select"
                      onChange={(e) => {
                        setVehicleType(e.target.value);
                      }}
                    >
                      <option value="">Chọn loại xe</option>
                      {vehicles &&
                        vehicles.map((vehicle, index) => {
                          return (
                            <option key={index} value={vehicle.id}>
                              {vehicle.name}
                            </option>
                          );
                        })}
                    </select>
                    {error && <span className="error">{error}</span>}
                    <label className="color-label">Chọn loại xe</label>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="form-label-group">
                    <select
                      className="form-select"
                      onChange={(e) => {
                        setNumberYear(e.target.value);
                      }}
                    >
                      <option value={1}>1 năm</option>
                      <option value={2}>2 năm</option>
                      <option value={3}>3 năm</option>
                    </select>

                    <label className="color-label">Số năm bảo hiểm</label>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="form-label-group">
                    <div className="form-input">
                      {currentDate.toLocaleDateString()} -{" "}
                      {nextYearDate.toLocaleDateString()}
                    </div>
                    <span className="error"></span>
                    <label className="color-label">Thời hạn bảo hiểm</label>
                  </div>
                </Col>

                <Col md={3}>
                  <div>
                    <div className="wap_btn">
                      <button type="submit" className="btn_calculate">
                        Tính phí
                        <FontAwesomeIcon
                          className="icon-right"
                          icon={faChevronRight}
                        />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </div>

        <div className="card-container">
          <Card style={{ width: "258px" }}>
            <Card.Body style={{ padding: "0" }}>
              <Card.Title className="card-item-title text-center">
                BẢO HIỂM TRÁCH NHIỆM DÂN SỰ BẮT BUỘC
              </Card.Title>
              <div style={{ padding: "20px" }}>
                <span style={{ fontSize: "12px", color: "#a3a3a3" }}>
                  Tham gia gói bảo hiểm xe máy, khách hàng sẽ được buồi thường
                </span>
                <ul>
                  <li>
                    Thiệt hại về thân thế, tính mạng và tài sản đối với bên thứ
                    ba do xe gây ra
                  </li>
                  <li>
                    Thiệt hại về thân thể đối với người điều khiển xe và người
                    ngồi trên xe bị tai nạn khi đang ở trên xe, lên xuống xe
                    trong quá trình xe tham gia giao thông
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </div>

        {showFee && (
          <div className="fee-container">
            <Row style={{ padding: "10px" }}>
              <Col md={3}>
                <span className="fee-title">Chọn loại xe: </span>
                <span className="fee-type">
                  <strong>{vehicleName.name}</strong>
                </span>
              </Col>
              <Col md={3}>
                <span className="fee-title">Thời hạn bảo hiểm: </span>
                <span className="fee-type">
                  <strong>
                    {" "}
                    {currentDate.toLocaleDateString()} -{" "}
                    {nextYearDate.toLocaleDateString()}
                  </strong>
                </span>
              </Col>

              <Col md={3}>
                <span style={{ fontSize: "16px" }}>Thành tiền: </span>
                <span style={{ fontSize: "16px" }}>
                  <strong>{formatCurrency(total)}</strong>
                </span>
              </Col>
              <Col md={3}>
                <Link
                  to="/declare-info"
                  onClick={() => {
                    setTotalPayment(total);
                    setVehicleTypeContract(vehicleType);
                    setDateStart(currentDate.toLocaleDateString());
                    setDuration(numberYear);
                    setVehicleTypeNum(vehicleType);
                  }}
                >
                  <button className="btn_calculate">Đặt mua</button>
                </Link>
              </Col>
            </Row>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default Insurance;
