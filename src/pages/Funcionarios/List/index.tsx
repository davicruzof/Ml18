import React from "react";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getAllEmployee } from "services/Employee/employee";
import { EmployeeType } from "services/Employee/types";

const List: React.FC = () => {
  const navigation = useNavigate();
  const [rows, setRows] = useState<EmployeeType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: Employees, isLoading: isLoadingEmployee } = useQuery(
    "getAllEmployee",
    {
      queryFn: () => getAllEmployee(),
      enabled: true,
      keepPreviousData: false,
    }
  );

  const handleEditClick = (id: number) => {
    navigation(`/ti/permission/edit`, { state: { id }, replace: true });
  };

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Nome", width: 400 },
    { field: "registro", headerName: "Registro", width: 100 },
    { field: "funcao", headerName: "Função", width: 250 },
    { field: "cpf", headerName: "CPF", width: 150 },
    {
      field: "Editar",
      type: "actions",
      headerName: "Editar",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }: any) => {
        return [
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => handleEditClick(id)}
          >
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (Employees?.data) {
      let data: EmployeeType[] = [];
      Employees.data.map((item: any) =>
        data.push({
          id: item.id_funcionario,
          ...item,
        })
      );
      setRows(data);
    }
  }, [Employees]);

  if (isLoadingEmployee) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </div>
    );
  }

  const height = window.innerHeight - 100;

  return (
    rows &&
    !isLoadingEmployee && (
      <DataGrid
        columns={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        components={{ Toolbar: GridToolbar }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        pagination
        style={{
          paddingLeft: 20,
          justifyContent: "space-between",
          display: "flex",
          margin: 20,
          height,
        }}
        disableSelectionOnClick
      />
    )
  );
};

export default List;
