import styled from 'styled-components';

export const TemperatureBox = styled.div`
    position: relative;
    width: clamp(22.4rem, 40vw, 52.6rem);
    height: auto;
    display: flex;
    align-items: center;
    padding-left: 10rem;
    background: ${props => props.temperature < 15 ? "linear-gradient(104.78deg, #758AE6 10.08%, #415194 79.97%)" : props.temperature >= 15 && props.temperature <= 30 ? "linear-gradient(93.51deg, #6ADBFF 4.86%, #50B5FE 46.66%, #4E8AFF 85.57%);" : "linear-gradient(96.2deg, #FFB800 7.09%, #F24242 80.28%)"};
    border-radius: 1.8rem;

    & img {
        position: absolute;
        left: -6rem;
        top: -4rem;
    }

    & h1.temperature {
        font-size: 8.1rem;
        font-weight: 800;
    }

    & div.info {
        display: flex;
        flex-direction: column;
        margin-left: 1.5rem;
    }

    & div.info p.temperature-description {
        font-size: 2.4rem;
        font-weight: 800;
    }

    & div.info p.city-name {
        font-size: 1.4rem;
        font-weight: 900;
    }

    & div.info p.weather-updated-time {
        font-size: 1.2rem;
        font-weight: 400;
    }

    @media (max-width: 1000px) {
        width: 100%;
    }

    @media (max-width: 700px) {
        margin-top: 5vh;
        padding-left: 0;
        min-height: 12rem;
        padding: 0rem 2rem;


        & img {
        position: initial;
        width: clamp(5rem, 4vw, 14.4rem);
        margin-right: 1rem;
        }

        & h1.temperature {
            font-size: clamp(1.6rem, 10vw, 8.1rem)
        }

        & div.info {
            margin-left: 1rem;
        }

        & div.info p.temperature-description {
            font-size: clamp(1rem, 6vw, 2.4rem);
            font-weight: 800;
        }

        & div.info p.city-name {
            font-size: clamp(0.8rem, 4vw, 1.4rem);
        }

        & div.info p.weather-updated-time {
            font-size: clamp(0.4rem, 4vw, 1.2rem);
            font-weight: 400;
        }
    }
`