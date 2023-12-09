import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import styled from "styled-components";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";
import { serverStore } from "../store/server";
import { useNavigate, useParams } from "react-router-dom";

const GamePage: FC = observer(() => {
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        serverStore.joinGame(id || 'null')
        store.rotateBoard(store.isRotated)
    }, [])
    useEffect(() => {
        if(serverStore.status !== null){
            serverStore.status ? '' : navigate('/')
        }
    }, [serverStore.status])

    // обновление игры каждую секунду
    useEffect(() => {
        const timer = setInterval(() => {
            serverStore.updateGame(id || '0')
        }, 100);
        
        return () => clearInterval(timer);
    })
    return(
        <Wrapper>
            <BoardComponent />
            <BoardSettings>
                <TurnBoardBtn onClick={() => store.rotateBoard(!store.isRotated)}>Перевернуть доску</TurnBoardBtn>
            </BoardSettings>
        </Wrapper>
    )
})

export const BoardSettings = styled.div`
    
`
export const TurnBoardBtn = styled.a`
    cursor: pointer;
`
export const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px 0px;
`
export default GamePage