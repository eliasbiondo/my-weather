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

        &.fullsize {
            width: 100%;
        }

        & p {
            font-size: clamp(1.4rem, 5vw, 2.2rem);
        }
        
        & .climatic-data-row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & div {
                display: flex;
                width: 25rem
            }

            & p {
                font-size: clamp(1.4rem, 5vw, 2.2rem);
                font-weight: 400;
                margin-left: 2rem;
            }

            & img {
                width: clamp(1rem, 4vw, 4rem)
            }
        }

        & .climatic-data-row + .climatic-data-row {
            margin-top: 1vh;
        }
    }

    @media (max-width: 1000px) {
        width: 100%;
        margin-top: 4vh;

        & .climatic-data-column {
            width: 100%;
            justify-content: space-between;
        
    }

    }

    @media (max-width: 700px) {
        width: 100%;
        flex-wrap: wrap;

        & .climatic-data-column {
            width: 100%;
            justify-content: space-between;

            & p {
                display: flex;
                justify-content: space-between;
            }

        }
    }
`