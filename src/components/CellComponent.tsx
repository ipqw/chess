import styled from 'styled-components'
import { Cell } from '../models/Cell'
import { FC, useEffect, useReducer, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
import { serverStore } from '../store/server'
interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void,
    indexNum: number
    indexLet: number
}

const CellComponent: FC<CellProps> = observer(({cell, selected, click, indexNum, indexLet}) => {
    const windowWidth = useRef(window.innerWidth);
    const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const numbers: number[] = [8, 7, 6, 5, 4, 3, 2, 1]
    const [isRotated, setIsRotated] = useState(false)

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate()
    }, [serverStore.game?.moves])

    useEffect(() => {
        setIsRotated(store.isRotated)
    }, [store.isRotated])
    return(
        <Wrapper>
            <NumWrapper style={{display: indexNum === 0 && windowWidth.current >= 170 ? 'flex' : 'none', transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>{numbers[indexLet]}</NumWrapper>
            <div>
                <CellWrapper onClick={() => {click(cell)}} style={{backgroundColor: selected ? 'red' : cell.color, transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>
                    <AvalibleWrapper style={{display: cell.available ? 'block' : 'none'}} />
                    {cell?.figure?.logo && <FigureLogo src={cell.figure.logo} />}
                </CellWrapper>
                <LetWrapper style={{display: indexLet === 7 && windowWidth.current >= 170 ? 'flex' : 'none', transform: `rotate(${isRotated ? '180deg' : '0deg'})`}}>{letters[indexNum]}</LetWrapper>
            </div>
        </Wrapper>
    )
})
const LetWrapper = styled.div`
    display: none;
    justify-content: center;
    font-size: calc(10px + 0.7vw);
    margin-top: 5px;
    color: white;
`
const NumWrapper = styled.div`
    display: none;
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
    width: 10px;
	height: 10px;
	background: #575757;
	border-radius: 50px;
    z-index: 1;
    @media (min-width: 305px) {
        width: 20px;
	    height: 20px;
    }
`

const CellWrapper = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    width: calc(10px + 3vw); 
    height: calc(10px + 3vw);   
    @media (min-width: 195px) {
        width: calc(15px + 3vw);
        height: calc(15px + 3vw);
    }
    @media (min-width: 305px) {
        width: calc(25px + 3vw);
        height: calc(25px + 3vw);
    }
    @media (min-width: 410px) {
        width: calc(35px + 3vw);
        height: calc(35px + 3vw);
    }
`

const FigureLogo = styled.img`
    z-index: 0;
    width: calc(10px + 3vw); 
    height: calc(10px + 3vw);
    @media (min-width: 195px) {
        width: calc(15px + 3vw);
        height: calc(15px + 3vw);
    }
    @media (min-width: 305px) {
        width: calc(25px + 3vw);
        height: calc(25px + 3vw);
    }
    @media (min-width: 410px) {
        width: calc(35px + 3vw);
        height: calc(35px + 3vw);
    }
`

export default CellComponent