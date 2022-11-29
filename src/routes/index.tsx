import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import api from "../services/api";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";

import { SideBar } from "components/SiderBar";

function Routes() {
  const { authValues, setAuthValues } = useContext(AuthContext);

  const storage = localStorage.getItem("logado");

  useEffect(() => {
    (() => {
      if (storage) {
        const values = localStorage.getItem("authValues");
        const data = JSON.parse(values!);
        setAuthValues(data);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      {authValues.signed || storage ? (
        <SideBar>
          <UserRoutes />
        </SideBar>
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  );
}

export default Routes;
