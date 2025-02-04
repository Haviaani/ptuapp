import './AppRouter.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Content from '../Content'
import ErrorPage from '../ErrorPage'
import Root from '../Root'
import Header from '../Header'
import Menu from '../Menu'
import User from '../User'

function AppRouter(props) {

  const router = createBrowserRouter([
    
    {
    
      path: "/", element: <Root handleReset={props.handleReset}
                                handleUserReset={props.handleUserReset}
                                localdata={props.localdata}
                                userdata={props.userdata}
                                handlePassword={props.handlePassword}
                                testit={props.testit}/>,

      errorElement: <ErrorPage />,

      children: [
        { path: "", element: <Content handleReset={props.handleReset}
                                      handleUserReset={props.handleUserReset}
                                      localdata={props.localdata} 
                                      userdata={props.userdata}
                                      handlePassword={props.handlePassword}
                                      testit={props.testit} /> },
      ]

    },
    
    { path: "header", element: <Header />, },

    { path: "menu", element: <Menu /> },

    { path: "user", element: <User localdata={props.localdata}
                                   userdata={props.userdata}
                                   handlePassword={props.handlePassword}
                                   handleUserReset={props.handleUserReset} /> },

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
