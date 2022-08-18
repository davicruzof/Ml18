import Sider from "components/Sider";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import api from "../services/api";
// import { width } from "../utils/constants";
import AuthRoutes from "./AuthRoutes";
// import SwipeableTemporaryDrawer from "./Drawer";
import UserRoutes from "./UserRoutes";

function Routes() {
  const { authValues, setAuthValues } = useContext(AuthContext);

  const storage = localStorage.getItem("logado");

  console.log(storage);

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
      {/* {width * 2 < 1200 && authValues.signed && <SwipeableTemporaryDrawer />} */}

        {authValues.signed || storage ? 
        
      (<div style={{ display: "flex", flexDirection: "row" }}>
        {authValues.signed && <Sider />}
      <div style={{ padding: 20 }}>
        {authValues.signed || storage ? <UserRoutes /> : <AuthRoutes />}
      </div>
      </div>)
        : <AuthRoutes />}
    </BrowserRouter>
  );
}

export default Routes;
