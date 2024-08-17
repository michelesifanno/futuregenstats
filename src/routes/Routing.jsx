import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
import Homepage from "../pages/Homepage";
import Player from "../pages/Player";
import Under18 from "../pages/Under18";


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
        {
          path: "/under-18",
          element: <Under18 />,
        },

          ]
        }
      ]
  );
  
  export default router;