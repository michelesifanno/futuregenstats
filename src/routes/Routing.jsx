import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
  import Homepage from "../pages/Homepage";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Homepage />
        },
          ]
        }
      ]
  );
  
  export default router;