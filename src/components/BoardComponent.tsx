import styled from 'styled-components'
import { Board } from '../models/Board'
import { FC } from 'react'
import { Cell } from '../models/Cell'
import CellComponent from './CellComponent'

interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    return(
        <BoardWrapper>
            {board.cells.map((row, index) => {
                return (<div key={index}>
                    {row.map((cell: Cell): any => {
                        return(
                            <CellComponent cell={cell} key={cell.id} />
                        )
                    })}
                </div>)
            })}
        </BoardWrapper>
    )
}

const BoardWrapper = styled.div`
    margin: 20px;
    display: flex;
    border: 2px solid;
`

export default BoardComponent