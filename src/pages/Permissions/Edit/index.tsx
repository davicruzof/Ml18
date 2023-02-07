import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { DptTypes } from "services/Solicitacoes/types";
import { useMutation, useQuery } from "react-query";
import { getDepartments } from "services/Solicitacoes";
import { handleChecked, handleCheckedToggle, intersection, not } from "./utils";
import Loading from "components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployeeAreas,
} from "services/Employee/employee";
import { EmployeeAreasType } from "services/Employee/types";
import * as S from "./style";
import Button from "components/Button";
import Snack from "components/Snack";
import listItems from "./components/listItems";

export default function EditEmployee() {
  const {
    state: { id },
  } = useLocation();
  const navigate = useNavigate();
  const [departamentosLeft, setDepartamentosLeft] = useState<DptTypes[]>([]);
  const [departamentosRight, setDepartamentosRight] = useState<DptTypes[]>([]);
  const [departamentosListLeft, setDepartamentosListLeft] = useState<string[]>(
    []
  );
  const [departamentosListRight, setDepartamentosListRight] = useState<
    string[]
  >([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [checkedLeft, setCheckedLeft] = useState<string[]>([]);

  const leftChecked = intersection(checkedLeft, departamentosListLeft);
  const rightChecked = intersection(checked, departamentosListRight);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const {
    mutate: getEmployeeByIdFunc,
    isLoading: isLoadingEmployeeById,
    data: emp,
  } = useMutation({
    mutationFn: (formData: string) => getEmployeeById(formData),
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
          navigate("/Funcionario/List", { replace: true });
        }, 3000);
      },
    });

  const employee = useMemo(() => {
    return emp && emp.data && emp.data[0];
  }, [emp]);

  const { isLoading: isLoadingDepartamentos, refetch: refetchDpts } = useQuery(
    "getDepartments",
    {
      queryFn: () => getDepartments(),
      enabled: false,
      keepPreviousData: false,
      onSuccess: (data: DptTypes[]) => {
        data.length > 0 && setDepartamentosLeft(data);
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

  useEffect(() => {
    refetchDpts();
  }, []);

  useEffect(() => {
    id && getEmployeeByIdFunc(id);
  }, [id]);

  const Loader = () => {
    return (
      <S.LoadingContainer>
        <Loading />
      </S.LoadingContainer>
    );
  };

  const handleLinkDepartments = () => {
    if (!id) return;

    const area = departamentosRight.map((item) => item.id_area);
    const updateData = {
      id_funcionario: id,
      area,
    };
    updateEmployee(updateData);
  };

  const isLoading = useMemo(() => {
    return (
      isLoadingDepartamentos || isLoadingEmployeeById || isLoadingUpdateEmployee
    );
  }, [isLoadingDepartamentos, isLoadingEmployeeById, isLoadingUpdateEmployee]);

  return isLoadingEmployeeById || isLoading ? (
    Loader()
  ) : (
    <S.Container>
      <S.WrapperInfo>
        <S.Title>Departamentos</S.Title>
        <S.SubTitle>
          Vincule esse funcionários ao(s) departamento(s) ao qual ele faz parte
        </S.SubTitle>
      </S.WrapperInfo>
      {employee && (
        <S.Header>
          <S.Title>Dados do Funcionário</S.Title>
          <S.LabelHeader>Registro: {employee.registro}</S.LabelHeader>
          <S.LabelHeader>Nome: {employee.nome}</S.LabelHeader>
          <S.LabelHeader>Função: {employee.funcao}</S.LabelHeader>
          {employee.email && (
            <S.LabelHeader>Email: {employee.email}</S.LabelHeader>
          )}
          {employee.celular && (
            <S.LabelHeader>Telefone: {employee.celular}</S.LabelHeader>
          )}
        </S.Header>
      )}
      <S.WrapperContent>
        <S.Wrapper>
          <Grid item>
            {listItems(
              departamentosLeft,
              checkedLeft,
              "Selecione os departamentos",
              handleToggleLeft
            )}
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                onClick={handleAllRight}
                active={departamentosLeft.length > 0}
                disabled={departamentosLeft.length === 0}
                title="Adicionar todos"
              />
              <Button
                onClick={handleCheckedRight}
                active={leftChecked.length > 0}
                disabled={leftChecked.length === 0}
                title="Adicionar selecionados"
              />
              <Button
                onClick={handleCheckedLeft}
                active={rightChecked.length > 0}
                disabled={rightChecked.length === 0}
                title="Remover selecionados"
              />
              <Button
                onClick={handleAllLeft}
                disabled={departamentosRight.length === 0}
                active={departamentosRight.length > 0}
                title="Remover todos"
              />
            </Grid>
          </Grid>
          <Grid item>
            {listItems(
              departamentosRight,
              checked,
              "Departamentos selecionados",
              handleToggleRight
            )}
          </Grid>
        </S.Wrapper>
        <S.WrapperButton>
          <Button
            title="Confirmar"
            onClick={handleLinkDepartments}
            active={departamentosRight.length > 0}
            disabled={departamentosRight.length === 0}
          />
        </S.WrapperButton>
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
