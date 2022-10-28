import React from "react";
import * as S from "./styles";

import { Itens, MenuItens } from "./util";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { SiderItem } from "./SiderItem";

export default function Sider({ children }: { children: JSX.Element }) {
  const { setAuthValues } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.clear();
    setAuthValues(null);
    navigate("/Login", { replace: true });
    window.location.reload();
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
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
        </ul>
      </nav>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">{children}</div>
        </section>
      </div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a className="brand-link">
          {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
          style="opacity: .8"> */}
          <span className="brand-text font-weight-light">AdminLTE 3</span>
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
