import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";
import { serverStore } from "../store/server";
import { Colors } from "../models/Colors";
import styled from "styled-components";
import flipArrow from '../assets/flip-arrow.png'

const LocalGamePage: FC = observer(() => {
    useEffect(() => {
        store.rotateBoard(store.isRotated)
        serverStore.setGame(null)
    }, [])
    return(
        <Wrapper>
            <GameInfo>
                Локальная игра
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
export const TurnBoardImg = styled.img`
    width: 30px;
    height: 30px;
    @media (min-width: 769px) {
        width: 50px;
        height: 50px;
    }
`
export const TurnBoardBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 50px;
    background-color: rgb(25, 118, 210);
    padding: 5px;
    border-radius: 10px;
`
export const TurnBoardText = styled.a`
    text-align: center;
    color: #ffffff;
    padding-left: 10px;
    font-size: calc(8px + 0.5vw);
`
export const GameInfo = styled.div`
    width: 200px;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 10px;
    font-size: calc(16px + 0.7vw);
    color: #ffffff;
`
export const Text = styled.p`
    font-size: 30px;
    color: #acacac;
`
export const BoardSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin-top: 20px;
`
export const Wrapper = styled.div`
    display: flex;
    margin: 20px 0px;
    flex-direction: column;
    align-items: center;
    @media (min-width: 850px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
    }
`

export default LocalGamePage