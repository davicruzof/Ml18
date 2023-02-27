import { useEffect, useMemo, useState } from "react";
import { DptTypes } from "services/Solicitacoes/types";
import { useMutation, useQuery } from "react-query";
import { getDepartments } from "services/Solicitacoes";
import Loading from "components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getEmployeeById,
  updateEmployeeAreas,
} from "services/Employee/employee";

import {
  EmployeeAreasType,
  EmployeeByIdType,
  departamentosType,
} from "services/Employee/types";
import * as S from "./style";

import Snack from "components/Snack";

import {
  Checkbox,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ButtonsForm } from "components/ButtonsForm";

export default function PermissionEdit() {
  const {
    state: { id },
  } = useLocation();

  const navigate = useNavigate();
  const [departamentos, setDepartamentos] = useState<DptTypes[]>([]);
  const [employeeByIdResponse, setEmployeeByIdResponse] =
    useState<EmployeeByIdType | null>(null);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");
  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  const { isLoading: isLoadingDepartamentos } = useQuery("getDepartments", {
    queryFn: () => getDepartments(),
    enabled: true,
    keepPreviousData: true,
    onSuccess: (data: DptTypes[]) => {
      setDepartamentos(data);
    },
  });

  const { mutate: getEmployeeByIdFunc, isLoading: isLoadingEmployeeById } =
    useMutation({
      mutationFn: (formData: string) => getEmployeeById(formData),
      onSuccess: (data: any) => {
        if (data) {
          const user = data[0];
          setEmployeeByIdResponse(user);
          const { departamentos } = user;
          if (departamentos) {
            let auxArr: string[] = [];
            departamentos.map((item: departamentosType) =>
              auxArr.push(item.id_area)
            );
            setChecked(auxArr);
          }
        }
      },
    });

  const { mutate: updateEmployee, isLoading: isLoadingUpdateEmployee } =
    useMutation({
      mutationFn: (formData: EmployeeAreasType) =>
        updateEmployeeAreas(formData),
      onSuccess: () => {
        setSnackStatus(true);
        setSnackType("success");
        setSnackMessage("Departamentos vinculados com sucesso!");
        setTimeout(() => {
          navigate("/ti/permissoes", { replace: true });
        }, 1000);
      },
    });

  const handleUpdate = () => {
    const sendData: EmployeeAreasType = {
      area: checked,
      id_funcionario: id,
    };
    updateEmployee(sendData);
  };

  useEffect(() => {
    id && getEmployeeByIdFunc(id);
  }, [id]);

  const isLoading = useMemo(() => {
    return (
      isLoadingDepartamentos || isLoadingEmployeeById || isLoadingUpdateEmployee
    );
  }, [isLoadingDepartamentos, isLoadingEmployeeById, isLoadingUpdateEmployee]);

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
      {employeeByIdResponse && (
        <S.Header>
          <S.Title>Dados do Funcionário</S.Title>
          <S.LabelHeader>Nome: {employeeByIdResponse.nome}</S.LabelHeader>
          {employeeByIdResponse.email && (
            <S.LabelHeader>Email: {employeeByIdResponse.email}</S.LabelHeader>
          )}
          <FormGroup row>
            {employeeByIdResponse.funcao && (
              <S.LabelHeader>
                Função: {employeeByIdResponse.funcao}
              </S.LabelHeader>
            )}
            <S.LabelHeader>
              Registro: {employeeByIdResponse.registro}
            </S.LabelHeader>
            {employeeByIdResponse.celular && (
              <S.LabelHeader>
                Telefone: {employeeByIdResponse.celular}
              </S.LabelHeader>
            )}
          </FormGroup>
        </S.Header>
      )}
      <S.WrapperContent>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {departamentos.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.area}`;
            return (
              <ListItem
                key={value.area}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value.id_area)}
                    checked={checked.indexOf(value.id_area) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={`${value.area}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <ButtonsForm
          rotaBack="/ti/permissoes"
          title="Confirme"
          handleButton={handleUpdate}
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
