import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import styled from "styled-components";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";
import { serverStore } from "../store/server";
import { useNavigate, useParams } from "react-router-dom";
import { Colors } from "../models/Colors";

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
                <Text style={{display: store.win !== null ? 'block' : 'none'}}>Победа {store.win === Colors.WHITE ? 'белых' : 'черных'}</Text>
            </BoardSettings>
        </Wrapper>
    )
})
export const Text = styled.p`
    font-size: 30px;
    color: #acacac;
`
export const BoardSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
export const TurnBoardBtn = styled.a`
    cursor: pointer;
    margin-bottom: 100px;
`
export const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px 0px;
`
export default GamePage