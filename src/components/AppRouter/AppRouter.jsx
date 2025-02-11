import './AppRouter.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

import AddItem from '../AddItem'
import AddPlace from '../AddPlace'
import Admin from '../Admin'
import Coach from '../Coach'
import Content from '../Content'
import EditItem from '../EditItem'
import ErrorPage from '../ErrorPage'
import Header from '../Header'
import Items from '../Items/Items'
import IOData from '../IOData'
import Mainpage from '../Mainpage'
import Menu from '../Menu'
import Root from '../Root'
import SpecItem from '../SpecItem'
import User from '../User'
import Users from '../Users'

function AppRouter(props) {

  const router = createBrowserRouter([
    
    {
    
      path: "/", element: <Root handleReset={props.handleReset}
                                handleUserReset={props.handleUserReset}
                                onHandleIn={props.onHandleIn}
                                onHandleOut={props.onHandleOut}
                                localdata={props.localdata}
                                userdata={props.userdata}
                                itemdata={props.itemdata}
                                handlePassword={props.handlePassword}
                                testit={props.testit}
                                localtesti={props.localtesti}
                                usertesti={props.usertesti}
                                inouttesti={props.inouttesti}
                                itemtesti={props.itemtesti}
                                placetesti={props.placetesti}/>,

      errorElement: <ErrorPage />,

      children: [
        { path: "content", element: <Content handleReset={props.handleReset}
                                             handleUserReset={props.handleUserReset}
                                             localdata={props.localdata} 
                                             userdata={props.userdata}
                                             itemdata={props.itemdata}
                                             inOutData={props.inOutData}
                                             onHandleIn={props.onHandleIn}
                                             onHandleOut={props.onHandleOut}
                                             handlePassword={props.handlePassword}
                                             testit={props.testit}
                                             localtesti={props.localtesti}
                                             usertesti={props.usertesti}
                                             inouttesti={props.inouttesti}
                                             itemtesti={props.itemtesti}
                                             placetesti={props.placetesti} /> },

        { path: "items", element: <Items itemdata={props.itemdata}
                                         inOutData={props.inOutData}
                                         localdata={props.localdata}
                                         placedata={props.placedata}
                                         onHandleIn={props.onHandleIn}
                                         onHandleOut={props.onHandleOut}
                                         onHandleDelete={props.onHandleDelete} /> },    
        
        { path: "item", element: <IOData /> },
                                    
        { path: "", element: <Mainpage itemdata={props.itemdata}
                                       localdata={props.localdata}
                                       inOutData={props.inOutData}
                                       onHandleIn={props.onHandleIn}
                                       onHandleOut={props.onHandleOut}
                                       onHandleDelete={props.onHandleDelete}/> },

        { path: "add", element: <AddItem onItemSubmit={props.onItemSubmit}
                                         onInOutSubmit={props.onInOutSubmit}
                                         itemdata={props.itemdata}
                                         inOutData={props.inOutData}
                                         placedata={props.placedata} 
                                         userdata={props.userdata}/> },

        { path: "edit/:id", element: <EditItem itemdata={props.itemdata} 
                                               inOutData={props.inOutData}
                                               placedata={props.placesdata}
                                               userdata={props.userdata}
                                               onItemSubmit={props.onItemSubmit}
                                               onInOutSubmit={props.onInOutSubmit}
                                               onItemDelete={props.onItemDelete} />,
                            loader: ({params}) => {
                            const item = props.itemdata.filter(item => item.id === params.id).shift()
                            if (item) {
                            return { item }
                            } else {
                            throw new Response("Not Found", { status: 404 })
                            } } } ,
      
        { path: "spec/:id", element: <SpecItem localdata={props.localdata}
                                               userdata={props.userdata}
                                               itemdata={props.itemdata}
                                               inOutData={props.inOutData}
                                               placedata={props.placedata}
                                               onHandleIn={props.onHandleIn}
                                               onHandleOut={props.onHandleOut}
                                               onHandleDelete={props.onHandleDelete} />,
                            loader: ({params}) => {
                            const item = props.itemdata.filter(item => item.id === params.id).shift()
                            if (item) {
                            return { item }
                            } else {
                            throw new Response("Not Found", { status: 404 })
                            } } } ,

        { path: "addplace", element: <AddPlace onPlaceSubmit={props.onPlaceSubmit}
                                               onPlaceDelete={props.onPlaceDelete}
                                               placedata={props.placedata} /> },

        { path: "coach", element: <Coach /> },

        { path: "admin", element: <Admin /> },

        { path: "user", element: <User /> },

        { path: "users", element: <Users localdata={props.localdata}
                                         userdata={props.userdata}
                                         inOutData={props.inOutData}
                                         placedata={props.placedata} 
                                         handlePassword={props.handlePassword} /> },
      ]

    },
    
    { path: "header", element: <Header />, },

    { path: "menu", element: <Menu localdata={props.localdata} 
                                   userdata={props.userdata}/>  },



  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
