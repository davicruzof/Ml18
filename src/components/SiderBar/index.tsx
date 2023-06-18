import { useMutation, useQuery } from "react-query";
import { getEnterpriseById } from "services/Enterprises/enterprises";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/auth";
import { getUser } from "services/User/user";
import Loading from "components/Loading/Loading";

import { Navigation } from "react-minimal-side-navigation";
import { useNavigate } from "react-router-dom";
import { MenuItens } from "./util";
import { LoadingButton } from "@mui/lab";
import * as S from "./styles";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import theme from "utils/theme";

export function SideBar({ children, hideNav = false }: any) {
  const navigate = useNavigate();
  const { authValues } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [logo, setLogo] = useState("");

  const { mutate: getEnterPrise, isLoading } = useMutation({
    mutationFn: (formData: number) => getEnterpriseById(formData),
    onSuccess: ({ data }: any) => {
      if (data.logo !== "") {
        setLogo(data.logo);
        setNome(data.nomeempresarial);
      }
    },
  });

  const { data: dataUser } = useQuery("getUser", {
    queryFn: () => getUser(),
    enabled: true,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (authValues.id_empresa) {
      getEnterPrise(authValues.id_empresa);
    }
  }, [authValues]);

  const navigation = (route: string) => {
    navigate(route, { replace: true });
  };

  const logout = () => {
    localStorage.clear();
    navigation("/");
    window.location.reload();
  };

  const userName = dataUser?.user?.nome
    .split(" ")
    .slice(0, 1)
    .join(" ")
    .toLowerCase();

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {!hideNav && (
        <S.HeaderNav className="main-header navbar navbar-expand">
          <S.HeaderContainer>
            <S.Link
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </S.Link>

            <S.UserInfo>
              <S.Link href="#" className="nav-link">
                Olá, {userName}
              </S.Link>
              <LoadingButton
                sx={{
                  bgcolor: theme.colors.primary,
                  color: "#fff",
                  fontWeight: "bold",
                }}
                size="large"
                variant="contained"
                onClick={logout}
              >
                Sair
              </LoadingButton>
            </S.UserInfo>
          </S.HeaderContainer>
        </S.HeaderNav>
      )}

      <S.MainContainer className="content-wrapper">{children}</S.MainContainer>

      <S.Container className="main-sidebar">
        <S.EnterpriseInfos>
          {logo && <S.Logo src={logo} alt="logo" className="img-circle" />}
          <S.EnterpriseName>{nome}</S.EnterpriseName>
        </S.EnterpriseInfos>
        <Navigation
          activeItemId="/management/members"
          onSelect={({ itemId }) => navigation(itemId)}
          items={MenuItens}
        />
      </S.Container>
    </div>
  );
}
