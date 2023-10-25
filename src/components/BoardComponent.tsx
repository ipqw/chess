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
            store.setSelectedCell(null)
            store.checkAttackedCellsByWhite()
            store.checkAttackedCellsByBlack()
        }
        else{   
            cell.figure ? store.setSelectedCell(cell) : ''
            store.selectedCell?.figure?.getAvalibleCells().map((cellq: Cell) => {
                cellq.available = true
            })

            store.resetAvalibleCells()
        }

    }
    
    return(
        <BoardWrapper>
            {store.board?.cells.map((row, indexNum) => {
                return (<div key={indexNum}>
                    {row.map((cell: Cell, indexLet): any => {
                        return(
                            <CellComponent click={click} indexNum={indexNum} indexLet={indexLet} selected={cell.x === store.selectedCell?.x && cell.y === store.selectedCell?.y } cell={cell} key={cell.id} />
                        )
                    })}
                </div>)
            })}
        </BoardWrapper>
    )
})

const BoardWrapper = styled.div`
    max-height: 800px;
    max-width: 800px;
    margin: 20px;
    display: flex;
`

export default BoardComponent