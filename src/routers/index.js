import { Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Insurance from "../pages/Insurance/Insurance";
import DeclareInfomation from "../pages/DeclareInfo/DeclareInfomation";
import Payment from "../pages/Payment/Payment";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SendEmail from "../components/SendEmail";
import CustomerList from "../pages/CustomerList/CustomerList";
import ContractList from "../pages/ContractList/ContractList";
import SearchContract from "../pages/SearchContract/SearchContract";
import ManagerDashboard from "../pages/ManagerDashboard/ManagerDashboard";
import ListStaff from "../pages/ListStaff/ListStaff";
import Compensation from "../pages/Compensation/Compensation";
import CompensationRequest from "../pages/CompensationRequest/CompensationRequest";
import CompensationList from "../pages/CompensationList/CompensationList";

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/profile",
    component: Profile,
    public: null,
    roles: ["customer", "staff", "admin"],
  },
  { path: "/insurance", component: Insurance },
  { path: "/declare-info", component: DeclareInfomation },
  { path: "/payment", component: Payment },
  { path: "/reset_password", component: ResetPassword },
  { path: "/send", component: SendEmail },
  {
    path: "/customer_list",
    component: CustomerList,
    public: null,
    roles: ["admin"],
  },
  {
    path: "/contract_list",
    component: ContractList,
    public: null,
    roles: ["customer"],
  },
  { path: "/search", component: SearchContract },
  {
    path: "/manager",
    component: ManagerDashboard,
    public: null,
    roles: ["admin"],
  },
  { path: "/list_staff", component: ListStaff, public: null, roles: ["admin"] },
  {
    path: "/compensation",
    component: Compensation,
    public: null,
    roles: ["customer"],
  },
  {
    path: "/compensation_list",
    component: CompensationList,
    public: null,
    roles: ["staff"],
  },
  {
    path: "/compensation_request",
    component: CompensationRequest,
    public: null,
    roles: ["customer"],
  },
];

function PrivateRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    if (user.role === "admin") {
      return <Navigate to="/manager" />;
    }

    if (user.role === "staff") {
      return <Navigate to="/compensation_list" />;
    }
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
