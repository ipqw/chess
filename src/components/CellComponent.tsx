import styled from 'styled-components'
import { Cell } from '../models/Cell'
import { FC } from 'react'
interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void,
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return(
        <CellWrapper onClick={() => {click(cell)}} style={{backgroundColor: selected ? 'red' : cell.color, }}>
            <AvalibleWrapper style={{display: cell.available ? 'block' : 'none'}} />
            {cell?.figure?.logo && <FigureLogo src={cell.figure.logo} />}
        </CellWrapper>
    )
}

const AvalibleWrapper = styled.div`
    width: 20px;
	height: 20px;
	background: #575757;
	border-radius: 50px;
    z-index: 1;
`

const CellWrapper = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;    
    align-items: center;
`

const FigureLogo = styled.img`
    z-index: 0;
    width: 100px;
    height: 100px;
`

export default CellComponent