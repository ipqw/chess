import { observer } from "mobx-react";
import { FC } from "react";
import styled from "styled-components";

const ErrorPage: FC = observer(() => {
    return(
        <Wrapper>
            <Title>Oops!</Title>
            <Text>Sorry, an unexpected error was occurred.</Text>
            <ErrorText>Not Found</ErrorText>
        </Wrapper>
    )
})

const Wrapper = styled.div`
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const Title = styled.p`
    font-size: 40px;
    font-weight: 600;
`
const Text = styled.p`
    
`
const ErrorText = styled.p`
    opacity: 50%;
`
export default ErrorPage