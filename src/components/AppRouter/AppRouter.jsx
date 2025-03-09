import './AppRouter.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AddItem from '../AddItem'
import AddPlace from '../AddPlace'
import AddUser from '../AddUser'
import Admin from '../Admin'
import Coach from '../Coach'
import Comments from '../Comments'
import CopyItem from '../CopyItem'
import EditItem from '../EditItem'
import EditPlace from '../EditPlace'
import EditUser from '../EditUser'
import ErrorPage from '../ErrorPage'
import Items from '../Items'
import IOData from '../IOData'
import Mainpage from '../Mainpage'
import Root from '../Root'
import SpecItem from '../SpecItem'
import User from '../User'
import Users from '../Users'

import { itemsLoader } from '../../utils/itemsLoader.js'

function AppRouter(props) {  

  const router = createBrowserRouter([
    
    {
    
      path: "/", element: <Root handleReset={props.handleReset}
                                onHandleIn={props.onHandleIn}
                                onHandleOut={props.onHandleOut}
                                localdata={props.localdata}
                                userdata={props.userdata}
                                placedata={props.placedata}
                                itemdata={props.itemdata}
                                commentdata={props.commentdata}
                                handlePassword={props.handlePassword}
                                localtesti={props.localtesti}
                                usertesti={props.usertesti}
                                inouttesti={props.inouttesti}
                                itemtesti={props.itemtesti}
                                placetesti={props.placetesti}/>,

      errorElement: <ErrorPage />,

      children: [

        { path: "items", element: <Items itemdata={props.itemdata}
                                         inOutData={props.inOutData}
                                         localdata={props.localdata}
                                         placedata={props.placedata}
                                         onHandleIn={props.onHandleIn}
                                         onHandleOut={props.onHandleOut}
                                         onHandleDelete={props.onHandleDelete} />,
                                         loader: itemsLoader },                                  
        
        { path: "iodata", element: <IOData /> },
                                    
        { path: "/", element: <Mainpage itemdata={props.itemdata}
                                        localdata={props.localdata}
                                        inOutData={props.inOutData}
                                        userdata={props.userdata}
                                        commentdata={props.commentdata}
                                        onHandleIn={props.onHandleIn}
                                        onHandleOut={props.onHandleOut} />,
                                        loader: () => { return props.itemdata} },

        { path: "additem", element: <AddItem onItemSubmit={props.onItemSubmit}
                                             onInOutSubmit={props.onInOutSubmit}
                                             onCommentSubmit={props.onCommentSubmit}
                                             itemdata={props.itemdata}
                                             inOutData={props.inOutData}
                                             placedata={props.placedata} 
                                             userdata={props.userdata}
                                             commentdata={props.commentdata} /> },

        { path: "edititem/:id", element: <EditItem itemdata={props.itemdata} 
                                                   inOutData={props.inOutData}
                                                   placedata={props.placedata}
                                                   userdata={props.userdata}
                                                   commentdata={props.commentdata}
                                                   onItemSubmit={props.onItemSubmit}
                                                   onInOutSubmit={props.onInOutSubmit}
                                                   onCommentSubmit={props.onCommentSubmit} />,
                                                   loader: ({params}) => {
                                                   const item = props.itemdata.filter(item => item.id === params.id).shift()
                                                   if (item) { return { item }
                                                   } else { throw new Response("Not Found", { status: 404 })
                                                   } } } ,

        { path: "copyitem/:id", element: <CopyItem itemdata={props.itemdata} 
                                                   inOutData={props.inOutData}
                                                   placedata={props.placedata}
                                                   userdata={props.userdata}
                                                   commentdata={props.commentdata}
                                                   onItemSubmit={props.onItemSubmit}
                                                   onInOutSubmit={props.onInOutSubmit}
                                                   onCommentSubmit={props.onCommentSubmit} />,
                                                   loader: ({params}) => {
                                                   const item = props.itemdata.filter(item => item.id === params.id).shift()
                                                   if (item) { return { item }
                                                   } else { throw new Response("Not Found", { status: 404 })
                                                   } } } ,
      
        { path: "specitem/:id", element: <SpecItem localdata={props.localdata}
                                                   userdata={props.userdata}
                                                   itemdata={props.itemdata}
                                                   inOutData={props.inOutData}
                                                   placedata={props.placedata}
                                                   commentdata={props.commentdata}
                                                   onHandleIn={props.onHandleIn}
                                                   onHandleOut={props.onHandleOut}
                                                   onHandleDelete={props.onHandleDelete}
                                                   onCommentSubmit={props.onCommentSubmit} />,
                                                   loader: ({params}) => {
                                                   const item = props.itemdata.filter(item => item.id === params.id).shift()
                                                   if (item) {
                                                   return { item }
                                                   } else {
                                                   throw new Response("Not Found", { status: 404 })
                                                   } } } ,

        { path: "comments/:id", element: <Comments localdata={props.localdata}
                                                   userdata={props.userdata}
                                                   itemdata={props.itemdata}
                                                   inOutData={props.inOutData}
                                                   placedata={props.placedata}
                                                   commentdata={props.commentdata}
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

        { path: "coach", element: <Coach />, loader: () => { return props.localdata, props.userdata} },

        { path: "admin", element: <Admin />, loader: () => { return props.localdata, props.userdata} },

        { path: "user", element: <User />, loader: () => { return props.localdata, props.userdata} },

        { path: "users", element: <Users localdata={props.localdata}
                                         userdata={props.userdata}
                                         itemdata={props.itemdata}
                                         inOutData={props.inOutData}
                                         placedata={props.placedata} 
                                         onHandlePassword={props.onHandlePassword}
                                         onUserSubmit={props.onUserSubmit}
                                         localtesti={props.localtesti}
                                         usertesti={props.usertesti}
                                         inouttesti={props.inouttesti}
                                         itemtesti={props.itemtesti}
                                         placetesti={props.placetesti}
                                         commenttesti={props.commenttesti} />,
                                         loader: () => { return props.localdata, props.userdata} },                                         

        { path: "adduser", element: <AddUser userdata={props.userdata}
                                             onUserSubmit={props.onUserSubmit}
                                             onUserDelete={props.onUserDelete} /> },

        { path: "edituser/:id", element: <EditUser userdata={props.userdata}
                                                   onUserSubmit={props.onUserSubmit}
                                                   onUserDelete={props.onUserDelete} />,
                                                   loader: ({params}) => {
                                                   const user = props.userdata.filter(user => user.id === params.id).shift()
                                                   if (user) {
                                                   return { user }
                                                   } else {
                                                   throw new Response("Not Found", { status: 404 })
                                                   } } } ,

        { path: "editplace/:id", element: <EditPlace placedata={props.placedata}
                                                     onPlaceSubmit={props.onPlaceSubmit}
                                                     onPlaceDelete={props.onPlaceDelete} />,
                                                     loader: ({params}) => {
                                                     const place = props.placedata.filter(place => place.id === params.id).shift()
                                                     if (place) {
                                                     return { place }
                                                     } else {
                                                     throw new Response("Not Found", { status: 404 })
                                                     } } } ,  
      ]


    }
    
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
