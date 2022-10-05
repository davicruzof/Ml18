import React from "react";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Buttons/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getAllEmployee } from "services/Employee/employee";
import { EmployeeType } from "services/Employee/types";

const List: React.FC = () => {
  const { data: Employees, isLoading: isLoadingEmployee } = useQuery(
    "getAllEmployee",
    {
      queryFn: () => getAllEmployee(),
      enabled: true,
      keepPreviousData: false,
    }
  );

  const navigation = useNavigate();
  const [rows, setRows] = useState<EmployeeType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleEditClick = (id: number) => {
    navigation(`/Funcionario/Edit/${id}`, { replace: true });
  };

  const width = window.innerHeight;

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Nome", width: width },
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
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Wrapper>
        <ButtonComponent
          onClick={() => navigation("/Empresa/New", { replace: true })}
          loading={false}
          title="+ Adicionar nova empresa"
          active={false}
        />
      </S.Wrapper>

      {rows && !isLoadingEmployee && (
        <div style={{ height: 650, width: "100%" }}>
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
            }}
            disableSelectionOnClick
          />
        </div>
      )}
    </S.Container>
  );
};

export default List;
