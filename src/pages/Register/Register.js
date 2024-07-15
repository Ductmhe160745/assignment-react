import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../../layouts/components/Footer/Footer";
import Header from "../../layouts/components/Header/Header";
import "./Register.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    id: 0,
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
    image: "",
  });

  const { users, addUser } = useContext(UserContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userExist: "",
    emailExist: "",
    phoneExist: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(0|\+84)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const isUserExist = (username) => {
    return users.some((user) => user.username === username);
  };
  const isEmailExist = (email) => {
    return users.some((user) => user.email === email);
  };
  const isPhoneExist = (phone) => {
    return users.some((user) => user.phone === phone);
  };

  const handleAdd = () => {
    let newErrors = {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      userExist: "",
      emailExist: "",
      phoneExist: "",
    };

    if (newUser.password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp";
    }

    if (!validateEmail(newUser.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!validatePhone(newUser.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (isUserExist(newUser.username)) {
      newErrors.userExist = "Tên đăng nhập đã tồn tại";
    }
    if (isEmailExist(newUser.email)) {
      newErrors.emailExist = "Email đã tồn tại";
    }
    if (isPhoneExist(newUser.phone)) {
      newErrors.phoneExist = "Số điện thoại đã tồn tại";
    }

    if (Object.values(newErrors).some((error) => error.length > 0)) {
      setErrors(newErrors);
      return;
    }

    if (
      newUser.username.length !== 0 &&
      newUser.password.length !== 0 &&
      newUser.firstName.length !== 0 &&
      newUser.lastName.length !== 0 &&
      newUser.email.length !== 0 &&
      newUser.gender.length !== 0 &&
      newUser.phone.length !== 0 &&
      newUser.dob.length !== 0 &&
      newUser.address.length !== 0 &&
      confirmPassword.length
    ) {
      let res = addUser(newUser);
      if (res) {
        setNewUser({
          id: 0,
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
          image: "",
        });
        setConfirmPassword("");
        setErrors({
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          userExist: "",
          emailExist: "",
          phoneExist: "",
        });
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } else {
      alert("Nhập đủ thông tin");
    }
  };

  return (
    <>
      <Header />
      <div className="register-wrapper">
        <Container>
          <Row className="justify-content-md-center">
            <Col
              md={6}
              style={{
                width: "680px",
                minHeight: "700px",
                backgroundColor: "#ffff",
                borderRadius: "10px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  padding: "57px 65px",
                }}
              >
                <h2 className="text-center">Đăng ký</h2>
                <div style={{ marginTop: "20px" }}>
                  <Row>
                    <Col md={6}>
                      <div className="input-group">
                        <label className="label">Họ</label>
                        <input
                          required=""
                          className="input--style-4"
                          type="text"
                          name="firstName"
                          value={newUser.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input-group">
                        <label className="label">Tên</label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="lastName"
                          value={newUser.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="input-group">
                        <label className="label">Sinh nhật</label>
                        <input
                          className="input--style-4"
                          type="date"
                          name="dob"
                          value={newUser.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input-group">
                        <label className="label">Gender</label>
                        <div className="radio-group">
                          <input
                            className=""
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="male">Nam</label>
                          <input
                            className=""
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="female">Nữ</label>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="input-group">
                        <label className="label">Email</label>
                        <input
                          className="input--style-4"
                          type="email"
                          name="email"
                          value={newUser.email}
                          onChange={handleInputChange}
                        />
                        <span className="error">{errors.email}</span>
                        <span className="error">{errors.emailExist}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input-group">
                        <label className="label">Số điện thoại</label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="phone"
                          value={newUser.phone}
                          onChange={handleInputChange}
                        />
                        <span className="error">{errors.phone}</span>
                        <span className="error">{errors.phoneExist}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="input-group">
                      <label className="label">Địa chỉ</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="address"
                        value={newUser.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Row>

                  <Row>
                    <div className="input-group">
                      <label className="label">Tên đăng nhập</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleInputChange}
                      />
                      <span className="error">{errors.userExist}</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="input-group">
                      <label className="label">Mật khẩu</label>
                      <input
                        className="input--style-4"
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Row>
                  <Row>
                    <div className="input-group">
                      <label className="label">Xác nhận mật khẩu</label>
                      <input
                        className="input--style-4"
                        type="password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      />
                      <span className="error">{errors.confirmPassword}</span>
                    </div>
                  </Row>

                  <div style={{ marginTop: "16px" }}>
                    <Button className="register-btn" onClick={handleAdd}>
                      Đăng ký
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Register;
