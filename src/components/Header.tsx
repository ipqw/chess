import { Button } from "@mui/material";
import { observer } from "mobx-react";
import styled from "styled-components";
import { store } from "../store";

const Header = observer(() => {
    return(
        <Wrapper>
            <TitleDiv>
                <Title href="/">Chess</Title>
                <Button onClick={() => store.setIsDev(true)}>dev mode</Button>
                <Button onClick={() => store.setIsDev(false)}>off dev mode</Button>
            </TitleDiv>
            <AccountDiv>
                <AccountText href="/login">Войти</AccountText>
                <AccountText href="/registration">Зарегестрироваться</AccountText>
            </AccountDiv>
        </Wrapper>
    )
})

const AccountText = styled.a`
    text-decoration: none;
    margin: 0px 30px;
    color: #3692e7;
    cursor: pointer;
`
const TitleDiv = styled.div`
    display: flex;
    align-items: center;
`
const AccountDiv = styled.div`
    display: flex;
    align-items: center;
`
const Wrapper = styled.div`
    display: flex;  
    justify-content: space-between;
    padding: 10px 30px;
    box-shadow: 0px 5px 5px rgb(36, 36, 36);
`
const Title = styled.a`
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 36px;
    font-family: 'Noto Sans', sans-serif;
`
export default Header