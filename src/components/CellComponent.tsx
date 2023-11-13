import styled from 'styled-components'
import { Cell } from '../models/Cell'
import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void,
    indexNum: number
    indexLet: number
}

const CellComponent: FC<CellProps> = observer(({cell, selected, click, indexNum, indexLet}) => {
    const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const numbers: number[] = [8, 7, 6, 5, 4, 3, 2, 1]
    const [isRotated, setIsRotated] = useState(false)

    useEffect(() => {
        setIsRotated(store.isRotated)
        console.log(isRotated)
    }, [store.isRotated])
    return(
        <Wrapper>
            <NumWrapper style={{display: indexNum === 0 ? 'flex' : 'none', transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>{numbers[indexLet]}</NumWrapper>
            <div>
                <CellWrapper onClick={() => {click(cell)}} style={{backgroundColor: selected ? 'red' : cell.color, transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>
                    <AvalibleWrapper style={{display: cell.available ? 'block' : 'none'}} />
                    {cell?.figure?.logo && <FigureLogo src={cell.figure.logo} />}
                </CellWrapper>
                <LetWrapper style={{display: indexLet === 7 ? 'flex' : 'none', transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>{letters[indexNum]}</LetWrapper>
            </div>
        </Wrapper>
        
    )
})
const LetWrapper = styled.div`
    justify-content: center;
    font-size: calc(10px + 0.7vw);
    margin-top: 5px;
    color: white;
`
const NumWrapper = styled.div`
    align-items: center;
    font-size: calc(10px + 0.7vw);
    margin-right: 15px;
    color: white;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const AvalibleWrapper = styled.div`
    width: 20px;
	height: 20px;
	background: #575757;
	border-radius: 50px;
    z-index: 1;
`

const CellWrapper = styled.div`
    width: 5vw;
    height: 5vw;
    display: flex;
    justify-content: center;    
    align-items: center;
`

const FigureLogo = styled.img`
    z-index: 0;
    width: 5vw;
    height: 5vw;
`

export default CellComponent