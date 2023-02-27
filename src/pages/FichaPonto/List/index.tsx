import { useEffect, useState } from "react";
import * as S from "./styles";
import { EnterPriseType } from "./types";
import { useQuery } from "react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Image";
import { getPdfConfirmed } from "services/FichaPonto";
import { formatDataMonth } from "utils/format";
import Dialog from "./ViewImage";
import Table from "components/Table";

export default function ListEnterprise() {
  const [rows, setRows] = useState<EnterPriseType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState(false);
  const [updateRow, setUpdateRow] = useState(null);

  const { data: dataPdf, isLoading } = useQuery("getPdfConfirmed", {
    queryFn: () => getPdfConfirmed(),
    enabled: true,
    keepPreviousData: false,
  });

  const handleEditClick = (row: any) => {
    setOpen(true);
    setUpdateRow(row);
  };

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Nome", width: 350 },
    { field: "registro", headerName: "Registro", width: 200 },
    { field: "data_registro", headerName: "Referencia", width: 200 },
    { field: "data_cadastro", headerName: "Data da confirmação", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }: any) => {
        return [
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => handleEditClick(row)}
          >
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (dataPdf) {
      let data: EnterPriseType[] = [];
      dataPdf.map((item: any) => {
        const pdf_data = formatDataMonth(item.data_pdf);
        data.push({
          id: item.id_pdf_confirmed,
          data_registro: pdf_data,
          ...item,
        });
      });
      setRows(data);
    }
  }, [dataPdf]);

  return (
    <S.Container>
      <Table
        loading={isLoading}
        fields={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      {updateRow && <Dialog open={open} setOpen={setOpen} row={updateRow} />}
    </S.Container>
  );
}
