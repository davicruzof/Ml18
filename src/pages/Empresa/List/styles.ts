import styled from 'styled-components';
import { width } from '../../../utils/constants';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const Wrapper = styled.div`
    flex: 1;
    margin-left: 20%;
    padding: 10%;
    padding-top: 5%;
    padding-bottom: 40px;
    display: flex;

    flex-direction: column;

    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 5%;
        margin-left: 0%;
    }
`;

export const TableTitle = styled.div`
    display: flex;
    padding: 15px;
    margin-top: 40px;
    border: 2px solid #cacaca;
    border-bottom: none;
`;

export const TableItem = styled.div`
    display: flex;
    padding: 15px;
    align-items: center;
    border: 2px solid #cacaca;
`;

export const ID = styled.span`
    border-right: 2px solid #cacaca;
    width: ${(width * 2 < 1200) ? '10%' : '5%'};;
    
`;
export const RAZAO = styled.span`
    border-right: 2px solid #cacaca;
    width: ${(width * 2 < 1200) ? '70%' : '50%'};
    padding-left: 10px;
`;
export const CNPJ = styled.span`
    border-right: 2px solid #cacaca;
    width: 25%;
    padding-left: 10px;
`;
export const SITUACAO = styled.span`
    border-right: 2px solid #cacaca;
    width: 15%;
    padding-left: 10px;
`;
export const ACTION = styled.span`
    padding-left: 10px; 
    width: 8%;
`;

export const WrapperPagination = styled.div`
    margin: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
`;
