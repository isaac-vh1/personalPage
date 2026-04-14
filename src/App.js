import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./home";
import Timer from "./timer";
import Layout from "./layout"
import Titan from "./titan";
import DemoFrame from "./DemoFrame";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'timer', element: <Timer /> },
      { path: 'titan', element: <Titan /> },
      { path: 'demo', element: <DemoFrame /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
],
{ basename: '/' } // domain root
);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
