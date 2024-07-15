import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Footer from "../../layouts/components/Footer/Footer";
import Header from "../../layouts/components/Header/Header";
import "./Login.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { handleLogin } = useContext(AuthContext);

  const { users } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      handleLogin(user);
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="login-wrapper">
      <Header />
      <Container>
        <div className="form-login-wrapper">
          <Row>
            <Col md={6} style={{ height: "600px" }}>
              <div className="login-form p-md-5 mx-md-4">
                <div className="text-center">
                  <img
                    src="images/icon motor color 419fa3.png"
                    alt="f-care"
                    style={{ width: "80px" }}
                  />
                  <h4
                    className="mt-4 mb-3 pb-1"
                    style={{ color: "#419FA3", fontSize: "26px" }}
                  >
                    Chúng tôi là Bảo Hiểm F-Care
                  </h4>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-input-login"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      className="form-input-login"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Button className="login-btn" type="submit">
                    Đăng nhập
                  </Button>
                </Form>

                <Link
                  to="/reset_password"
                  className="text-muted text-center forget-password-link"
                >
                  <span> Quên mật khẩu?</span>
                </Link>

                <div
                  style={{ marginTop: "30px" }}
                  className="d-flex align-items-center justify-content-center pb-4"
                >
                  <p className="mb-0 me-2">Bạn không có tài khoản?</p>

                  <Link to="/register">Tạo tài khoản</Link>
                </div>
              </div>
            </Col>
            <Col md={6} style={{ height: "600px" }}>
              <div className="info d-flex align-items-center">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4" style={{ fontSize: "28px" }}>
                    Chúng tôi không chỉ là một công ty Bảo Hiểm
                  </h4>
                  <p className="small mb-0">
                    “Đến với F-Care, chúng tôi cung cấp cho bạn dịch vụ bảo hiểm
                    xe máy với chi phí và chính sách tốt nhất. Đồng hành cùng
                    bạn mỗi bước đường. Bảo hiểm xe máy cho mọi hành trình!”
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default Login;
