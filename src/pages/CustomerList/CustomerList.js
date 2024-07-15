import { Container } from "react-bootstrap";
import { Table } from "antd";

import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import NavDashboard from "../../layouts/components/NavDashboard/NavDashboard";
import { AuthContext } from "../../context/AuthContext";

function CustomerList() {
  const { users } = useContext(UserContext);
  const { user, handleLogout } = useContext(AuthContext);
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];

  const data = users
    .filter((customer) => customer.role === "customer")
    .map((customer, index) => {
      return {
        key: index,
        name: customer.firstName + " " + customer.lastName,
        dob: customer.dob,
        gender: customer.male === "male" ? "Nam" : "Nữ",
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        status:
          customer.status === "active" ? (
            <span className="text-success">Hoạt động</span>
          ) : (
            <span className="text-danger">Ngừng hoạt động</span>
          ),
      };
    });
  return (
    <>
      <NavDashboard
        title={"Admin dashboard"}
        user={user}
        handleLogout={handleLogout}
      />
      <div style={{ marginLeft: "250px" }}>
        <Container>
          <h1 className="text-center" style={{ marginTop: "50px" }}>
            Danh sách khách hàng
          </h1>

          <Table columns={columns} dataSource={data} />
        </Container>
      </div>
    </>
  );
}

export default CustomerList;
