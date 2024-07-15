/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "react-bootstrap";
import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Popper/Popper";
import { AuthContext } from "../../../context/AuthContext";

function Header() {
  const { isLogin, user, handleLogout } = useContext(AuthContext);

  return (
    <div className="header-container sticky-top">
      <div className="wrapper-header">
        <a
          className="header-logo"
          href={!isLogin || user?.role === "customer" ? "/" : ""}
        >
          <img src="images/motor.png" alt="Logo" width="35" height="35" />
          <span className="header-title">F-Care Insurance</span>
        </a>
        {!isLogin || user?.role === "customer" ? (
          <ul className="nav-list">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Giới thiệu
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/insurance">
                Bảo hiểm
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Liên hệ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">
                Tra cứu bảo hiểm
              </a>
            </li>
          </ul>
        ) : (
          <>
            {user?.role === "admin" && (
              <ul className="nav-list">
                <li className="nav-item">
                  <a className="nav-link" href="/manager">
                    Trang chủ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/list_staff">
                    Danh sách nhân viên
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/customer_list">
                    Danh sách nhân viên
                  </a>
                </li>
              </ul>
            )}
            {user?.role === "staff" && (
              <ul className="nav-list">
                <li className="nav-item">
                  <a className="nav-link" href="/compensation_list">
                    Trang chủ
                  </a>
                </li>
              </ul>
            )}
          </>
        )}
        {isLogin ? (
          <Tippy
            delay={[0, 500]}
            interactive
            placement="bottom-start"
            render={(attrs) => (
              <div className="menu-list" tabIndex="-1" {...attrs}>
                <Wrapper className="menu-popper">
                  {user?.role === "customer" ? (
                    <div className="menu-body">
                      <Link to="/profile">
                        <Button variant="light" className="menu-item">
                          Thông tin tài khoản
                        </Button>
                      </Link>
                      <Link to="/contract_list">
                        <Button variant="light" className="menu-item">
                          Danh sách bảo hiểm
                        </Button>
                      </Link>
                      <Link to="/compensation">
                        <Button variant="light" className="menu-item">
                          Đền bù
                        </Button>
                      </Link>

                      <Button
                        onClick={handleLogout}
                        variant="light"
                        className="menu-item"
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <div className="menu-body">
                      <Link to="/profile">
                        <Button variant="light" className="menu-item">
                          Thông tin tài khoản
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="light"
                        className="menu-item"
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  )}
                </Wrapper>
              </div>
            )}
          >
            <div className="header-user-avatar">
              <span className="text-white">Chào, {user.lastName}</span>
              <img
                width={30}
                height={30}
                src={!user.image ? "images/user.png" : user.image}
                alt="avartar"
              />
            </div>
          </Tippy>
        ) : (
          <div>
            <Button className="btn" href="/login" variant="primary" size="lg">
              Đăng nhập
            </Button>{" "}
            <Button className="btn" href="/register" variant="light" size="lg">
              Đăng ký
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
