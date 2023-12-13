import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { BoardSettings, Text, TurnBoardBtn, Wrapper } from "./game";
import BoardComponent from "../components/BoardComponent";
import { store } from "../store";
import { serverStore } from "../store/server";
import { Colors } from "../models/Colors";

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
                <Text style={{display: store.win !== null ? 'block' : 'none'}}>Победа {store.win === Colors.WHITE ? 'белых' : 'черных'}</Text>
            </BoardSettings>
        </Wrapper>
    )
})

export default LocalGamePage