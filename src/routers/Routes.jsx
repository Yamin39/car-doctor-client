import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CartDetails from "../pages/CartDetails/CartDetails";
import CheckOut from "../pages/CheckOut/CheckOut";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/checkout/:id",
        loader: ({ params }) => fetch(`https://car-doctor-server-pi-jet.vercel.app/services/${params.id}`),
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>
          </PrivateRoute>
        ),
      },
      {
        path: "/CartDetails",
        element: (
          <PrivateRoute>
            <CartDetails></CartDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
