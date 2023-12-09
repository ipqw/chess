import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { Game, serverStore } from "../store/server";
import GamePreview from "../components/GamePreviewComponent";

const FindGame: FC = observer(() => {
    useEffect(() => {
        serverStore.getAllGames()
        serverStore.setGame(null)
    }, [])
    return(
        <Wrapper>
            <Text>Доступные игры</Text>
            {serverStore.allGames.map((el: Game) => {
                return(
                    <GamePreview key={el.id} name={el.name} id={el.id} counter={el.counter}/>
                )
            })}
        </Wrapper>
    )
})
const Text = styled.p`
    font-size: 30px;
    padding: 20px 0;
`
const Wrapper = styled.div`
    text-align: center;
`
export default FindGame