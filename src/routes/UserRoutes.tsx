import Enterprise from "pages/Empresa/Create_Edit";
import ListEnterprise from "pages/Empresa/List";
import Solicitacoes from "pages/Solicitacoes/Create";
import Home from "pages/Home/index";
import { Routes, Route } from "react-router-dom";
import DptRequest from "pages/Solicitacoes/DptRequest";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Empresa/">
        <Route path="List" element={<ListEnterprise />} />
        <Route path="New" element={<Enterprise />} />
        <Route path="Edit" element={<Enterprise />} />
      </Route>
      <Route path="Solicitacoes/">
        <Route path="List" element={<DptRequest />} />
        <Route path="New" element={<Solicitacoes />} />
        {/* <Route path="Edit" element={<Enterprise />} /> */}
      </Route>
      {/* <Route path="Funcionario/">
        <Route path="new" element={<NewEmployee />} />
        <Route path="list" element={<ListEnterprise />} />
      </Route>  */}
    </Routes>
  );
}

export default UserRoutes;
