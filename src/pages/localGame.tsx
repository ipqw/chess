import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { BoardSettings, TurnBoardBtn, Wrapper } from "./game";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";
import { serverStore } from "../store/server";

const LocalGamePage: FC = observer(() => {
    useEffect(() => {
        store.rotateBoard(store.isRotated)
        serverStore.setGame(null)
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