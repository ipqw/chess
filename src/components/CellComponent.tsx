import styled from 'styled-components'

const CellComponent = (props: any) => {
    return(
        <Cell style={{backgroundColor: props.color}}>

        </Cell>
    )
}

const Cell = styled.div`
    width: 100px;
    height: 100px;
`

export default CellComponent