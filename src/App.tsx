import { useEffect } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { store } from './store'

const App = observer(() => {
  const restart = () => {
    store.restartBoard()
  }
  
  useEffect(() => {
    restart()
  }, [])
  return (
    <Wrapper>
       <BoardComponent />
    </Wrapper>
  )
})

export default App

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`