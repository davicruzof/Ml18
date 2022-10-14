import { Grid } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(242, 245, 249, 1);
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgba(242, 245, 249, 1);
`;

export const Header = styled(Grid).attrs({
  container: true,
})`
  display: flex;
  flex-direction: column !important;
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export const Wrapper = styled(Grid).attrs({
  container: true,
})`
  background: ${(props) => props.theme.colors.white};
  justify-content: space-around;
`;

export const WrapperContent = styled(Grid).attrs({
  container: true,
})`
  background: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 50px 0;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const SubTitle = styled.span`
  font-size: 14px;
  margin-bottom: 32px;
  color: #837678;
`;

export const LabelHeader = styled.span`
  display: flex;
  flex: 1;
  width: 100%;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const WrapperInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
