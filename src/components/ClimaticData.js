import styled from 'styled-components';

export const ClimaticData = styled.div`
    display: flex;
    justify-content: space-between;
    width: clamp(22.4rem, 38vw, 52.6rem);
    height: auto;

    & .climatic-data-column {
        display: flex;
        flex-direction: column;
        justify-content: center;

        & p {
            font-size: clamp(1.6rem, 10vw, 2.2rem);
        }
    }

    @media (max-width: 1000px) {
        width: 100%;
        margin-top: 5vh;
    }
`