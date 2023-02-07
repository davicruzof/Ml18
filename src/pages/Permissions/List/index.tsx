import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getAllEmployee } from "services/Employee/employee";
import { EmployeeType } from "services/Employee/types";
import Table from "components/Table";

const List: React.FC = () => {
  const navigation = useNavigate();

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
      getActions: ({ id }: { id: number }) => {
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

  return (
    <Table
      loading={isLoadingEmployee}
      fields={VISIBLE_FIELDS}
      rows={employeePermission}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
};

export default List;
