import styled from 'styled-components'
import { Cell } from '../models/Cell'
import { FC } from 'react'
interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return(
        <CellWrapper onClick={() => {click(cell)}} style={{backgroundColor: selected ? 'red' : cell.color, }}>
            {cell?.figure?.logo && <FigureLogo src={cell.figure.logo} />}
        </CellWrapper>
    )
}

const CellWrapper = styled.div`
    width: 100px;
    height: 100px;
`
const FigureLogo = styled.img`
    width: 100px;
    height: 100px;
`

export default CellComponent