import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../helpers/Wrapper";
import { useCallback, useEffect } from "react";
import { FetchSeriesData } from "../store/apiThunks/SeriesApi";
import SeriesContent from "../Component/SeriesContent";
import { Outlet } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RootLoader from "../helpers/RootLoader";
import { SeriesAction } from "../store/Slices/tvSeriesSlice";

const SeriesPage = () => {
  const dispatch = useDispatch();
  const fetchedData = useCallback(() => {
    dispatch(
      FetchSeriesData([
        {
          type: "High Rated Series",
          api: "https://api.themoviedb.org/3/discover/tv",
          page: 1,
          body: "vote_count.gte=9000,sort_by=popularity.desc",
        },
        {
          type: "English Themed Movies",
          api: "https://api.themoviedb.org/3/discover/tv",
          body: "with_genres=animation,with_runtime.gte=60",
          page: 4,
        },
        {
          type: "Romance & Action Filled",
          api: "https://api.themoviedb.org/3/discover/tv",
          page: 3,
          body: "year=2023,language=en,with_genres=romance,with_runtime.gte=40",
        },
        {
          type: "Thriller and Hidden Secrets ",
          api: "https://api.themoviedb.org/3/discover/tv",
          page: 2,
          body: "sort_by=popularity.desc&with_genres=crime",
        },
        {
          type: "Heart Racing Drama with Adventure",
          api: "https://api.themoviedb.org/3/discover/tv",
          page: 4,
          body: "with_status=returning%20series,with_genres=drama,with_runtime.gte=30",
        },
      ])
    );
  }, [dispatch]);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);
  const toggle = useSelector((state) => state.ui.toggle);
  const { series, error, isLoading } = useSelector((state) => state.series);
  const seriesHtml = (
    <Wrapper
      bg={" bg-slate-700 "}
      otherCss={`max-h-screen ${
        toggle ? "col-span-7" : "col-span-full"
      } lg:col-span-9  overflow-scroll px-1  `}
    >
      <SeriesContent content={series} />
      <Outlet />
    </Wrapper>
  );

  const reloadSerie = () => {
    dispatch(SeriesAction.loadingHandler(true));
    fetchedData();
  };
  return (
    <>
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage message={error.message} reload={reloadSerie} />
      )}
      {!isLoading && !error.error && seriesHtml}
    </>
  );
};
export default SeriesPage;
