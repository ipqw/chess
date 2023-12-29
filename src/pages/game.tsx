import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import BoardComponent from "../components/BoardComponent";
import { BoardSettings, GameInfo, Text, TurnBoardBtn, TurnBoardImg, TurnBoardText, Wrapper } from "./localGame";
import { store } from "../store";
import { serverStore } from "../store/server";
import { useNavigate, useParams } from "react-router-dom";
import { Colors } from "../models/Colors";
import flipArrow from '../assets/flip-arrow.png'


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
        }, 1000);
        
        return () => clearInterval(timer);
    })
    return(
        <Wrapper>
            <GameInfo>
                Сетевая игра {id}
            </GameInfo>
            <BoardComponent />
            <BoardSettings>
                <TurnBoardBtn onClick={() => store.rotateBoard(!store.isRotated)}>
                    <TurnBoardImg src={flipArrow}/>
                    <TurnBoardText>Перевернуть доску</TurnBoardText>
                </TurnBoardBtn>
                <Text style={{display: store.win !== null ? 'block' : 'none'}}>Победа {store.win === Colors.WHITE ? 'белых' : 'черных'}</Text>
            </BoardSettings>
        </Wrapper>
    )
})
export default GamePage