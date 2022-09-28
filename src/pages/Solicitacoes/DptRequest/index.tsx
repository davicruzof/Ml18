import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { DptTypes } from "@services/Solicitacoes/types";
import { useQuery } from "react-query";
import { getDepartments } from "@services/Solicitacoes";
import { handleChecked, handleCheckedToggle, intersection, not } from "./utils";
import DptButton from "./button";

export default function DptRequest() {
  const [departamentosLeft, setDepartamentosLeft] = useState<DptTypes[]>([]);
  const [departamentosRight, setDepartamentosRight] = useState<DptTypes[]>([]);
  const [departamentosListLeft, setDepartamentosListLeft] = useState<string[]>(
    []
  );
  const [departamentosListRight, setDepartamentosListRight] = useState<
    string[]
  >([]);
  const [checked, setChecked] = useState<readonly string[]>([]);
  const [checkedLeft, setCheckedLeft] = useState<readonly string[]>([]);

  const leftChecked = intersection(checkedLeft, departamentosListLeft);
  const rightChecked = intersection(checked, departamentosListRight);

  const { isLoading: isLoadingDepartamentos, refetch: refetchDpts } = useQuery(
    "getDepartments",
    {
      queryFn: () => getDepartments(),
      enabled: false,
      keepPreviousData: false,
      onSuccess: (data: DptTypes[]) => {
        data.length > 0 && setDepartamentosLeft(data);
      },
      onError: () => {
        // setSnackStatus(true);
        // setSnackType("error");
        // setSnackMessage("Ocorreu um erro ao tentar buscar dados!");
      },
    }
  );

  const handleToggleLeft = (value: string) => () => {
    setDepartamentosListLeft((old) => [...old, value]);
    setCheckedLeft(handleCheckedToggle(value, checkedLeft));
  };

  const handleToggleRight = (value: string) => () => {
    setDepartamentosListRight((old) => [...old, value]);
    setChecked(handleCheckedToggle(value, checked));
  };

  const handleAllLeft = () => {
    setDepartamentosLeft(departamentosLeft.concat(departamentosRight));
    setDepartamentosRight([]);
  };

  const handleAllRight = () => {
    setDepartamentosRight(departamentosRight.concat(departamentosLeft));
    setDepartamentosLeft([]);
  };

  const handleCheckedRight = () => {
    const { sendItens, oldItens } = handleChecked(
      leftChecked,
      departamentosLeft
    );
    setDepartamentosRight((old) => [...old, ...sendItens]);
    setDepartamentosLeft(oldItens);
    setCheckedLeft(not(checkedLeft, leftChecked));
  };

  const handleCheckedLeft = () => {
    const { sendItens, oldItens } = handleChecked(
      rightChecked,
      departamentosRight
    );

    setDepartamentosLeft((old) => [...old, ...sendItens]);
    setDepartamentosRight(oldItens);
    setChecked(not(checked, rightChecked));
  };

  const listLeftItens = (items: DptTypes[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: DptTypes) => {
          const labelId = `transfer-list-item-${value.area}-label`;

          return (
            <ListItem
              key={value.id_area}
              role="listitem"
              button
              onClick={handleToggleLeft(value.area)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checkedLeft.indexOf(value.area) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.area}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const listRightItens = (items: DptTypes[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: DptTypes) => {
          const labelId = `transfer-list-item-${value.area}-label`;

          return (
            <ListItem
              key={value.id_area}
              role="listitem"
              button
              onClick={handleToggleRight(value.area)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value.area) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.area}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  useEffect(() => {
    refetchDpts();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{listLeftItens(departamentosLeft)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <DptButton
            handleAll={handleAllRight}
            active={departamentosLeft.length === 0}
            label="Adicionar todos"
          />
          <DptButton
            handleAll={handleCheckedRight}
            active={leftChecked.length === 0}
            label="Adicionar selecionados"
          />
          <DptButton
            handleAll={handleCheckedLeft}
            active={rightChecked.length === 0}
            label="Remover selecionados"
          />
          <DptButton
            handleAll={handleAllLeft}
            active={departamentosRight.length === 0}
            label="Remover todos"
          />
        </Grid>
      </Grid>
      <Grid item>{listRightItens(departamentosRight)}</Grid>
    </Grid>
  );
}
