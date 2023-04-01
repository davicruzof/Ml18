/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";

import { getAllEmployee } from "services/Employee/employee";

import { EmployeeType } from "services/Employee/types";

import * as S from "./styles";

import Snack from "components/Snack";

import {
  Checkbox,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import RemoveCircle from "@mui/icons-material/RemoveCircle";

import { ButtonsForm } from "components/ButtonsForm";
import { ValueType } from "./types";
import InputForm from "components/Input";
import Button from "components/Button";

export default function SendEmployee() {
  const {
    state: { id_video },
  } = useLocation();

  const navigate = useNavigate();

  const [listEmployees, setListEmployees] = useState<EmployeeType[]>([]);
  const [listEmployeesBackup, setListEmployeesBackUp] = useState<
    EmployeeType[]
  >([]);
  const [allEmployees, setAllEmployees] = useState<string[]>([]);
  const [employeesSelected, setEmployeesSelected] = useState<string[]>([]);

  const [search, setSearch] = useState("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");
  const [checked, setChecked] = useState<string[]>([]);

  const { isLoading: isLoadingGetAllEmployee } = useQuery("getAllEmployee", {
    queryFn: () => getAllEmployee(),
    enabled: true,
    keepPreviousData: true,
    onSuccess: (employees: { data: EmployeeType[] }) => {
      if (employees?.data) {
        setListEmployees(employees.data);
        setListEmployeesBackUp(employees.data);
      }
    },
  });

  const handleToggle = (value: string, name: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newSelecteds = [...employeesSelected];

    if (currentIndex === -1) {
      newChecked.push(value);
      newSelecteds.push(name);
    } else {
      setAllEmployees([]);
      newChecked.splice(currentIndex, 1);
      newSelecteds.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setEmployeesSelected(newSelecteds);
  };

  const handleRemoveSelected = (name: string) => () => {
    const currentIndex = employeesSelected.indexOf(name);
    const newChecked = [...checked];
    const newSelecteds = [...employeesSelected];

    newChecked.splice(currentIndex, 1);

    newSelecteds.splice(currentIndex, 1);

    setChecked(newChecked);
    setEmployeesSelected(newSelecteds);
  };

  const handleSelectAll = () => {
    const all: SetStateAction<string[]> = [];
    const newChecked = [...checked];
    // eslint-disable-next-line array-callback-return
    listEmployeesBackup.map((item) => {
      const currentIndex = checked.indexOf(item.id_funcionario);

      if (currentIndex === -1) {
        newChecked.push(item.id_funcionario);
      }

      all.push(item.id_funcionario);
    });
    setChecked(newChecked);
    setAllEmployees(all);
  };

  const handleCancelSelectAll = () => {
    setChecked([]);
    setAllEmployees([]);
    setEmployeesSelected([]);
  };

  useEffect(() => {
    setListEmployees(listEmployeesBackup);

    if (search.length === 0) {
      return;
    }

    const filtrados = listEmployeesBackup.filter((el) =>
      el.nome.toLowerCase().includes(search.toLowerCase())
    );

    setListEmployees(filtrados);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (isLoadingGetAllEmployee) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.WrapperInfo>
        <S.Title>Funcionario(s)</S.Title>
        <S.SubTitle>
          Selecione o(s) funcionario(s) que irão receber esse video
        </S.SubTitle>
      </S.WrapperInfo>

      <S.WrapperContent>
        <FormGroup row sx={{ alignItems: "flex-end", mb: 5 }}>
          <FormGroup sx={{ width: "50%" }}>
            <label style={{ color: "black" }}>
              Buscar funcionário pelo nome
            </label>
            <input
              autoComplete="off"
              style={{
                borderRadius: 4,
                borderColor: "black",
                borderWidth: 1,
                background: "transparent",
                width: "100%",
                height: 42,
                paddingLeft: 15,
                color: "black",
              }}
              onChange={(e: ValueType) => setSearch(e.target.value)}
              value={search}
            />
          </FormGroup>
          <FormGroup sx={{ ml: 3 }}>
            <Button
              title={
                allEmployees.length > 0
                  ? "Cancelar seleção"
                  : "Selecionar todos"
              }
              onClick={
                allEmployees.length > 0
                  ? handleCancelSelectAll
                  : handleSelectAll
              }
            />
          </FormGroup>
        </FormGroup>

        <FormGroup row sx={{ justifyContent: "space-between" }}>
          <List
            dense
            sx={{ width: "50%", bgcolor: "background.paper", height: 350 }}
          >
            {listEmployees.map((value, index) => {
              const labelId = `checkbox-list-secondary-label-${value.nome}`;
              return (
                index < 10 && (
                  <ListItem
                    onClick={
                      allEmployees.length > 0
                        ? () => {}
                        : handleToggle(value.id_funcionario, value.nome)
                    }
                    key={value.id_funcionario}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(
                          value.id_funcionario,
                          value.nome
                        )}
                        disabled={allEmployees.length > 0}
                        checked={checked.indexOf(value.id_funcionario) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={`${value.nome}`} />
                    </ListItemButton>
                  </ListItem>
                )
              );
            })}
          </List>
          {allEmployees.length === 0 && employeesSelected.length > 0 && (
            <List dense sx={{ width: "50%", bgcolor: "background.paper" }}>
              <Typography fontWeight="bold" variant="body1">
                Lista de Selecionados
              </Typography>
              {employeesSelected.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        color="error"
                        aria-label="remove"
                        component="label"
                        onClick={handleRemoveSelected(value)}
                      >
                        <RemoveCircle />
                      </IconButton>
                    }
                    key={value}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={`- ${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </FormGroup>

        <ButtonsForm
          rotaBack="/ti/permissoes"
          title="Confirme"
          handleButton={() => {}}
        />
      </S.WrapperContent>
      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
}
