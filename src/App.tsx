import './App.css'
import { observer } from 'mobx-react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './pages/main'
import GamePage from './pages/game'
import WrapperApp from './components/Wrapper'
import ErrorPage from './pages/errorPage'
import RegistrationPage from './pages/registration';
import LoginPage from './pages/login';
import LocalGamePage from './pages/localGame';
import FindGame from './pages/findGame';

const App = observer(() => {
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
      path: "/game/:id",
      element: <GamePage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/localgame",
      element: <LocalGamePage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/find",
      element: <FindGame/>,
      errorElement: <ErrorPage />
    },
  ]);
  
  
  return (
    <WrapperApp>
       <RouterProvider router={router}/>
    </WrapperApp>
  )
})

export default App