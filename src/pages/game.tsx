import { observer } from "mobx-react";
import { FC } from "react";
import styled from "styled-components";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";

const GamePage: FC = observer(() => {
    return(
        <Wrapper>
            <BoardComponent />
            <BoardSettings>
                <TurnBoardBtn onClick={() => store.rotateBoard()}>Перевернуть доску</TurnBoardBtn>
            </BoardSettings>
        </Wrapper>
    )
})

const BoardSettings = styled.div`
    
`
const TurnBoardBtn = styled.a`
    cursor: pointer;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px 0px;
`
export default GamePage