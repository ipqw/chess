import styled from 'styled-components'
import CellComponent from './CellComponent'
import { Board } from '../models/Board'
import React, { FC } from 'react'

interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    return(
        <Wrapper>
            {board.cells.map((row, index) => {
                return <></>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 20px;
    display: flex;
    border: 2px solid;
`

export default BoardComponent