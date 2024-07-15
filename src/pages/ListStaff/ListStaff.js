import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import NavDashboard from "../../layouts/components/NavDashboard/NavDashboard";
import "./ListStaff.css";
import { UserContext } from "../../context/UserContext";
import { Button, Pagination, notification } from "antd";

const key = "updatable";
function ListStaff() {
  const { user, handleLogout } = useContext(AuthContext);
  const { users, updateUser } = useContext(UserContext);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      key,
      message: "Cập nhật trạng thái",
      description: `Trạng thái đã được cập nhật thành công`,
    });
  };

  const handleChangeStatus = (user) => {
    const check = updateUser({
      ...user,
      status: user.status === "active" ? "inactive" : "active",
    });
    if (check) {
      openNotification();
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Compute the items to display based on the current page
  const currentUsers = users
    .filter((user) => user.role === "staff")
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <NavDashboard
        title={"Admin dashboard"}
        user={user}
        handleLogout={handleLogout}
      />

      <div style={{ marginLeft: "250px" }}>
        {contextHolder}
        <Container>
          <div className="users-table table-wrapper">
            <h2>Danh sách nhân viên</h2>
            <table className="posts-table">
              <thead>
                <tr className="users-table-info">
                  <th>Họ tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Chuyển trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers
                  .filter((user) => user.role === "staff")
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.firstName + " " + user.lastName}</td>
                        <td>{user.gender === "male" ? "Nam" : "Nữ"}</td>
                        <td>{user.dob}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={
                              user.status === "active"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {user.status === "active"
                              ? "Làm việc"
                              : "Nghỉ việc"}
                          </span>
                        </td>

                        <td>
                          <Button
                            type="primary"
                            style={
                              user.status === "inactive"
                                ? {
                                    backgroundColor: "#52c41a",
                                    borderColor: "#52c41a",
                                  }
                                : {}
                            }
                            danger={user.status !== "inactive"}
                            onClick={() => handleChangeStatus(user)}
                          >
                            {user.status === "active"
                              ? "Nghỉ việc"
                              : "Làm việc"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={users.filter((user) => user.role === "staff").length}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: "20px", textAlign: "center" }}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ListStaff;
