import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
import Home from "../pages/Home";
import Player from "../pages/Player";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import League from "../pages/League";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />
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
          path: "/league/:slug",
          element: <League />,
        },

          ]
        }
      ]
  );
  
  export default router;