import Enterprise from "pages/Empresa/Create_Edit";
import ListEnterprise from "pages/Empresa/List";
import Solicitacoes from "pages/Solicitacoes/Create";
import { Routes, Route } from "react-router-dom";
import ListRequests from "pages/Solicitacoes/List";
import EmployeePermissionList from "pages/Permissions/List";
import EmployeePermissionEdit from "pages/Permissions/Edit";
import { NotFound } from "pages/NotFound";
import DeleteAccount from "pages/DeleteAccount";
import Frota from "pages/Frota/List";
import Create_Edit from "pages/Frota/Create_Edit";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListRequests />} />
      <Route path="Admin/">
        <Route path="Empresas" element={<ListEnterprise />} />
        <Route path="New" element={<Enterprise />} />
        <Route path="Empresa/Edit" element={<Enterprise />} />
      </Route>
      <Route path="solicitacoes/">
        <Route path="monitoramento" element={<ListRequests />} />
        <Route path="New" element={<Solicitacoes />} />
      </Route>
      <Route path="backOffice/">
        <Route path="Veiculos" element={<Frota />} />
        <Route path="NewVeiculo" element={<Create_Edit />} />
      </Route>
      <Route path="ti/">
        <Route path="permissoes" element={<EmployeePermissionList />} />
        <Route path="permission/edit" element={<EmployeePermissionEdit />} />
        <Route path="exclusao-de-conta" element={<DeleteAccount />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
