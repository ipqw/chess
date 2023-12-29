import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GamePreview = observer(({id, name, counter}: {id: number, name: string, counter: number}) => {
    const navigate = useNavigate()
    return(
        <Wrapper style={{display: counter < 2 && counter !== 0 ? 'inline-flex' : 'none'}}>
            <Text>Название: {name ? name : 'без имени'}</Text>
            <Text>Номер: {id}</Text>
            <Button onClick={() => {navigate(`/game/${id}`)}}>Присоединиться</Button>
        </Wrapper>
    )
})
const Text = styled.p`
    padding: 0 10px;
`
const Wrapper = styled.div`
    background-color: rgb(43, 43, 43);
    justify-content: center;
    margin: 10px;
    border-radius: 10px;
    align-items: center;
    flex-direction: column;
    @media (min-width: 400px) {
        flex-direction: row;
    }
`


export default GamePreview