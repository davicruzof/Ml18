import { SetStateAction, useEffect, useMemo, useState } from "react";
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
import {
  EmployeeAreasType,
  EmployeeByIdType,
  departamentosType,
} from "services/Employee/types";
import * as S from "./style";
import Button from "components/Button";
import Snack from "components/Snack";
import listItems from "./components/listItems";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
// import { getUser } from "services/User/user";

const Loader = () => {
  return (
    <S.LoadingContainer>
      <Loading />
    </S.LoadingContainer>
  );
};

const LDist = (
  departamentos: DptTypes[],
  departamentosActive: string[],
  removeSelect: (val: string) => void
) => {
  console.log("departamentosActiveMethod:", departamentosActive);
  return departamentos.map((item) => {
    const active =
      departamentosActive && departamentosActive.includes(item.area);

    return (
      <S.Button
        key={item.id_usuario}
        onClick={() => removeSelect(item.area)}
        isActive={active}
      >
        {item.area}
      </S.Button>
    );
  });
};

export default function EditEmployee() {
  const {
    state: { id },
  } = useLocation();
  const navigate = useNavigate();
  const [departamentosActive, setDepartamentosActive] = useState<string[]>([]);
  const [departamentos, setDepartamentos] = useState<DptTypes[]>([]);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");
  const [checked, setChecked] = useState<string[]>([]);

  console.log(checked);
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

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

  const {
    mutate: getEmployeeByIdFunc,
    isLoading: isLoadingEmployeeById,
    data: getEmployeeByIdResponse,
  } = useMutation({
    mutationFn: (formData: string) => getEmployeeById(formData),
    onSuccess: (data: any) => {
      const { departamentos } = data[0];
      if (departamentos) {
        let auxArr: string[] = [];
        departamentos.map((item: departamentosType) =>
          auxArr.push(item.id_area)
        );
        setChecked(auxArr);
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
          navigate("/Funcionario/List", { replace: true });
        }, 3000);
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
    Loader()
  ) : (
    <S.Container>
      <S.WrapperInfo>
        <S.Title>Departamentos</S.Title>
        <S.SubTitle>
          Vincule esse funcionários ao(s) departamento(s) ao qual ele faz parte
        </S.SubTitle>
      </S.WrapperInfo>
      {getEmployeeByIdResponse && getEmployeeByIdResponse.data && (
        <S.Header>
          <S.Title>Dados do Funcionário</S.Title>
          <S.LabelHeader>
            Registro: {getEmployeeByIdResponse.data[0].registro}
          </S.LabelHeader>
          <S.LabelHeader>
            Nome: {getEmployeeByIdResponse?.data[0].nome}
          </S.LabelHeader>
          <S.LabelHeader>
            Função: {getEmployeeByIdResponse?.data[0].funcao}
          </S.LabelHeader>
          {getEmployeeByIdResponse?.data[0].email && (
            <S.LabelHeader>
              Email: {getEmployeeByIdResponse?.data[0].email}
            </S.LabelHeader>
          )}
          {getEmployeeByIdResponse?.data[0].celular && (
            <S.LabelHeader>
              Telefone: {getEmployeeByIdResponse?.data[0].celular}
            </S.LabelHeader>
          )}
        </S.Header>
      )}
      <S.WrapperContent>
        {/* {departamentos.length > 0 &&
          List(departamentos, departamentosActive, removeSelect)} */}

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
        <Button
          title="Confirmar"
          onClick={handleUpdate}
          active={true}
          disabled={false}
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
