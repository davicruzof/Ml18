import { useLocation, useNavigate } from "react-router-dom";
import { MenuItens } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faPeopleArrows,
  faFingerprint,
  faFile,
  faArrowRightToBracket,
  faComment,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface SiderItemProps {
  title: string;
  subitems?: string[];
  active: boolean;
}

export function SiderItem({ title, subitems, active }: SiderItemProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [openItem, setOpenItem] = useState(false);

  const classActive = (active: boolean) =>
    active ? "nav-link active" : "nav-link";

  const activeItem = (item: string) => {
    return (
      pathname.toLocaleLowerCase().includes(cleanString(title)) &&
      pathname.toLocaleLowerCase().includes(cleanString(item))
    );
  };

  const cleanString = (item: string) => {
    return item
      .toLocaleLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("õ", "o")
      .replaceAll("ç", "c")
      .replaceAll("â", "a")
      .replaceAll("á", "a");
  };

  const navigation = (subRoute: string) => {
    const route = cleanString(title);
    const subroute = cleanString(subRoute);
    navigate(`/${route}/${subroute}`, { replace: true });
  };

  const returnIcon = () => {
    if (cleanString(title) === "solicitacoes") return faComment;
    if (cleanString(title) === "ti") return faComputer;
    if (cleanString(title) === "rh") return faPeopleArrows;
    if (cleanString(title) === "ponto-eletronico") return faFingerprint;
    if (cleanString(title) === "sair") return faArrowRightToBracket;

    return faFile;
  };

  const removeClass = () => {
    let element = document.getElementById("item-menu");
    let tree = document.getElementById(title);

    setTimeout(() => {
      if (element) {
        if (openItem) {
          tree!.style.display = "none";
          element.classList.remove("menu-open");
          element.classList.remove("menu-is-opening");
        } else {
          tree!.style.display = "Block";
        }
      }
    }, 10);
    setOpenItem(!openItem);
  };

  return (
    <nav className="mt-4">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li className="nav-item" id="item-menu">
          <a className={classActive(active)} onClick={removeClass}>
            <FontAwesomeIcon className="nav-icon" icon={returnIcon()} />
            <p>
              {title}
              {subitems && subitems.length > 0 && (
                <i className="right fas fa-angle-right"></i>
              )}
            </p>
          </a>

          <ul className="nav nav-treeview" id={title}>
            {subitems &&
              subitems.length > 0 &&
              subitems.map((item, index) => {
                const call =
                  pathname === "/" &&
                  index === 0 &&
                  item === MenuItens[0].subitems[0];
                return (
                  <li
                    className="nav-item"
                    key={index}
                    onClick={() => navigation(item)}
                  >
                    <a className={classActive(activeItem(item) || call)}>
                      <FontAwesomeIcon
                        className="nav-icon"
                        style={{ fontSize: 5 }}
                        icon={faCircle}
                      />
                      <p>{item}</p>
                    </a>
                  </li>
                );
              })}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
