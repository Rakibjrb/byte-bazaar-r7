import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Products from "../Pages/Products/Products";
import Login from "../Pages/LoginAndSignUp/Login";
import Signup from "../Pages/LoginAndSignUp/Signup";
import Faq from "../Pages/Faq/Faq";
import ProductsDetails from "../Pages/ProductDetails/ProductsDetails";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Myprofile from "../Pages/Dashboard/User/Myprofile/Myprofile";
import AddProduct from "../Pages/Dashboard/User/AddProduct/AddProduct";
import MyProducts from "../Pages/Dashboard/User/MyProducts/MyProducts";
import ReviewQueue from "../Pages/Dashboard/Moderator/ReviewQueue/ReviewQueue";
import ReportedProducts from "../Pages/Dashboard/Moderator/ReportedProducts/ReportedProducts";
import Statistics from "../Pages/Dashboard/Admin/Statistics/Statistics";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageCupons from "../Pages/Dashboard/Admin/ManageCupons/ManageCupons";
import UpdateProduct from "../Pages/Dashboard/User/MyProducts/UpdateProduct";
import ModeratorRoutes from "./ModeratorRoutes";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductsDetails />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Myprofile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      //moderator routes
      {
        path: "review-queue",
        element: (
          <ModeratorRoutes>
            <PrivateRoute>
              <ReviewQueue />
            </PrivateRoute>
          </ModeratorRoutes>
        ),
      },
      {
        path: "reported-products",
        element: (
          <ModeratorRoutes>
            <PrivateRoute>
              <ReportedProducts />
            </PrivateRoute>
          </ModeratorRoutes>
        ),
      },
      //admin routes
      {
        path: "statistics",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <Statistics />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-cupons",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <ManageCupons />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
