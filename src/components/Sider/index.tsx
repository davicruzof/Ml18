import { MenuItens } from "./util";
import { useLocation } from "react-router-dom";
import { SiderItem } from "./SiderItem";
import { useMutation, useQuery } from "react-query";
import { getEnterpriseById } from "@services/Enterprises/enterprises";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/auth";
import LOGO from "assets/logo.png";
import { getUser } from "@services/User/user";

export default function Sider({ children }: { children: JSX.Element }) {
  const { authValues } = useContext(AuthContext);
  const [nome, setNome] = useState("ML 18 Portal");
  const [logo, setLogo] = useState("");

  const { mutate: getEnterPrise } = useMutation({
    mutationFn: (formData: number) => getEnterpriseById(formData),
    onSuccess: ({ data }: any) => {
      if (data.logo !== "") {
        setLogo(data.logo);
        setNome(data.nomeempresarial.split(" ").slice(0, 1).join(" "));
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

  const { pathname } = useLocation();
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul
          className="navbar-nav row"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Olá,{" "}
              {dataUser?.user?.nome
                .split(" ")
                .slice(0, 1)
                .join(" ")
                .toLowerCase()}
            </a>
          </li>
        </ul>
      </nav>
      <div className="content-wrapper" style={{ height: "auto" }}>
        {children}
      </div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a className="brand-link">
          {logo ? (
            <img
              src={logo}
              alt="logo"
              className=" img-circle elevation-2"
              style={{
                height: 50,
                width: 50,
                marginRight: 15,
                padding: 3,
                objectFit: "contain",
              }}
            ></img>
          ) : (
            <img
              src={LOGO}
              alt="logo"
              className=" img-circle elevation-2"
              style={{
                height: 50,
                width: 50,
                marginRight: 15,
                padding: 3,
                objectFit: "contain",
              }}
            ></img>
          )}
          <span className="brand-text">{nome}</span>
        </a>
        <div className="sidebar">
          {MenuItens.map((item, index) => (
            <SiderItem
              key={index}
              title={item.title}
              active={
                pathname
                  .toLocaleLowerCase()
                  .includes(
                    item.title
                      .toLocaleLowerCase()
                      .replaceAll("õ", "o")
                      .replaceAll("ç", "c")
                  ) ||
                (pathname === "/" && index === 0)
              }
              subitems={item.subitems}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
