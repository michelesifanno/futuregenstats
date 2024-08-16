import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
import Homepage from "../pages/Homepage";
import Player from "../pages/Player";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Homepage />
        },
        {
          path: "/player/:slug",
          element: <Player />,
        },
          ]
        }
      ]
  );
  
  export default router;