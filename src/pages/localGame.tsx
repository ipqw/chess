import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { BoardSettings, TurnBoardBtn, Wrapper } from "./game";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";

const LocalGamePage: FC = observer(() => {
    useEffect(() => {
        store.rotateBoard(store.isRotated)
    }, [])
    return(
        <Wrapper>
            <BoardComponent />
            <BoardSettings>
                <TurnBoardBtn onClick={() => store.rotateBoard(!store.isRotated)}>Перевернуть доску</TurnBoardBtn>
            </BoardSettings>
        </Wrapper>
    )
})

export default LocalGamePage