import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootJsx from "./pages/root";
import Home from "./pages/home";
import MovieDetail from "./pages/Movieroot";
import Popular from "./pages/PopularMovies";
import TopRated from "./pages/TopratedPage";
import Upcoming from "./pages/UpcomingPage";
import SingleMovie from "./Component/SingleMovie";
import SingleCast from "./Component/SingleCast";
import FilmPage from "./pages/FilmPage";
import SeriesPage from "./pages/SeriesPage";
import SingleSerie from "./Component/SingleSerie";
import SeriesDetail from "./pages/SeriesRoot";
import FilmDetail from "./pages/FilmDetail";
import ErrorNavPage from "./pages/ErrorNavPage";
import SerieInfo from "./Component/serie/SerieInfo";
import SingleSerieSeason from "./Component/serie/SingleSerieSeason";
import SingleSerieEpisode from "./Component/serie/SingleSerieEpisode";
import SearchPage from "./pages/SearchPage";
import PopularSeries from "./pages/PopularSeries";
import OnAir from "./pages/OnAir";
import TopRatedSeries from "./pages/TopRatedSeries";
import { tokenLoader } from "./auth";
import { logoutAction } from "./logout";
import UserWrapper from "./pages/UserWrapper";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      id: "root",
      loader: tokenLoader,
      element: <RootJsx />,
      errorElement: <ErrorNavPage />,

      children: [
        { index: true, element: <Home /> },

        { path: "/search", element: <SearchPage /> },
        { path: "/popular--movies", element: <Popular /> },
        { path: "/popular--series", element: <PopularSeries /> },
        { path: "/upcoming", element: <Upcoming /> },
        { path: "/onAir", element: <OnAir /> },
        { path: "/toprated--movies", element: <TopRated /> },
        { path: "/toprated--series", element: <TopRatedSeries /> },

        { path: "/info/:username", element: <UserWrapper /> },

        {
          path: "/films",
          element: <FilmDetail />,
          children: [
            { index: true, element: <FilmPage /> },
            {
              path: ":movieId",
              element: <MovieDetail />,
              children: [
                { index: true, element: <SingleMovie /> },
                {
                  path: "/films/:movieId/:castId/cast",
                  element: <SingleCast />,
                },
              ],
            },
          ],
        },
        {
          path: "/series",
          element: <SeriesDetail />,
          children: [
            { path: "/series", element: <SeriesPage /> }, //single movies
            {
              path: "/series/:tvId",
              element: <SingleSerie />,
              children: [
                { index: true, element: <SerieInfo /> }, //serie Info
                {
                  path: "/series/:tvId/:seasonNumber",
                  element: <SingleSerieSeason />,
                },
                {
                  path: "/series/:tvId/:seasonNumber/:episodeNumber",
                  element: <SingleSerieEpisode />,
                },
              ],
            },
          ],
        },
      ],
    },
    { path: "/logout", action: logoutAction },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
