import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
  import About from "../pages/About";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <About />
        },
          ]
        }
      ]
  );
  
  export default router;