import styled from 'styled-components'
import { FC } from 'react'
import CellComponent from './CellComponent'
import { Cell } from '../models/Cell'
import { store } from '../store'
import { observer } from 'mobx-react'

const BoardComponent: FC = observer(() => {

    const click = (cell: Cell) => {
        if(store.selectedCell !== null && store.selectedCell.figure?.color === store.turn){
            store.selectedCell.moveFigure(cell)
        }
        else{   
            cell.figure ? store.setSelectedCell(cell) : ''
            store.selectedCell?.figure?.getAvalibleCells().map((cell: Cell) => {
                cell.figure === null ? cell.available = true : cell.available = false
            })
            store.resetAvalibleCells()
        }
    }
    return(
        <BoardWrapper>
            {store.board?.cells.map((row, index) => {
                return (<div key={index}>
                    {row.map((cell: Cell): any => {
                        return(
                            <CellComponent click={click} selected={cell.x === store.selectedCell?.x && cell.y === store.selectedCell?.y } cell={cell} key={cell.id} />
                        )
                    })}
                </div>)
            })}
        </BoardWrapper>
    )
})

const BoardWrapper = styled.div`
    margin: 20px;
    display: flex;
    border: 2px solid;
`

export default BoardComponent