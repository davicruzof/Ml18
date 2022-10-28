import Enterprise from "pages/Empresa/Create_Edit";
import ListEnterprise from "pages/Empresa/List";
import Solicitacoes from "pages/Solicitacoes/Create";
import { Routes, Route } from "react-router-dom";
import ListRequests from "pages/Solicitacoes/List";
import EmployeeList from "pages/Funcionarios/List";
import EditEmployee from "pages/Funcionarios/Edit";
import Sider from "components/Sider";
import { NotFound } from "pages/NotFound";

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Sider>
            <ListRequests />
          </Sider>
        }
      />
      <Route path="Empresa/">
        <Route path="List" element={<ListEnterprise />} />
        <Route path="New" element={<Enterprise />} />
        <Route path="Edit" element={<Enterprise />} />
      </Route>
      <Route path="solicitacoes/">
        <Route
          path="monitoramento"
          element={
            <Sider>
              <ListRequests />
            </Sider>
          }
        />
        <Route path="New" element={<Solicitacoes />} />
      </Route>
      <Route path="ti/">
        <Route
          path="permissoes"
          element={
            <Sider>
              <EmployeeList />
            </Sider>
          }
        />
        <Route
          path="permission/edit"
          element={
            <Sider>
              <EditEmployee />
            </Sider>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Sider>
            <NotFound />
          </Sider>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
