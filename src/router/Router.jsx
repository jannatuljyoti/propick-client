import {
  createBrowserRouter,

} from "react-router";
import mainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    Component:mainLayout,
    children:[
        {
            index:true,
            Component:Home
        }
    ]
  },
]);

export default Router;