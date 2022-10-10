import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { DptTypes } from "services/Solicitacoes/types";
import { useMutation, useQuery } from "react-query";
import { getDepartments } from "services/Solicitacoes";
import { handleChecked, handleCheckedToggle, intersection, not } from "./utils";
import DptButton from "./button";
import Loading from "components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployeeAreas,
} from "services/Employee/employee";
import { EmployeeAreasType } from "services/Employee/types";
import * as S from "./style";
import Button from "components/Buttons/Button";
import Snack from "components/Snack";

export default function EditEmployee() {
  const { id } = useParams();
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

  const listItens = (
    items: DptTypes[],
    checked: string[],
    title: string,
    handleToggle: (value: string) => () => void
  ) => (
    <div>
      {items.length > 0 && (
        <S.Title style={{ paddingLeft: 25 }}>{title}</S.Title>
      )}
      <List dense role="list">
        {items.map((value: DptTypes) => {
          const labelId = `transfer-list-item-${value.area}-label`;

          return (
            <ListItem
              key={value.id_area}
              role="listitem"
              button
              onClick={handleToggle(value.area)}
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
    </div>
  );

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

  if (isLoading) {
    Loader();
  }

  return isLoadingEmployeeById ? (
    Loader()
  ) : (
    <S.Container>
      <S.WrapperInfo>
        <S.Title>Departamentos</S.Title>
        <S.SubTitle>
          Selecione a quais departamentos esse funcionário está vinculado
        </S.SubTitle>
      </S.WrapperInfo>
      {employee && (
        <S.Header>
          <S.Title>Dados do Funcionário</S.Title>
          <S.LabelHeader>Nome: {employee.nome}</S.LabelHeader>
          <S.LabelHeader>Função: {employee.funcao}</S.LabelHeader>
          <S.LabelHeader>Email: {employee.email}</S.LabelHeader>
          <S.LabelHeader>Telefone: {employee.celular}</S.LabelHeader>
        </S.Header>
      )}
      <S.WrapperContent>
        <S.Wrapper>
          <Grid item>
            {listItens(
              departamentosLeft,
              checkedLeft,
              "Selecione os departamentos",
              handleToggleLeft
            )}
          </Grid>
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
          <Grid item>
            {listItens(
              departamentosRight,
              checked,
              "Departamentos selecionados",
              handleToggleRight
            )}
          </Grid>
        </S.Wrapper>
        <Button
          title="Confirmar"
          onClick={handleLinkDepartments}
          active={departamentosRight.length === 0}
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
