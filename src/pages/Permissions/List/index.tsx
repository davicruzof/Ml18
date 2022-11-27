import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getAllEmployee } from "services/Employee/employee";
import { EmployeeType } from "services/Employee/types";
import Empty from "components/Empty";

const List: React.FC = () => {
  const navigation = useNavigate();
  const height = window.innerHeight - 100;

  const [employeePermission, setEmployeePermission] = useState<EmployeeType[]>(
    []
  );
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
      setEmployeePermission(data);
    }
  }, [Employees]);

  if (isLoadingEmployee) {
    return <Loading />;
  }

  if (employeePermission.length === 0) {
    return <Empty text="Nenhum funcionário foi encontrada!" />;
  }

  return (
    <DataGrid
      columns={VISIBLE_FIELDS}
      rows={employeePermission}
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
  );
};

export default List;
