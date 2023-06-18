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
import AddVeiculo from "pages/Frota/Create_Edit";
import FichaPonto from "pages/FichaPonto/List";
import Videos from "pages/Rh/Videos/List";
import AddVideos from "pages/Rh/Videos/Create";
import EditVideos from "pages/Rh/Videos/Edit";
import EditEnterprise from "pages/Empresa/Edit";
import SendEmployee from "pages/Rh/Videos/SendEmployee";
import Details from "pages/Solicitacoes/Details";
import { SideBar } from "components/SiderBar";

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SideBar>
            <ListRequests />
          </SideBar>
        }
      />
      <Route path="Admin/">
        <Route
          path="Empresas"
          element={
            <SideBar>
              <ListEnterprise />
            </SideBar>
          }
        />

        <Route
          path="New"
          element={
            <SideBar>
              <Enterprise />
            </SideBar>
          }
        />

        <Route
          path="Empresa/Edit"
          element={
            <SideBar>
              <EditEnterprise />
            </SideBar>
          }
        />
      </Route>

      <Route path="solicitacoes/">
        <Route
          path="monitoramento"
          element={
            <SideBar>
              <ListRequests />
            </SideBar>
          }
        />

        <Route
          path="New"
          element={
            <SideBar>
              <Solicitacoes />
            </SideBar>
          }
        />

        <Route
          path="Details"
          element={
            <SideBar hideNav>
              <Details />
            </SideBar>
          }
        />
      </Route>

      <Route path="frota/">
        <Route path="Listagem" element={<Frota />} />

        <Route path="AddVeiculo" element={<AddVeiculo />} />
      </Route>

      <Route path="ti/">
        <Route
          path="permissoes"
          element={
            <SideBar>
              <EmployeePermissionList />
            </SideBar>
          }
        />

        <Route
          path="permission/edit"
          element={
            <SideBar>
              <EmployeePermissionEdit />
            </SideBar>
          }
        />

        <Route
          path="delete_account"
          element={
            <SideBar>
              <DeleteAccount />
            </SideBar>
          }
        />
      </Route>
      <Route path="monitoramento/">
        <Route
          path="ficha_ponto"
          element={
            <SideBar>
              <FichaPonto />
            </SideBar>
          }
        />
      </Route>

      <Route path="rh/">
        <Route path="videos" element={<Videos />} />

        <Route path="AddVideo" element={<AddVideos />} />

        <Route path="videos/edit" element={<EditVideos />} />

        <Route path="videos/send" element={<SendEmployee />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
