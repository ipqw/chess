import styled from 'styled-components'
import { Cell } from '../models/Cell'
import { FC } from 'react'
import { Figure } from '../models/Figures/Figure'

interface CellProps {
    cell: Cell
}

const CellComponent: FC<CellProps> = ({cell}) => {
    console.log(cell)
    return(
        <CellWrapper style={{backgroundColor: cell.color}}>
            <img src={cell.figure?.logo} /> 
        </CellWrapper>
    )
}

const CellWrapper = styled.div`
    width: 100px;
    height: 100px;
`

export default CellComponent