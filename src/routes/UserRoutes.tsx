import Enterprise from "pages/Empresa/Create_Edit";
import ListEnterprise from "pages/Empresa/List";
import Solicitacoes from "pages/Solicitacoes/Create";
import Home from "pages/Home/index";
import { Routes, Route } from "react-router-dom";
import ListRquests from "pages/Solicitacoes/List";
import EmployeeList from "pages/Funcionarios/List";
import EditEmployee from "pages/Funcionarios/Edit";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListRquests />} />
      <Route path="Empresa/">
        <Route path="List" element={<ListEnterprise />} />
        <Route path="New" element={<Enterprise />} />
        <Route path="Edit" element={<Enterprise />} />
      </Route>
      <Route path="Solicitacoes/">
        <Route path="List" element={<ListRquests />} />
        <Route path="New" element={<Solicitacoes />} />
        {/* <Route path="Edit" element={<Enterprise />} /> */}
      </Route>
      <Route path="Funcionario/">
        <Route path="List" element={<EmployeeList />} />
        <Route path="Edit" element={<EditEmployee />} />
        {/* <Route path="new" element={<NewEmployee />} /> */}
      </Route>
    </Routes>
  );
}

export default UserRoutes;
