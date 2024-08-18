import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
import Homepage from "../pages/Homepage";
import Player from "../pages/Player";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Under18 from "../pages/Under18";
import Under19 from "../pages/Under19";
import Under20 from "../pages/Under20";
import Under21 from "../pages/Under21";
import Under22 from "../pages/Under22";
import Under23 from "../pages/Under23"


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
        {
          path: "/best-under-19",
          element: <Under19 />,
        },
        {
          path: "/best-under-20",
          element: <Under20 />,
        },
        {
          path: "/best-under-21",
          element: <Under21 />,
        },
        {
          path: "/best-under-22",
          element: <Under22 />,
        },
        {
          path: "/best-under-23",
          element: <Under23 />,
        },


          ]
        }
      ]
  );
  
  export default router;