import styled from 'styled-components';

export const LocationRequestScreen = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(169.07deg, #5F82FF 1.13%, #6ADBFF 84.78%);
    background-size: 100%;

    & .citybg {
        width: 100%;
        height: 45vh;
        background: url('/images/city-bg.png') repeat-x bottom;
        background-size: contain;
    }
`