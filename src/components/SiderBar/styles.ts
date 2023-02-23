import { height } from "./../../utils/constants";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bgSider};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
  height: 100vh !important;
`;

export const EnterpriseInfos = styled.aside`
  display: flex;
  flex-direction: row;
  min-height: 100px;
  align-items: center;
  padding: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`;

export const EnterpriseName = styled.span`
  color: white;
  font-weight: bold;
`;

export const HeaderNav = styled.nav`
  background-color: ${(props) => props.theme.colors.bgSider};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Link = styled.a`
  color: #fff;

  &:hover {
    color: #fff !important;
  }
`;

export const Logo = styled.img`
  height: 100px;
  max-width: 50px;
  margin-right: 15px;
  padding: 1px;
  object-fit: contain;
`;

export const MainContainer = styled.div`
  height: auto;
`;
