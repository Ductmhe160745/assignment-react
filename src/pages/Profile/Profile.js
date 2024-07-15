import { Button, Col, Container, Row } from "react-bootstrap";
import Header from "../../layouts/components/Header/Header";
import "./Profile.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { putUser } from "../../service/UserService";

function Profile() {
  const { isLogin, user, updateLoginUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [nav, setNav] = useState("info");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [account, setAccount] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    if (isLogin) {
      setAccount(user);
    }
  }, [isLogin, user]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordUpdateSuccess(false);

    if (oldPassword !== account.password) {
      setPasswordError("Mật khẩu cũ không đúng.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    const res = await putUser({ ...account, password: newPassword });
    if (res) {
      setPasswordUpdateSuccess(true);
      updateLoginUser({ ...account, password: newPassword });
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAccount({ ...account, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    let res = await putUser(account);
    if (res) {
      setUpdateSuccess(true);
      updateLoginUser(account);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <Container>
          <Row style={{ padding: "50px 0" }}>
            <Col md={3}>
              <ul className="account-nav-list">
                <li
                  className="account-nav-item"
                  onClick={() => {
                    setNav("info");
                  }}
                >
                  Tài khoản
                </li>
                <li
                  className="account-nav-item"
                  onClick={() => {
                    setNav("password");
                  }}
                >
                  Đổi mật khẩu
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <div className="profile-wrapper">
                <h1 className="text-center">Tài khoản</h1>
                {nav === "info" && (
                  <>
                    <div className="account-header">
                      <div className="account-avatar">
                        <img
                          src={
                            !account.image ? "images/user.png" : account.image
                          }
                          alt="avatar"
                        />
                        <Button
                          className="btn-lg"
                          onClick={() => {
                            fileInputRef.current.click();
                          }}
                        >
                          Thay ảnh đại diện
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleChangeImage}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="account-info">
                      <Row>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label
                              className="account-label"
                              htmlFor="firstName"
                            >
                              Họ
                            </label>
                            <input
                              className="account-detail"
                              type="text"
                              value={account.firstName}
                              id="firstName"
                              name="firstName"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label className="account-label" htmlFor="lastName">
                              Tên
                            </label>
                            <input
                              className="account-detail"
                              type="text"
                              value={account.lastName}
                              id="lastName"
                              name="lastName"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label className="account-label" htmlFor="email">
                              Email
                            </label>
                            <input
                              className="account-detail"
                              type="email"
                              value={account.email}
                              id="email"
                              name="email"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label className="account-label" htmlFor="phone">
                              Số điện thoại
                            </label>
                            <input
                              className="account-detail"
                              type="text"
                              value={account.phone}
                              id="phone"
                              name="phone"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label className="account-label" htmlFor="gender">
                              Giới tính
                            </label>
                            <select
                              value={account.gender}
                              id="gender"
                              name="gender"
                              className="account-detail"
                              onChange={handleInputChange}
                            >
                              <option value="">Lựa chọn giới tính</option>
                              <option value="male">Nam</option>
                              <option value="female">Nữ</option>
                            </select>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label className="account-label" htmlFor="dob">
                              Ngày sinh
                            </label>
                            <input
                              className="account-detail"
                              type="date"
                              value={account.dob}
                              id="dob"
                              name="dob"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: "20px" }}>
                            <label className="account-label" htmlFor="address">
                              Địa chỉ
                            </label>
                            <input
                              className="account-detail"
                              type="text"
                              value={account.address}
                              id="address"
                              name="address"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                      </Row>
                      <>
                        <Button className="btn-lg" onClick={handleUpdate}>
                          Lưu
                        </Button>
                        {updateSuccess && (
                          <span className="update-account-success">
                            Chỉnh sửa thành công
                          </span>
                        )}
                      </>
                    </div>
                  </>
                )}

                {nav === "password" && (
                  <>
                    <Col>
                      <div style={{ marginBottom: "20px" }}>
                        <label className="account-label" htmlFor="lastPass">
                          Mật khẩu cũ
                        </label>
                        <input
                          className="account-detail"
                          type="password"
                          id="lastPass"
                          name="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div style={{ marginBottom: "20px" }}>
                        <label className="account-label" htmlFor="newPass">
                          Mật khẩu mới
                        </label>
                        <input
                          className="account-detail"
                          type="password"
                          id="newPass"
                          name="newPass"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div style={{ marginBottom: "20px" }}>
                        <label className="account-label" htmlFor="confirmPass">
                          Xác nhận
                        </label>
                        <input
                          className="account-detail"
                          type="password"
                          id="confirmPass"
                          name="confirmPass"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </Col>
                    {passwordError && (
                      <p style={{ color: "red" }}>{passwordError}</p>
                    )}

                    <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
                    {passwordUpdateSuccess && (
                      <p className="update-account-success">
                        Đổi mật khẩu thành công
                      </p>
                    )}
                  </>
                )}
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Profile;
