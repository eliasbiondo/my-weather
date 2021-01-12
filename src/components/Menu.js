import styled from 'styled-components';

export const Menu = styled.div`
    width: 100%;
    margin-top: 5vh;
    margin-bottom: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;

    @media (max-width: 700px) {
        margin-bottom: 0;
    }
`