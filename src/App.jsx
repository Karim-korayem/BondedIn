import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import UsersPosts from "./Components/UsersPosts/UsersPosts";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import PostDetails from './Components/PostDetails/PostDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
  const queryClient = new QueryClient()
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "usersposts",
          element: (
            <ProtectedRoutes>
              {" "}
              <UsersPosts />
            </ProtectedRoutes>
          ),
        },

        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "postDetails/:id",
          element: (
            <ProtectedRoutes>
              <PostDetails/>
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
    </>
  );
}

export default App;
