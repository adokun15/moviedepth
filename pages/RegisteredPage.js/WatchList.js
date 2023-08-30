import { useDispatch, useSelector } from "react-redux";
import UserFeature from "../../Component/UserFeatures";
import { Features } from "../../store/Features";
import { useCallback, useEffect } from "react";
import RootLoader from "../../helpers/RootLoader";
import ErrorPage from "../ErrorPage";

const WatchListPage = ({ type = "" }) => {
  const types = type.includes("movies") ? "movies" : "series";
  const dispatch = useDispatch();

  const { sessionId, isLoggedIn, isLoading, error } = useSelector(
    (s) => s.auth
  );

  const fetchWatchList = useCallback(() => {
    if (!sessionId || !isLoggedIn) return;
    dispatch(
      Features(
        {
          type: "watchlist",
          feature: types === "movies" ? "movies" : "tv",
          page: 1,
        },
        sessionId
      )
    );
  }, [dispatch, sessionId, types, isLoggedIn]);
  useEffect(() => {
    fetchWatchList();
  }, [fetchWatchList]);

  const html = (
    <>
      <div className=" text-white flex lg:justify-between justify-center  px-10 bg-slate-800 my-2 min-h-[3rem] items-center rounded-xl">
        <h1 className="lg:text-2xl text-[1rem] text-center lg:text-start capitalize font-medium">
          Your Watchlist ({types})
        </h1>
      </div>
      <UserFeature />
    </>
  );
  return (
    <>
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage message={error.message} reload={fetchWatchList} />
      )}
      {!isLoading && !error.error && html}
    </>
  );
};
export default WatchListPage;
