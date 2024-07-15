import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    if (userLogin) {
      setIsLogin(true);
      setUser(userLogin);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    setUser({});
    navigate("/login");
  };

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLogin(true);
    setUser(user);
    switch (user.role) {
      case "admin":
        return navigate("/manager");
      case "staff":
        return navigate("/compensation_list");
      case "customer":
        return navigate("/");
      default:
        return <p>Vui lòng chọn quyền</p>;
    }
  };
  const updateLoginUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLogin(true);
    setUser(user);
  };
  return (
    <AuthContext.Provider
      value={{ isLogin, user, handleLogout, handleLogin, updateLoginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
