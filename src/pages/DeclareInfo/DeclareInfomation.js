import { Col, Container, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";

import "react-datepicker/dist/react-datepicker.css";
import Header from "../../layouts/components/Header/Header";
import "./DeclareInfomation.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function DeclareInformation() {
  const { setCustomer, setRegistration } = useContext(UserContext);
  const { isLogin, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "customer",
    gender: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    status: "active",
  });

  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    identify: "",
    address: "",
    engine: "",
    chassis: "",
    plate: "",
  });
  const [focus, setFocus] = useState({
    firstName: false,
    lastName: false,
    dob: false,
    phone: false,
    email: false,
    gender: false,
    identify: false,
    firstNameRes: false,
    lastNameRes: false,
    engine: false,
    chassis: false,
    plate: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedConfirm, setIsCheckedConfirm] = useState(false);

  const [showStep, setShowStep] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [activeTab, setActiveTab] = useState("step1");
  const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [districtsReg, setDistrictsReg] = useState([]);
  const [wardsReg, setWardsReg] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [provinceReg, setProvinceReg] = useState("");
  const [districtReg, setDistrictReg] = useState("");
  const [wardReg, setWardReg] = useState("");
  useEffect(() => {
    if (isLogin) {
      setFormData(user);
    }
    fetchDistrict();
  }, [isLogin, user]);
  useEffect(() => {
    if (province) {
      const selectedProvince = provinces.find((prov) => prov.Name === province);
      setDistricts(selectedProvince.Districts);
    }
    if (district && districts) {
      const selectedDistrict = districts.find((prov) => prov.Name === district);
      setWards(selectedDistrict?.Wards);
    }

    if (provinceReg) {
      const selectedProvince = provinces.find(
        (prov) => prov.Name === provinceReg
      );
      setDistrictsReg(selectedProvince.Districts);
    }
    if (districtReg && districtsReg) {
      const selectedDistrict = districtsReg.find(
        (prov) => prov.Name === districtReg
      );
      setWardsReg(selectedDistrict?.Wards);
    }
  }, [
    province,
    provinces,
    provinceReg,
    district,
    districts,
    districtReg,
    districtsReg,
    formData,
  ]);

  const fetchDistrict = async () => {
    const res = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );

    if (res && res.data) {
      setProvinces(res.data);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) {
      setErrors({ ...errors, [name]: "" });
      if (name === "phone" && !/^\d{10}$/.test(value)) {
        setErrors({ ...errors, phone: "Số điện thoại không hợp lệ." });
      }

      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors({ ...errors, email: "Email không hợp lệ." });
      }
    }
  };

  const handleInputResChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFocus({ ...focus, [name]: true });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFocus({ ...focus, [name]: false });
  };

  const isValidAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    return (
      age > 18 ||
      (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    );
  };
  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.firstName || !formData.lastName)
      newErrors.name = "Vui lòng nhập họ tên.";
    if (!formData.dob) {
      newErrors.dob = "Vui lòng nhập ngày sinh.";
    } else if (!isValidAge(formData.dob)) {
      newErrors.dob = "Bạn phải đủ 18 tuổi.";
    }
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
    }
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính.";
    if (!isLogin) {
      if (!province) newErrors.province = "Vui lòng chọn tỉnh/thành phố.";
      if (!district) newErrors.district = "Vui lòng chọn quận/huyện.";
      if (!ward) newErrors.ward = "Vui lòng chọn phường/xã.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (!isLogin) {
        setCustomer({
          ...formData,
          address: ward + ", " + district + ", " + province,
        });
      }
      setShowStep(true);
      setActiveTab("step2");
    }
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!registrationData.firstName || !registrationData.lastName)
      newErrors.name = "Vui lòng nhập họ tên.";
    if (!registrationData.identify)
      newErrors.identify = "Vui lòng nhập CMND/CCCD";
    if (!isLogin) {
      if (!provinceReg) newErrors.province = "Vui lòng chọn tỉnh/thành phố.";
      if (!districtReg) newErrors.district = "Vui lòng chọn quận/huyện.";
      if (!wardReg) newErrors.ward = "Vui lòng chọn phường/xã.";
    }
    if (!registrationData.plate)
      newErrors.plate = "Vui lòng nhập biển kiếm soát.";
    if (!registrationData.chassis)
      newErrors.chassis = "Vui lòng nhập số khung.";
    if (!registrationData.engine) newErrors.engine = "Vui lòng nhập số máy.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setRegistration({
        ...registrationData,
        address: isLogin
          ? formData.address
          : wardReg + ", " + districtReg + ", " + provinceReg,
      });
      setShowStep2(true);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFillInfo = () => {
    if (!isChecked) {
      setRegistrationData({
        ...registrationData,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
      });
      setProvinceReg(province);
      setDistrictReg(district);
      setWardReg(ward);
      setIsChecked(true);
    } else {
      setRegistrationData({
        ...registrationData,
        firstName: "",
        lastName: "",
      });
      setProvinceReg("");
      setDistrictReg("");
      setWardReg("");
      setIsChecked(false);
    }
  };
  return (
    <div>
      <Header />
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <Col md={1}></Col>
          <Col md={9}>
            <div className="form-declare">
              <ul className="menu_tab_cus d-flex justify-content-center">
                <li>
                  <a
                    href="#step1"
                    className={activeTab === "step1" ? "border-active" : ""}
                    onClick={() => handleTabClick("step1")}
                  >
                    Thông tin người yêu cầu bảo hiểm
                  </a>
                </li>
                <li>
                  <a
                    href="#step2"
                    className={activeTab === "step2" ? "border-active" : ""}
                    onClick={() => handleTabClick("step2")}
                  >
                    Thông tin xe
                  </a>
                </li>
              </ul>
              <div id="step1" className="claimant-information">
                <div className="title-wrapper">
                  <h2>Thông tin người yêu cầu bảo hiểm</h2>
                  {showStep ? (
                    <div>
                      <span
                        style={{
                          color: "#005cab",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                        onClick={() => {
                          setShowStep(false);
                          setIsChecked(false);
                        }}
                      >
                        Chỉnh sửa <FiEdit />
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {showStep && (
                  <div className="claimant-information--form">
                    <Row>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Họ</span>
                          <span>{formData.firstName}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Tên</span>
                          <span>{formData.lastName}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Ngày sinh</span>
                          <span>{formData.dob}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Giới tính</span>
                          <span>
                            {formData.gender === "male" ? "Nam" : "Nữ"}
                          </span>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>
                            Số điện thoại
                          </span>
                          <span>{formData.phone}</span>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Email</span>
                          <span>{formData.email}</span>
                        </div>
                      </Col>
                      {isLogin ? (
                        <Col md={6}>
                          <div
                            className="d-flex justify-content-between"
                            style={{ marginBottom: "20px", width: "85%" }}
                          >
                            <span style={{ color: "#969696" }}>Địa chỉ</span>
                            <span>{formData.address}</span>
                          </div>
                        </Col>
                      ) : (
                        <>
                          <Col md={6}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ marginBottom: "20px", width: "85%" }}
                            >
                              <span style={{ color: "#969696" }}>Tỉnh/TP</span>
                              <span>{province}</span>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ marginBottom: "20px", width: "85%" }}
                            >
                              <span style={{ color: "#969696" }}>
                                Quận/Huyện
                              </span>
                              <span>{district}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ marginBottom: "20px", width: "85%" }}
                            >
                              <span style={{ color: "#969696" }}>
                                Phường/Xã
                              </span>
                              <span>{ward}</span>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                  </div>
                )}
                {!showStep && (
                  <form onSubmit={handleSubmitStep1}>
                    <div className="claimant-information--form">
                      <Row>
                        <Col md={6}>
                          <div className="form--group">
                            <input
                              type="text"
                              className={`form-control-declare ${
                                isLogin ? "disable" : ""
                              }`}
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            <span
                              className={`placeholder ${
                                formData.firstName || focus.firstName
                                  ? "active-placeholder "
                                  : ""
                              }`}
                            >
                              Họ
                              <i className="text-danger">*</i>
                            </span>
                            <span className="error-form"> {errors.name}</span>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="form--group">
                            <input
                              type="text"
                              className={`form-control-declare ${
                                isLogin ? "disable" : ""
                              }`}
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            <span
                              className={`placeholder ${
                                formData.lastName || focus.lastName
                                  ? "active-placeholder "
                                  : ""
                              }`}
                            >
                              Tên
                              <i className="text-danger">*</i>
                            </span>
                            <span className="error-form"> {errors.name}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form--group">
                            <input
                              className={`form-control-declare ${
                                isLogin ? "disable" : ""
                              }`}
                              type="date"
                              value={formData.dob}
                              onChange={handleInputChange}
                              format="dd/MM/yyyy"
                              name="dob"
                              onFocus={() => setFocus({ ...focus, dob: true })}
                              onBlur={() => setFocus({ ...focus, dob: false })}
                            />
                            <span className="placeholder active-placeholder">
                              Ngày sinh người yêu cầu bảo hiểm
                              <i className="text-danger">*</i>
                            </span>
                            <span className="error-form">{errors.dob}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form--group">
                            <select
                              value={formData.gender}
                              onChange={handleInputChange}
                              name="gender"
                              className={`form-control-declare ${
                                isLogin ? "disable" : ""
                              }`}
                            >
                              <option value="">Giới tính</option>
                              <option value="male">Nam</option>
                              <option value="female">Nữ</option>
                            </select>
                            <span className="placeholder active-placeholder">
                              Giới tính
                              <i className="text-danger">*</i>
                            </span>
                            <span className="error-form">{errors.gender}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form--group">
                            <input
                              type="text"
                              className={`form-control-declare ${
                                isLogin ? "disable" : ""
                              }`}
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            <span
                              className={`placeholder ${
                                formData.phone || focus.phone
                                  ? "active-placeholder "
                                  : ""
                              }`}
                            >
                              Số điện thoại
                              <i className="text-danger">*</i>
                            </span>
                            <span className="error-form">{errors.phone}</span>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="form--group">
                            <input
                              type="text"
                              className={`form-control-declare ${
                                isLogin ? "disable" : ""
                              }`}
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            <span
                              className={`placeholder ${
                                formData.email || focus.email
                                  ? "active-placeholder "
                                  : ""
                              }`}
                            >
                              Email
                              <i className="text-danger">*</i>
                            </span>
                            <span className="error-form">{errors.email}</span>
                          </div>
                        </Col>

                        {isLogin ? (
                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className={`form-control-declare ${
                                  isLogin ? "disable" : ""
                                }`}
                                name="email"
                                value={formData.address}
                                onChange={handleInputChange}
                              />
                              <span className="placeholder  active-placeholder">
                                Địa chỉ
                                <i className="text-danger">*</i>
                              </span>
                            </div>
                          </Col>
                        ) : (
                          <>
                            <Col md={6}>
                              <div className="form--group">
                                <select
                                  value={province}
                                  onChange={(e) => {
                                    setProvince(e.target.value);
                                  }}
                                  className="form-control-declare"
                                >
                                  <option value="">Tỉnh/Thành phố</option>
                                  {provinces.map((province, index) => {
                                    return (
                                      <option key={index} value={province.Name}>
                                        {province.Name}
                                      </option>
                                    );
                                  })}
                                </select>

                                <span className="placeholder active-placeholder">
                                  Tỉnh/Thành phố
                                  <i className="text-danger">*</i>
                                </span>
                                <span className="error-form">
                                  {errors.province}
                                </span>
                              </div>
                            </Col>

                            <Col md={6}>
                              <div className="form--group">
                                <select
                                  value={district}
                                  onChange={(e) => {
                                    setDistrict(e.target.value);
                                  }}
                                  className="form-control-declare"
                                >
                                  <option value="">Quận/Huyện</option>
                                  {districts &&
                                    districts.map((district, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={district.Name}
                                        >
                                          {district.Name}
                                        </option>
                                      );
                                    })}
                                </select>

                                <span className="placeholder active-placeholder">
                                  Quận/Huyện
                                  <i className="text-danger">*</i>
                                </span>
                                <span className="error-form">
                                  {errors.district}
                                </span>
                              </div>
                            </Col>

                            <Col md={6}>
                              <div className="form--group">
                                <select
                                  value={ward}
                                  onChange={(e) => {
                                    setWard(e.target.value);
                                  }}
                                  className="form-control-declare"
                                >
                                  <option value="">Phường/Xã</option>
                                  {wards &&
                                    wards.map((ward, index) => {
                                      return (
                                        <option key={index} value={ward.Name}>
                                          {ward.Name}
                                        </option>
                                      );
                                    })}
                                </select>

                                <span className="placeholder active-placeholder">
                                  Phường/Xã
                                  <i className="text-danger">*</i>
                                </span>
                                <span className="error-form">
                                  {errors.ward}
                                </span>
                              </div>
                            </Col>
                          </>
                        )}
                      </Row>
                      <button className="btn_calculate" type="submit">
                        Lưu
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div id="step2" className="claimant-information">
                <div className="title-wrapper">
                  <p style={{ fontSize: "24px" }}>
                    <strong>Thông tin xe</strong> (theo đăng ký xe)
                  </p>
                  {showStep2 ? (
                    <div>
                      <span
                        style={{
                          color: "#005cab",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                        onClick={() => {
                          setShowStep2(false);
                          setIsChecked(false);
                        }}
                      >
                        Chỉnh sửa <FiEdit />
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {!showStep2 && showStep && (
                  <>
                    <div className="input-checkbox-declare">
                      <input
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        type="checkbox"
                        id="checkbox-declare"
                        onClick={handleFillInfo}
                      />
                      <label
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        htmlFor="checkbox-declare"
                      >
                        Chủ xe cũng là người yêu cầu bảo hiểm
                      </label>
                    </div>
                    <form onSubmit={handleSubmitStep2}>
                      <div className="claimant-information--form">
                        <Row>
                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className={`form-control-declare ${
                                  isChecked ? "disable" : ""
                                }`}
                                name="firstName"
                                value={registrationData.firstName}
                                onChange={handleInputResChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                              />
                              <span
                                className={`placeholder ${
                                  registrationData.firstName ||
                                  focus.firstNameRes
                                    ? "active-placeholder "
                                    : ""
                                }`}
                              >
                                Họ
                                <i className="text-danger">*</i>
                              </span>
                              <span className="error-form"> {errors.name}</span>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className={`form-control-declare ${
                                  isChecked ? "disable" : ""
                                }`}
                                name="lastName"
                                value={registrationData.lastName}
                                onChange={handleInputResChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                              />
                              <span
                                className={`placeholder ${
                                  registrationData.lastName || focus.lastNameRes
                                    ? "active-placeholder "
                                    : ""
                                }`}
                              >
                                Tên
                                <i className="text-danger">*</i>
                              </span>
                              <span className="error-form"> {errors.name}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className="form-control-declare"
                                name="identify"
                                value={registrationData.identify}
                                onChange={handleInputResChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                              />
                              <span
                                className={`placeholder ${
                                  registrationData.identify || focus.identify
                                    ? "active-placeholder "
                                    : ""
                                }`}
                              >
                                Số CMND/CCCD
                                <i className="text-danger">*</i>
                              </span>
                              <span className="error-form">
                                {" "}
                                {errors?.identify}
                              </span>
                            </div>
                          </Col>
                          {isLogin && isChecked ? (
                            <Col md={6}>
                              <div className="form--group">
                                <input
                                  type="text"
                                  className={`form-control-declare ${
                                    isChecked ? "disable" : ""
                                  }`}
                                  name="lastName"
                                  value={registrationData.address}
                                  onChange={handleInputResChange}
                                  onFocus={handleFocus}
                                  onBlur={handleBlur}
                                />
                                <span
                                  className={`placeholder ${
                                    registrationData.lastName ||
                                    focus.lastNameRes
                                      ? "active-placeholder "
                                      : ""
                                  }`}
                                >
                                  Địa chỉ
                                  <i className="text-danger">*</i>
                                </span>
                                {/* <span className="error-form">
                                  {errors.name}
                                </span> */}
                              </div>
                            </Col>
                          ) : (
                            <>
                              <Col md={6}>
                                <div className="form--group">
                                  <select
                                    value={provinceReg}
                                    onChange={(e) => {
                                      setProvinceReg(e.target.value);
                                    }}
                                    className={`form-control-declare ${
                                      isChecked ? "disable" : ""
                                    }`}
                                  >
                                    <option value="">Tỉnh/Thành phố</option>
                                    {provinces.map((province, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={province.Name}
                                        >
                                          {province.Name}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <span className="placeholder active-placeholder">
                                    Tỉnh/Thành phố
                                    <i className="text-danger">*</i>
                                  </span>
                                  <span className="error-form">
                                    {errors?.province}
                                  </span>
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="form--group">
                                  <select
                                    value={districtReg}
                                    onChange={(e) => {
                                      setDistrictReg(e.target.value);
                                    }}
                                    className={`form-control-declare ${
                                      isChecked ? "disable" : ""
                                    }`}
                                  >
                                    <option value="">Quận/Huyện</option>
                                    {districtsReg &&
                                      districtsReg.map((district, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={district.Name}
                                          >
                                            {district.Name}
                                          </option>
                                        );
                                      })}
                                  </select>

                                  <span className="placeholder active-placeholder">
                                    Quận/Huyện
                                    <i className="text-danger">*</i>
                                  </span>
                                  <span className="error-form">
                                    {errors?.district}
                                  </span>
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="form--group">
                                  <select
                                    value={wardReg}
                                    onChange={(e) => {
                                      setWardReg(e.target.value);
                                    }}
                                    className={`form-control-declare ${
                                      isChecked ? "disable" : ""
                                    }`}
                                  >
                                    <option value="">Phường/Xã</option>
                                    {wardsReg &&
                                      wardsReg.map((ward, index) => {
                                        return (
                                          <option key={index} value={ward.Name}>
                                            {ward.Name}
                                          </option>
                                        );
                                      })}
                                  </select>

                                  <span className="placeholder active-placeholder">
                                    Phường/Xã
                                    <i className="text-danger">*</i>
                                  </span>
                                  <span className="error-form">
                                    {errors?.ward}
                                  </span>
                                </div>
                              </Col>
                            </>
                          )}
                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className="form-control-declare"
                                name="plate"
                                value={registrationData.plate}
                                onChange={handleInputResChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                              />
                              <span
                                className={`placeholder ${
                                  registrationData.plate || focus.plate
                                    ? "active-placeholder "
                                    : ""
                                }`}
                              >
                                Biểm kiểm soát
                                <i className="text-danger">*</i>
                              </span>
                              <span className="error-form">
                                {" "}
                                {errors?.plate}
                              </span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className="form-control-declare"
                                name="chassis"
                                value={registrationData.chassis}
                                onChange={handleInputResChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                              />
                              <span
                                className={`placeholder ${
                                  registrationData.chassis || focus.chassis
                                    ? "active-placeholder "
                                    : ""
                                }`}
                              >
                                Số khung
                                <i className="text-danger">*</i>
                              </span>
                              <span className="error-form">
                                {" "}
                                {errors?.chassis}
                              </span>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="form--group">
                              <input
                                type="text"
                                className="form-control-declare"
                                name="engine"
                                value={registrationData.engine}
                                onChange={handleInputResChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                              />
                              <span
                                className={`placeholder ${
                                  registrationData.engine || focus.engine
                                    ? "active-placeholder "
                                    : ""
                                }`}
                              >
                                Số máy
                                <i className="text-danger">*</i>
                              </span>
                              <span className="error-form">
                                {" "}
                                {errors?.engine}
                              </span>
                            </div>
                          </Col>
                        </Row>
                        <button className="btn_calculate" type="submit">
                          Lưu
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {showStep2 && (
                  <div className="claimant-information--form">
                    <Row>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Họ</span>
                          <span>{registrationData.firstName}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Tên</span>
                          <span>{registrationData.lastName}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Số CMND/CCCD</span>
                          <span>{registrationData.identify}</span>
                        </div>
                      </Col>
                      {isLogin ? (
                        <Col md={6}>
                          <div
                            className="d-flex justify-content-between"
                            style={{ marginBottom: "20px", width: "85%" }}
                          >
                            <span style={{ color: "#969696" }}>Địa chỉ</span>
                            <span>{registrationData.address}</span>
                          </div>
                        </Col>
                      ) : (
                        <>
                          <Col md={6}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ marginBottom: "20px", width: "85%" }}
                            >
                              <span style={{ color: "#969696" }}>Tỉnh/TP</span>
                              <span>{province}</span>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ marginBottom: "20px", width: "85%" }}
                            >
                              <span style={{ color: "#969696" }}>
                                Quận/Huyện
                              </span>
                              <span>{district}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ marginBottom: "20px", width: "85%" }}
                            >
                              <span style={{ color: "#969696" }}>
                                Phường/Xã
                              </span>
                              <span>{ward}</span>
                            </div>
                          </Col>
                        </>
                      )}
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>
                            Biển kiểm soát
                          </span>
                          <span>{registrationData.plate}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Số khung</span>
                          <span>{registrationData.chassis}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "20px", width: "85%" }}
                        >
                          <span style={{ color: "#969696" }}>Số máy</span>
                          <span>{registrationData.engine}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>

        {showStep && showStep2 && (
          <div className="step-final">
            <div>
              <input
                type="checkbox"
                id="confirm-check"
                onChange={() => {
                  setIsCheckedConfirm(!isCheckedConfirm);
                }}
              />
              <label htmlFor="confirm-check">Tôi cam kết là đồng ý rằng</label>
            </div>
            <div>
              <p>
                - Tất cả những thông tin khai nêu trên là đúng và sẽ thông báo
                cho bảo hiểm Bảo Việt khi có bất cứ thông tin nào thay đổi.
                <br></br>- Đơn bảo hiểm sẽ là cơ sở của hợp đồng giữa tôi và bảo
                hiểm Bảo Việt và tôi sẽ chấp nhận tất cả các điều khoản mà bảo
                hiểm Bảo Việt quy định trong đơn bảo hiểm và nộp phí bảo hiểm
                đúng theo quy định.
              </p>
            </div>
          </div>
        )}

        <div
          className="d-flex justify-content-center"
          style={{
            margin: "50px auto 50px 0",
          }}
        >
          <Link to="/insurance">
            <button className="btn_calculate">Quay lại</button>
          </Link>
          <Link to="/payment" style={{ marginLeft: "50px" }}>
            <button disabled={!isCheckedConfirm} className="btn_calculate">
              Tiếp tục
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default DeclareInformation;
