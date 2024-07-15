import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaThList, FaUserFriends } from "react-icons/fa";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Popper/Popper";
import "./NavDashboard.css";

function NavDashboard({ title, user, handleLogout }) {
  return (
    <div className="sidebar" id="sidebar">
      <div
        className="dashboard d-flex flex-column sticky-top p-3 bg-custom"
        style={{ width: "250px", height: "100vh" }}
      >
        <div className="d-flex">
          <Link
            to={user?.role === "admin" ? "/manager" : "/compensation_list"}
            className="d-flex align-items-center ms-1 mb-3 me-md-auto text-decoration-none text-white"
          >
            <img
              src="images/icon motor.png"
              className="me-2 mb-1"
              width="30"
              height="30"
              alt="alt"
            />
            <span className=" mt-1 text-nowrap" style={{ fontSize: "20px" }}>
              {title}
            </span>
          </Link>
        </div>
        <hr
          className="mt-0 bg-light"
          style={{ height: "2px", border: "none" }}
        />
        {user?.role === "admin" ? (
          <Nav className="flex-column mb-auto">
            <Nav.Item className="btn-group">
              <Nav.Link href="/manager" className="navdash-link" id="btnHome">
                <FaHome className="nav-icon" />
                TRANG CHỦ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="btn-group">
              <Nav.Link
                href="/list_staff"
                className="navdash-link"
                id="btnHome"
              >
                <FaThList className="nav-icon" />
                Danh sách nhân viên
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="btn-group">
              <Nav.Link
                href="/customer_list"
                className="navdash-link"
                id="btnHome"
              >
                <FaUserFriends className="nav-icon" />
                Danh sách khách hàng
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav className="flex-column mb-auto">
            <Nav.Item className="btn-group">
              <Nav.Link
                href="/compensation_list"
                className="navdash-link"
                id="btnHome"
              >
                <FaThList className="nav-icon" />
                Danh sách đền bù
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        <hr
          className="mt-0 bg-light"
          style={{ height: "2px", border: "none" }}
        />

        <Tippy
          delay={[0, 500]}
          interactive
          placement="bottom-start"
          render={(attrs) => (
            <div className="menu-list" tabIndex="-1" {...attrs}>
              <Wrapper className="menu-popper">
                <Link to="/profile">
                  <Button variant="light" className="menu-item">
                    Hồ sơ
                  </Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="light"
                  className="menu-item"
                >
                  Đăng xuất
                </Button>
              </Wrapper>
            </div>
          )}
        >
          <span>
            <img
              src="images/profile-circle 1.png"
              className="me-2"
              width="32"
              height="32"
              alt="alt"
            />
            <strong style={{ color: "#fff" }}>{user?.username}</strong>
          </span>
        </Tippy>
      </div>
    </div>
  );
}

export default NavDashboard;
