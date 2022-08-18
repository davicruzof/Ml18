import styled from 'styled-components';

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
    display: flex;

    flex-direction: column;

    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 5%;
        margin-left: 0%;
    }
`;

export const InputGroup = styled.div`
    
    display: flex;

    flex-direction: row;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

