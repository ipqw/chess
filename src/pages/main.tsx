import { observer } from "mobx-react";
import { FC } from "react";
import styled from "styled-components";

const MainPage: FC = observer(() => {
    return(
        <Wrapper>
            <ButtonWrapper>
                <Button>Найти игру</Button>
                <Button>Создать игру</Button>
                <Button>Играть на одном компьютере</Button>
            </ButtonWrapper>
        </Wrapper>
    )
})

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 70vh;
`

const Button = styled.a`
    border-radius: 5px;
    background-color: #3f3d38;
    text-decoration: none;
    color: #929999;
    padding: 15px;
    cursor: pointer;
    text-align: center;
    font-size: 26px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`
export default MainPage