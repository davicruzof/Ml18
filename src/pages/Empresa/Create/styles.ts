import styled from "styled-components";
import theme from "utils/theme";

export const Container = styled.div`
  padding: 30px 40px;
  height: fit-content;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
`;
export const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 32px;
`;

export const ContainerSteps = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 32px 0;
`;

export const StepWrapper = styled.div`
  width: 32%;
`;

export const StepProgress = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) =>
    active ? theme.colors.primary : theme.colors.text.siderItemDisabled};
  height: 10px;
`;

export const Logo = styled.img`
  margin-right: 20px;
  background-color: ${theme.colors.primary};
  height: 50px
  width: 50px;
  padding: 1px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);
`;

export const colorPreview = styled.div<{ cor: string }>`
  background-color: ${({ cor }) => (cor ? `#${cor}` : "#fff")};
  height: 52px
  width: 80px
  border-radius: 4px
  border: 1px solid ${theme.colors.text.disabled};
  margin-left: 14px;
  margin-bottom: -14px;
`;
