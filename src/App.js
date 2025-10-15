import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Timer from "./timer";
import Layout from "./layout"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'timer', element: <Timer /> },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
