import { Container } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { CiCircleCheck } from "react-icons/ci";

import Header from "../../layouts/components/Header/Header";
import "./ResetPassword.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { putUser } from "../../service/UserService";

function ResetPassword() {
  const { users } = useContext(UserContext);

  const [userSearch, setUserSearch] = useState({
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
  const [keySearch, setKeySearch] = useState("");
  const [notfound, setNotfound] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  const handleSearchUserName = () => {
    const user = users.find((user) => {
      return (
        (user.email === keySearch || user.phone === keySearch) &&
        user.username &&
        user.password
      );
    });
    if (keySearch.length > 0) {
      if (user) {
        setUserSearch(user);
        setIsFound(true);
        setNotfound(false);
        setEmptyInput(false);
        setResetSuccess(false);
        setIsSearch(false);
      } else {
        setNotfound(true);
        setEmptyInput(false);
        setResetSuccess(false);
      }
    } else {
      setEmptyInput(true);
      setResetSuccess(false);
    }
  };

  const updatePass = async (user) => {
    await putUser(user);
  };

  const handleNewPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 6;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  };

  const handleSendEmail = () => {
    const serviceId = "service_3z00zal";
    const templateId = "template_hgdxuec";
    const publicKey = "k85o5juTw71kiQ3n_";

    const newPassword = handleNewPassword();
    const templateParams = {
      from_name: "F-care",
      form_email: userSearch.email,
      to_name: userSearch.firstName + " " + userSearch.lastName,
      message: "Mật khẩu mới của bạn là: " + newPassword,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        updatePass({ ...userSearch, password: newPassword });
        setResetSuccess(true);
        setIsFound(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <Header />
      <div className="reset-container">
        <Container>
          {isFound && (
            <div className="reset-password--form">
              <div>
                <h2 className="reset-password-header">
                  Đặt lại mật khẩu của bạn
                </h2>
              </div>

              <div className="reset-input">
                <div className="reset-info d-flex flex-column justify-content-center align-items-center">
                  <img src={userSearch.image} alt="ảnh đại diện" />
                  <p>{userSearch.firstName + userSearch.lastName}</p>
                </div>
              </div>
              <div className="reset-send">
                <input type="radio" checked readOnly />
                <div
                  className="d-flex flex-column"
                  style={{ marginLeft: "10px" }}
                >
                  <span>Gửi mã qua email </span>
                  <span style={{ fontSize: "12px" }}>{userSearch.email}</span>
                </div>
              </div>

              <div
                style={{
                  padding: "18px 16px 18px 18px",
                }}
                className="d-flex justify-content-end mt-3"
              >
                <button
                  style={{ backgroundColor: "#1877f2", color: "#fff" }}
                  className="btn-reset"
                  onClick={handleSendEmail}
                >
                  Gửi
                </button>
              </div>
            </div>
          )}

          {isSearch && (
            <div className="reset-password--form">
              <div>
                <h2 className="reset-password-header">Tìm tài khoản của bạn</h2>
              </div>
              <div className="reset-input">
                {notfound && (
                  <div className="error-notfound">
                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Không có kể quả tìm kiếm
                    </span>
                    <p style={{ fontSize: "13px" }}>
                      Tìm kiếm không trả về kết quả nào. Vui lòng thử lại với
                      thông tin khác.
                    </p>
                  </div>
                )}

                {emptyInput && (
                  <div className="error-notfound">
                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Vui lòng điền thông tin
                    </span>
                    <p style={{ fontSize: "13px" }}>
                      Điền vào ít nhất một mục bên dưới để tìm kiếm tài khoản
                      của bạn
                    </p>
                  </div>
                )}

                <p style={{ fontSize: "17px" }}>
                  Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của
                  bạn.
                </p>
                <input
                  placeholder="Email hoặc số điện thoại"
                  value={keySearch}
                  onChange={(e) => {
                    setKeySearch(e.target.value);
                  }}
                />
              </div>

              <div
                style={{
                  padding: "18px 16px 18px 18px",
                }}
                className="d-flex justify-content-end mt-3"
              >
                <Link to="/login">
                  <button
                    style={{ backgroundColor: "#e4e6eb" }}
                    className="btn-reset"
                  >
                    Hủy
                  </button>
                </Link>
                <button
                  style={{ backgroundColor: "#1877f2", color: "#fff" }}
                  className="btn-reset"
                  onClick={handleSearchUserName}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          )}

          {resetSuccess && (
            <div className="reset-password--form d-flex flex-column justify-content-center align-items-center">
              <CiCircleCheck className="react-icon-success" />
              <span>Mật khẩu mới đã được gửi đến email của bạn</span>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default ResetPassword;
