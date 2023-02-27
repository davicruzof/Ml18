import { useEffect, useState } from "react";
import { getEnterprises } from "services/Enterprises/enterprises";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { EnterPriseType } from "./types";
import Button from "components/Button";
import { useQuery } from "react-query";
import { Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Table from "components/Table";

export default function ListEnterprise() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<EnterPriseType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: dataEnterprises, isLoading } = useQuery("getEnterprises", {
    queryFn: () => getEnterprises(),
    enabled: true,
    keepPreviousData: false,
  });

  const handleEditClick = (id: number) => {
    navigation(`/Admin/Empresa/Edit`, {
      replace: true,
      state: {
        idEnterprise: id,
      },
    });
  };

  const colorStatus = (status: string) => {
    if (status === "Ativo") {
      return "success";
    }

    if (status === "Supenso") {
      return "warning";
    }

    return "error";
  };

  const VISIBLE_FIELDS = [
    { field: "nomeempresarial", headerName: "Nome da Empresa", width: 350 },
    { field: "cnpj", headerName: "CNPJ", width: 200 },
    {
      field: "status",
      type: "actions",
      headerName: "Status",
      width: 200,
      cellClassName: "actions",
      getActions: ({ row }: any) => {
        return [
          <Chip
            label={row.situacaocadastral}
            color={colorStatus(row.situacaocadastral)}
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

  return (
    <S.Container>
      <S.Wrapper>
        <Button
          onClick={() => navigation("/Admin/New", { replace: true })}
          loading={false}
          title="+ Adicionar nova empresa"
          active={false}
        />
      </S.Wrapper>

      <Table
        loading={isLoading}
        fields={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </S.Container>
  );
}
