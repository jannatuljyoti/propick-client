import {
  createBrowserRouter,

} from "react-router";
import mainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";
import MyQueries from "../pages/MyQueries";
import Queries from "../pages/Queries";
import PrivateRoute from "../context/PrivateRoute";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import MyRecommendations from "../pages/MyRecommendations";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageError from "../pages/PageError";
import AddQuery from "../pages/AddQuery";

const Router = createBrowserRouter([
  {
    path: "/",
    Component:mainLayout,
    children:[
        {
            path:"",
            Component:Home
        },
        {
            path:"queries",
            Component:Queries
        },
        {
            path:"recommendations",
            element:<PrivateRoute><RecommendationsForMe></RecommendationsForMe></PrivateRoute>
        },
        {
            path:"my-queries",
          element:<PrivateRoute><MyQueries></MyQueries></PrivateRoute>
        },
        {
            path:"add-query",
          element:<PrivateRoute><AddQuery></AddQuery></PrivateRoute>
        },
        {
            path:"my-recommendations",
           element:<PrivateRoute><MyRecommendations></MyRecommendations></PrivateRoute>
        },
    ],
  },
  {
    path:"/auth",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:"/auth/login",
        element:<Login></Login>
      },
      {
        path:"/auth/register",
        element:<Register></Register>
      }
    ]
  },
  {
    path:"/*",
    element:<PageError></PageError>
  }
]);

export default Router;