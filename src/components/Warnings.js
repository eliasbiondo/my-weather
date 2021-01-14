import styled from 'styled-components';

export const Warnings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    p {
        max-width: 64rem;
        text-align: center;
        font-size: clamp(1.8rem, 1.8vw, 2.4rem);
        font-weight: 300;
    }

    p + p {
        max-width: 76rem;
        font-weight: 800;
        margin-top: 2rem;
    }

    h1 {
        font-size: clamp(3.6rem, 12vw, 9.6rem);
        font-weight: 900;
        text-align: center;
    }
`