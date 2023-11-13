import { useEffect } from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { store } from './store'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './pages/main'
import GamePage from './pages/game'
import WrapperApp from './components/Wrapper'
import ErrorPage from './pages/errorPage'
import RegistrationPage from './pages/registration';
import LoginPage from './pages/login';

const App = observer(() => {
  const restart = () => {
    store.restartBoard()
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <LoginPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/registration",
      element: <RegistrationPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/game/:gameId",
      element: <GamePage/>,
      errorElement: <ErrorPage />
    },
  ]);
  
  useEffect(() => {
    restart()
  }, [])
  return (
    <WrapperApp>
       <RouterProvider router={router}/>
    </WrapperApp>
  )
})

export default App