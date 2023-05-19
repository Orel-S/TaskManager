import styled from 'styled-components';

export const BaseDiv = styled.div`
    background-color: ${props => (props.bgColor || 'lightgray')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Container = styled(BaseDiv)`
    font-family: Arial;
    background-color: #DDDDDD;
    min-height: 100vh;
`
export const Frame = styled(BaseDiv)`
    width: ${props => (props.width)};
    height: ${props => (props.height)};
`
export const TextLabel = styled.label`
    font-size: ${props => (props.size || 18)}px;
    color: ${props => (props.color || 'black')};
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    margin: 15px 40px;
`
export const Row = styled.div`
     display: flex;
    flex-direction: row;
`