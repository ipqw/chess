import { useEffect, useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'
import styled from 'styled-components'
import { Board } from './models/Board'

const App = () => {
  const [board, setBoard] = useState(new Board())
  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    setBoard(newBoard)
  }
  useEffect(() => {
    restart()
  }, [])
  return (
    <Wrapper>
       <BoardComponent />
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`