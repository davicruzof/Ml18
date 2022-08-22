import { ThemeProvider } from "styled-components";
import {
  createTheme,
  ThemeProvider as MUIProvider,
} from "@mui/material/styles";
import { ptBR } from "@mui/x-data-grid";
import theme from "utils/theme";
import "./App.css";
import { useState } from "react";
import { AppContextProvider } from "contexts/auth";
import Routes from "routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { AxiosError } from "axios";

function App() {
  const [authValues, setAuthValues] = useState({
    token: "",
    id_empresa: null,
    signed: false,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (_, error) => {
          const err = error as AxiosError;
          const status = err?.response?.status;
          if (!status || [401, 403, 404].includes(status)) {
            return false;
          }
          return true;
        },
      },
    },
  });

  const themeMUI = createTheme({}, ptBR);

  return (
    <QueryClientProvider client={queryClient}>
      <MUIProvider theme={themeMUI}>
        <AppContextProvider value={{ authValues, setAuthValues }}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </AppContextProvider>
      </MUIProvider>
    </QueryClientProvider>
  );
}

export default App;
