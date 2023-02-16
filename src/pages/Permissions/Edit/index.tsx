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
import { getUser } from "services/User/user";

const Loader = () => {
  return (
    <S.LoadingContainer>
      <Loading />
    </S.LoadingContainer>
  );
};

export default function EditEmployee() {
  const {
    state: { id },
  } = useLocation();
  const navigate = useNavigate();
  const [departamentosActive, setDepartamentosActive] = useState<string[]>([]);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const { data: Departamentos, isLoading: isLoadingDepartamentos } = useQuery(
    "getDepartments",
    {
      queryFn: () => getDepartments(),
      enabled: true,
      keepPreviousData: true,
    }
  );

  const {
    mutate: getEmployeeByIdFunc,
    isLoading: isLoadingEmployeeById,
    data: getEmployeeByIdResponse,
  } = useMutation({
    mutationFn: (formData: string) => getEmployeeById(formData),
  });

  // const {
  //   data: User,
  //   isLoading: isLoadingUser,
  //   refetch: refetchGetUser,
  // } = useQuery("getUser", {
  //   queryFn: () => getUser(),
  //   enabled: true,
  //   keepPreviousData: true,
  // });

  // const { mutate: updateEmployee, isLoading: isLoadingUpdateEmployee } =
  //   useMutation({
  //     mutationFn: (formData: EmployeeAreasType) =>
  //       updateEmployeeAreas(formData),
  //     onSuccess: () => {
  //       setSnackStatus(true);
  //       setSnackType("success");
  //       setSnackMessage("Departamentos vinculados com sucesso!");
  //       setTimeout(() => {
  //         navigate("/Funcionario/List", { replace: true });
  //       }, 3000);
  //     },
  //   });

  // const employee = useMemo(() => {
  //   return emp && emp.data && emp.data[0];
  // }, [emp]);

  // useEffect(() => {
  //   const formatDepartamentos =
  //     User &&
  //     User.departamentos.map((item) => {
  //       return item.area;
  //     });

  //   setDepartamentosActive(formatDepartamentos as string[]);
  // }, [User]);

  useEffect(() => {
    id && getEmployeeByIdFunc(id);
  }, [id]);

  const isLoading = useMemo(() => {
    return (
      isLoadingDepartamentos || isLoadingEmployeeById || isLoadingDepartamentos
    );
  }, [isLoadingDepartamentos, isLoadingEmployeeById, isLoadingDepartamentos]);

  console.log(
    "departamentosActive:",
    getEmployeeByIdResponse,
    "Departamentos:",
    Departamentos
  );

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
        {Departamentos &&
          Departamentos.map((item) => {
            const active =
              departamentosActive && departamentosActive.includes(item.area);

            return (
              <S.Button
                key={item.id_usuario}
                onClick={() => {}}
                isActive={active}
              >
                {item.area}
              </S.Button>
            );
          })}

        <Button
          title="Confirmar"
          onClick={() => {}}
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
