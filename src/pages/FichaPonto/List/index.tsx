import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { EnterPriseType } from "./types";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Image";
import { getPdfConfirmed } from "services/FichaPonto";
import { formatDataMonth } from "utils/format";
import Dialog from "./ViewImage";

export default function ListEnterprise() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<EnterPriseType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState(false);
  const [updateRow, setUpdateRow] = useState(null);
  const height = window.innerHeight - 200;

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      {rows && !isLoading && (
        <DataGrid
          loading={isLoading}
          columns={VISIBLE_FIELDS}
          rows={rows}
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
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
      )}
      {updateRow && <Dialog open={open} setOpen={setOpen} row={updateRow} />}
    </S.Container>
  );
}
