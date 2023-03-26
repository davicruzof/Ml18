import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Button";
import { useQuery } from "react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getVehicles } from "services/Vehicle";
import { VehicleResponse } from "services/Vehicle/type";
import Table from "components/Table";
import { formatDate } from "@utils/format";

export default function Frota() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<VehicleResponse[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: dataVehicles, isLoading } = useQuery("getVehicles", {
    queryFn: () => getVehicles(),
    enabled: true,
    keepPreviousData: true,
  });

  const handleEditClick = (id: number) => {
    navigation(`/Admin/Empresa/Edit`, {
      replace: true,
      state: {
        idEnterprise: id,
      },
    });
  };

  const VISIBLE_FIELDS = [
    { field: "prefixo", headerName: "Prefixo", width: 150 },
    { field: "placa", headerName: "Placa", width: 150 },
    { field: "ano_model", headerName: "Ano Modelo", width: 100 },
    { field: "ano_fabric", headerName: "Ano Fabricação", width: 120 },
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
    if (dataVehicles) {
      let data: VehicleResponse[] = [];
      dataVehicles.map((item: any) =>
        data.push({
          id: item.id_veiculo,
          ano_model: formatDate(item.ano_modelo),
          ano_fabric: formatDate(item.ano_fabricacao),
          ...item,
        })
      );
      setRows(data);
    }
  }, [dataVehicles]);

  return (
    <S.Container>
      <S.Wrapper>
        <ButtonComponent
          onClick={() => navigation("/frota/AddVeiculo", { replace: true })}
          loading={false}
          title="+ Adicionar nova veículo"
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
