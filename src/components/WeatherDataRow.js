import styled from 'styled-components';

export const WeatherDataRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & + & {
        margin-top: 8vh;
    }

    @media (max-width: 1000px) {
        & + & {
            margin-top: 1vh;
        }
    }
`