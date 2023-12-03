import styled from 'styled-components'
import { FC, useEffect, useState } from 'react'
import CellComponent from './CellComponent'
import { Cell } from '../models/Cell'
import { store } from '../store'
import { observer } from 'mobx-react'

const BoardComponent: FC = observer(() => {
    const [isRotated, setIsRotated] = useState(false)
    useEffect(() => {
        store.restartBoard()
        store.doMove('d2-d4')
    }, [])

    useEffect(() => {
        setIsRotated(store.isRotated)
    }, [store.isRotated])
    
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
        <BoardWrapper style={{transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>
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
    display: flex;
`

export default BoardComponent