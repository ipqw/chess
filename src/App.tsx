import './App.css'
import BoardComponent from './components/BoardComponent'
import styled from 'styled-components'

const App = () => {
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