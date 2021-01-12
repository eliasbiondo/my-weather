import styled from 'styled-components';


export const Logo = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & img {
        width: clamp(6.4rem, 10vw, 16rem);
        margin-right: clamp(1rem, 2vw, 3rem);
    }

    & h1 {
        font-size: clamp(2.4rem, 5vw,7.2rem);
        font-weight: 900;
        line-height: clamp(2.4rem, 5vw, 6rem);
    }

    @media (max-width: 700px) {
        order: -1;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 2vh;

        & img {
            width: clamp(6.4rem, 24vw, 16rem);
            margin-right: clamp(1rem, 2vw, 3rem);
        }

        & h1 {
            font-size: clamp(3.6rem, 12vw, 7.2rem);
            font-weight: 900;
            line-height: clamp(3rem, 10vw, 6rem);
        }
    }

`