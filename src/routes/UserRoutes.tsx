import Enterprise from "pages/Empresa/Create";
import ListEnterprise from "pages/Empresa/List";
import Solicitacoes from "pages/Solicitacoes/Create";
import { Routes, Route } from "react-router-dom";
import ListRequests from "pages/Solicitacoes/List";
import EmployeePermissionList from "pages/Permissions/List";
import EmployeePermissionEdit from "pages/Permissions/PermissionEdit";
import { NotFound } from "pages/NotFound";
import DeleteAccount from "pages/DeleteAccount";
import Frota from "pages/Frota/List";
import Create_Edit from "pages/Frota/Create_Edit";
import FichaPonto from "pages/FichaPonto/List";
import Videos from "pages/Rh/Videos/List";
import AddVideos from "pages/Rh/Videos/Create_Edit";
import EditVideos from "pages/Rh/Videos/Edit";
import EditEnterprise from "pages/Empresa/Edit";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListRequests />} />
      <Route path="Admin/">
        <Route path="Empresas" element={<ListEnterprise />} />
        <Route path="New" element={<Enterprise />} />
        <Route path="Empresa/Edit" element={<EditEnterprise />} />
      </Route>
      <Route path="solicitacoes/">
        <Route path="monitoramento" element={<ListRequests />} />
        <Route path="New" element={<Solicitacoes />} />
      </Route>
      <Route path="frota/">
        <Route path="Listagem" element={<Frota />} />
        <Route path="AddVeiculo" element={<Create_Edit />} />
      </Route>
      <Route path="ti/">
        <Route path="permissoes" element={<EmployeePermissionList />} />
        <Route path="permission/edit" element={<EmployeePermissionEdit />} />
        <Route path="delete_account" element={<DeleteAccount />} />
      </Route>
      <Route path="monitoramento/">
        <Route path="ficha_ponto" element={<FichaPonto />} />
      </Route>
      <Route path="rh/">
        <Route path="videos" element={<Videos />} />
        <Route path="AddVideo" element={<AddVideos />} />
        <Route path="videos/edit" element={<EditVideos />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
