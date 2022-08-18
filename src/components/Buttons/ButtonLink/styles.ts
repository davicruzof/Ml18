import styled from 'styled-components';

export const Container = styled.a`
  background-color: transparent;
  margin-bottom: 32px;
`;

export const TextButton = styled.span`
  color: #435bc2;
  ${(props: {focus: boolean}) => props.focus && 'font-weight: bold'}
  font-size: 14px;
`;
