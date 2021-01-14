import styled from 'styled-components';


export const MinLogo = styled.header`
    display: flex;
    height: 7.5rem;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 5vh;

    & img {
        width: clamp(3.75rem, 10vw, 7.5rem);
        margin-right: clamp(0.5rem, 2vw, 1rem);
    }

    & h1 {
        font-size: clamp(1.8rem, 5vw, 3.6rem);
        font-weight: 800;
        line-height: clamp(1.5rem, 5vw, 3rem);
    }

`