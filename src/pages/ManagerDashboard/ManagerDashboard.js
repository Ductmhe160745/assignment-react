import { useContext, useEffect, useState } from "react";
import NavDashboard from "../../layouts/components/NavDashboard/NavDashboard";
import { AuthContext } from "../../context/AuthContext";
import { Col, Container, Row } from "react-bootstrap";
import StatCard from "../../components/StatCard/StatCard";
import { UserContext } from "../../context/UserContext";
import { ContractContext } from "../../context/ContractContext";
import { CompensationContext } from "../../context/CompensationContext";
import { Bar, Pie } from "react-chartjs-2";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ManagerDashboard() {
  const { user, handleLogout } = useContext(AuthContext);
  const {
    countCustomers,
    countStaffs,
    countFemaleCustomers,
    countMaleCustomers,
  } = useContext(UserContext);
  const { totalContract, totalAllPayment, calculateMonthlyRevenue } =
    useContext(ContractContext);
  const {
    totalCompensation,
    totalAccident,
    countApproved,
    countPending,
    countRejected,
  } = useContext(CompensationContext);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    setMonthlyRevenue(calculateMonthlyRevenue());
  }, [calculateMonthlyRevenue]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: monthlyRevenue,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu mỗi tháng",
      },
    },
  };

  const pieGenderData = {
    labels: ["Nam", "Nữ"],
    datasets: [
      {
        label: "Giới tính",
        data: [countMaleCustomers(), countFemaleCustomers()],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      },
    ],
  };

  const pieGenderOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Giới tính",
      },
    },
  };

  const pieStatusData = {
    labels: ["Đang xử lý", "Đồng ý", "Từ chối"],
    datasets: [
      {
        label: "Đền bù",
        data: [countPending(), countApproved(), countRejected()],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  const pieStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Đền bù",
      },
    },
  };

  return (
    <>
      <NavDashboard
        title={"Admin dashboard"}
        user={user}
        handleLogout={handleLogout}
      />
      <div className="manager-wrapper">
        <Container>
          <h1 style={{ padding: "20px", fontWeight: "bold" }}>Tổng quan</h1>
          <Row style={{ padding: "20px" }}>
            <Col md={4}>
              <StatCard total={countCustomers()} title={"Khách hàng"} />
            </Col>

            <Col md={4}>
              <StatCard total={countStaffs()} title={"Nhân viên"} />
            </Col>
            <Col md={4}>
              <StatCard total={totalContract} title={"Hợp đồng"} />
            </Col>
          </Row>

          <Row style={{ padding: "20px" }}>
            <Col md={4}>
              <StatCard
                total={formatCurrency(totalAllPayment())}
                title={"Doanh thu"}
              />
            </Col>

            <Col md={4}>
              <StatCard total={totalCompensation} title={"Bồi thường"} />
            </Col>
            <Col md={4}>
              <StatCard total={totalAccident} title={"Tai nạn"} />
            </Col>
          </Row>

          <div
            style={{
              margin: "20px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Bar data={data} options={options} />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div className="chart-container">
              <h2>Thông kê khách hàng</h2>
              <div className="chart">
                <Pie data={pieGenderData} options={pieGenderOptions} />
              </div>
            </div>

            <div className="chart-container">
              <h2>Thông kê tình trạng bồi thường</h2>
              <div className="chart">
                <Pie data={pieStatusData} options={pieStatusOptions} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ManagerDashboard;
