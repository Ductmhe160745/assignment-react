import React, { useState, useEffect, Suspense, lazy, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute, { publicRoutes } from "./routers";
import UserProvider from "./context/UserContext";
import ContractProvider from "./context/ContractContext";
import AuthProvider from "./context/AuthContext";
import CompensationProvider from "./context/CompensationContext";
import Loading from "./components/Loading/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <Loading />
        ) : (
          <UserProvider>
            <ContractProvider>
              <CompensationProvider>
                <AuthProvider>
                  <Routes>
                    {publicRoutes.map((router, index) => {
                      const Page = router.component;
                      const roles = router.roles;
                      let Private = PrivateRoute;
                      if (router.public !== null) {
                        Private = Fragment;
                      }
                      return (
                        <Route
                          key={index}
                          path={router.path}
                          element={
                            <Private roles={roles}>
                              <Page />
                            </Private>
                          }
                        />
                      );
                    })}
                  </Routes>
                </AuthProvider>
              </CompensationProvider>
            </ContractProvider>
          </UserProvider>
        )}
      </div>
    </Router>
  );
}

export default App;
