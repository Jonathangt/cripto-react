import styled from "@emotion/styled";

const Texto = styled.p`
    background-color: #ff0000;
    color: #FFF;
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    font-weight: 700;
    padding: 15px;
    text-align: center;
    text-transform: uppercase;
`


const Error = ( { children } ) => {
    return (
        <Texto> { children } </Texto>
    )
}


export default Error