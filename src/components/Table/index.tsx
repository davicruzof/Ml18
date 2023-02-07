import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Empty from "components/Empty";
import Loading from "components/Loading/Loading";

const Table = ({ pageSize, fields, rows, setPageSize, loading }: any) => {
  const height = window.innerHeight - 100;

  if (loading) return <Loading />;

  if (rows.length === 0)
    return <Empty text="Nenhuma informação foi encontrada!" />;

  return (
    <DataGrid
      columns={fields}
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
  );
};

export default Table;
