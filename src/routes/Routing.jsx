import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
import Homepage from "../pages/Homepage";
import Player from "../pages/Player";
import PrivacyPolicy from "../pages/PrivacyPolicy";
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
          path: "/privacy-policy",
          element: <PrivacyPolicy />
        },

        {
          path: "/player/:slug",
          element: <Player />,
        },
        {
          path: "/best-under-18",
          element: <Under18 />,
        },

          ]
        }
      ]
  );
  
  export default router;