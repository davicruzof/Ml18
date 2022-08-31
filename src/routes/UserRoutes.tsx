import Enterprise from "pages/Empresa/Create_Edit";
import ListEnterprise from "pages/Empresa/List";
import Home from "pages/Home/index";
import { Routes, Route } from "react-router-dom";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Empresa/">
        <Route path="List" element={<ListEnterprise />} />
        <Route path="New" element={<Enterprise />} />
        <Route path="Edit" element={<Enterprise />} />
      </Route>
      {/* <Route path="Funcionario/">
        <Route path="new" element={<NewEmployee />} />
        <Route path="list" element={<ListEnterprise />} />
      </Route>  */}
    </Routes>
  );
}

export default UserRoutes;
