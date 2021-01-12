import styled from 'styled-components';

export const MenuInfo = styled.div`
    display: flex;
    flex-direction: column;
    font-size: clamp(1.6rem, 5vw, 2.4rem);
    font-weight: 300;
    text-align: ${props => props.textAlign || 'left'}
`