import { useEffect, useState } from "react";
import { getEnterprises } from "services/Enterprises/enterprises";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { EnterPriseType } from "./types";
import ButtonComponent from "components/Buttons/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function ListEnterprise() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<EnterPriseType[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data: dataEnterprises, isLoading } = useQuery("getEnterprises", {
    queryFn: () => getEnterprises(),
    enabled: true,
    keepPreviousData: false,
  });

  const handleEditClick = (id: number) => {
    // console.log(id);
    navigation(`/Empresa/Edit?id=${id}`, { replace: true });
  };

  const VISIBLE_FIELDS = [
    { field: "nomeempresarial", headerName: "Empresa", width: 350 },
    { field: "cnpj", headerName: "CNPJ", width: 200 },
    {
      field: "status",
      type: "actions",
      headerName: "Status",
      width: 200,
      cellClassName: "actions",
      getActions: (data: any) => {
        return [
          <Chip
            label={data.row.status ? "Ativo" : "Desativado"}
            color={data.row.status ? "success" : "error"}
          />,
        ];
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, ...rest }: any) => {
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
    if (dataEnterprises?.data) {
      let data: EnterPriseType[] = [];
      dataEnterprises.data.map((item: any) =>
        data.push({
          id: item.id_empresa,
          ...item,
        })
      );
      setRows(data);
    }
  }, [dataEnterprises]);

  if (isLoading) {
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

      {rows && !isLoading && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={VISIBLE_FIELDS}
            rows={rows}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            pagination
            disableSelectionOnClick
          />
        </div>
      )}
    </S.Container>
  );
}
