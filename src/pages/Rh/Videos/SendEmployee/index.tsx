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

  const handleToggle = (value: string, name: string) => () => {
    const currentIndex = checked.indexOf(value);
    const currentIndexSelected = employeesSelected.indexOf(name);
    const newChecked = [...checked];
    const newSelecteds = [...employeesSelected];

    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1);

    currentIndexSelected === -1
      ? newSelecteds.push(name)
      : newSelecteds.splice(currentIndexSelected, 1);

    setChecked(newChecked);
    setEmployeesSelected(newSelecteds);
  };

  const handleRemoveSelected = (name: string) => () => {
    const currentIndexSelected = employeesSelected.indexOf(name);

    const newSelecteds = [...employeesSelected];

    console.log(newSelecteds);

    newSelecteds.splice(currentIndexSelected, 1);

    setEmployeesSelected(newSelecteds);
  };

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

  const handleSelectAll = () => {
    const all: SetStateAction<string[]> = [];
    listEmployeesBackup.map((item) => all.push(item.id_funcionario));
    setAllEmployees(all);
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

  const isLoading = useMemo(() => {
    return isLoadingGetAllEmployee;
  }, [isLoadingGetAllEmployee]);

  return isLoading ? (
    <Loading />
  ) : (
    <S.Container>
      <S.WrapperInfo>
        <S.Title>Departamentos</S.Title>
        <S.SubTitle>
          Vincule esse funcionários ao(s) departamento(s) ao qual ele faz parte
        </S.SubTitle>
      </S.WrapperInfo>

      <S.WrapperContent>
        <FormGroup row sx={{ alignItems: "center" }}>
          <InputForm
            label="Buscar funcionário"
            onChange={(e: ValueType) => setSearch(e.target.value)}
            value={search}
          />
          <FormGroup sx={{ ml: 3 }}>
            <Button title="Selecionar todos" onClick={handleSelectAll} />
          </FormGroup>
        </FormGroup>

        <FormGroup row sx={{ justifyContent: "space-between" }}>
          <List dense sx={{ width: "50%", bgcolor: "background.paper" }}>
            {listEmployees.map((value, index) => {
              const labelId = `checkbox-list-secondary-label-${value.nome}`;
              return (
                index < 10 && (
                  <ListItem
                    onClick={() =>
                      handleToggle(value.id_funcionario, value.nome)
                    }
                    key={value.id_funcionario}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(
                          value.id_funcionario,
                          value.nome
                        )}
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
          {employeesSelected.length > 0 && (
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
                        onClick={() => handleRemoveSelected(value)}
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
