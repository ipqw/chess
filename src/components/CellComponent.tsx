import styled from 'styled-components'
import { Cell } from '../models/Cell'
import { FC } from 'react'
interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void,
    indexNum: number
    indexLet: number
}

const CellComponent: FC<CellProps> = ({cell, selected, click, indexNum, indexLet}) => {
    const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const numbers: number[] = [8, 7, 6, 5, 4, 3, 2, 1]
    return(
        <Wrapper>
            <NumWrapper style={{display: indexNum === 0 ? 'block' : 'none'}}>{numbers[indexLet]}</NumWrapper>
            <div>
                <CellWrapper onClick={() => {click(cell)}} style={{backgroundColor: selected ? 'red' : cell.color, }}>
                    <AvalibleWrapper style={{display: cell.available ? 'block' : 'none'}} />
                    {cell?.figure?.logo && <FigureLogo src={cell.figure.logo} />}
                </CellWrapper>
                <LetWrapper style={{display: indexLet === 7 ? 'block' : 'none'}}>{letters[indexNum]}</LetWrapper>
            </div>
        </Wrapper>
        
    )
}
const LetWrapper = styled.div`
    display: block;
    font-size: 22px;
    margin-top: 5px;
`
const NumWrapper = styled.div`
    display: block;
    font-size: 22px;
    margin-right: 15px;
`

const Wrapper = styled.div`
    display: flex;
`

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