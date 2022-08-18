import Home from "pages/Home/index";
import { Routes, Route } from "react-router-dom";
// import NewEnterprise from "../pages/Empresa/New";
// import ListEnterprise from "../pages/Empresa/List";
// import NewEmployee from "../pages/Funcionario/New";
// import EditEnterprise from "../pages/Empresa/Edit";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="Empresa/">
        <Route path="new" element={<NewEnterprise />} />
        <Route path="list" element={<ListEnterprise />} />
        <Route path="edit" element={<EditEnterprise />} />
      </Route>
      <Route path="Funcionario/">
        <Route path="new" element={<NewEmployee />} />
        <Route path="list" element={<ListEnterprise />} />
      </Route>  */}
    </Routes>
  );
}

export default UserRoutes;
