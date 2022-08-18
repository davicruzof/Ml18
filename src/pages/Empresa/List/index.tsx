// import { Chip, IconButton, Pagination } from "@mui/material";
// import { useEffect, useState } from "react";
// import Sider from "components/Sider";
// import {
//   getEnterpriseByName,
//   getEnterprises,
// } from "@services/Enterprises/enterprises";
// import * as S from "./styles";
// import EditIcon from "@mui/icons-material/Edit";
// import { Input } from "components/TextInput";
// import { width } from "@utils/constants";
// import { useNavigate } from "react-router-dom";

// export default function ListEnterprise() {
//   const navigation = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [page, setPag] = useState("1");
//   const [enterpriseName, setEnterpriseName] = useState("");
//   const size = 5;

//   useEffect(() => {
//     setFullEnterprises();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       if (enterpriseName.length > 0) {
//         const response = await getEnterpriseByName({
//           nomeempresarial: enterpriseName,
//         });
//         setRows(response.data);
//       } else {
//         setFullEnterprises();
//       }
//     })();
//   }, [enterpriseName]);

//   const setFullEnterprises = async () => {
//     const response = await getEnterprises();
//     setRows(response.data);
//   };

//   const handleChange = (
//     event: React.MouseEvent<HTMLElement>,
//     newAlignment: string
//   ) => {
//     setPag(newAlignment);
//   };

//   const editEnterprise = (id) => {
//     navigation("/Empresa/edit?id=" + id, { replace: true });
//   };

//   return (
//     <S.Container>
//       <Sider />
//       <S.Wrapper>
//         <Input
//           type="search"
//           label="Pesquise uma empresa pelo nome"
//           value={enterpriseName}
//           variant="outlined"
//           onChange={(e) => setEnterpriseName(e.target.value)}
//         />

//         <S.TableTitle>
//           <S.ID>ID</S.ID>
//           <S.RAZAO>Razão social</S.RAZAO>
//           {width * 2 >= 1200 && (
//             <>
//               <S.CNPJ>CNPJ</S.CNPJ>
//               <S.SITUACAO>Situação Cadastral</S.SITUACAO>
//             </>
//           )}

//           <S.ACTION>Action</S.ACTION>
//         </S.TableTitle>

//         {rows.map(
//           (val, index) =>
//             index <= size * +page &&
//             index >= (page === "1" ? 0 : +page * size - 4) && (
//               <S.TableItem key={index}>
//                 <S.ID>{val.id_empresa}</S.ID>
//                 <S.RAZAO>{val.nomeempresarial}</S.RAZAO>
//                 {width * 2 >= 1200 && (
//                   <>
//                     <S.CNPJ>{val.cnpj}</S.CNPJ>
//                     <S.SITUACAO>
//                       <Chip label="ativa" color="success" />
//                     </S.SITUACAO>
//                   </>
//                 )}
//                 <S.ACTION>
//                   <IconButton onClick={() => editEnterprise(val.id_empresa)}>
//                     <EditIcon />
//                   </IconButton>
//                 </S.ACTION>
//               </S.TableItem>
//             )
//         )}

//         <S.WrapperPagination>
//           <Pagination
//             count={Math.ceil(rows.length / size)}
//             color="primary"
//             shape="rounded"
//             onChange={(e) => handleChange(e, e.target.textContent)}
//             variant="outlined"
//             hideNextButton
//             hidePrevButton
//           />
//         </S.WrapperPagination>
//       </S.Wrapper>
//     </S.Container>
//   );
// }
import React from "react";

export default function index() {
  return <div>index</div>;
}
