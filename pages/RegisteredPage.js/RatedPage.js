import { useCallback, useEffect } from "react";
import UserFeature from "../../Component/UserFeatures";
import { Features } from "../../store/Features";
import { useDispatch, useSelector } from "react-redux";
import RootLoader from "../../helpers/RootLoader";
import ErrorPage from "../ErrorPage";

const RatedPage = ({ type = "" }) => {
  const types = type.includes("movies")
    ? "Movies"
    : type.includes("series")
    ? "Series"
    : "Episode";
  const dispatch = useDispatch();

  const { sessionId, isLoggedIn, isLoading, error } = useSelector(
    (s) => s.auth
  );
  const fetchRated = useCallback(() => {
    if (!sessionId || !isLoggedIn) return;
    dispatch(
      Features(
        {
          type: "rated",
          feature:
            types === "Movies"
              ? "movies"
              : types === "Series"
              ? "tv"
              : "episode",
          page: 1,
        },
        sessionId
      )
    );
  }, [dispatch, sessionId, types, isLoggedIn]);
  useEffect(() => {
    fetchRated();
  }, [fetchRated]);

  const html = (
    <>
      <div className=" text-white flex lg:justify-between justify-center px-10 bg-slate-800 my-2 min-h-[3rem] items-center rounded-xl">
        <h1 className="lg:text-2xl text-[1rem] text-center lg:text-start  capitalize font-medium">
          {types} You liked
        </h1>
      </div>
      <UserFeature />
    </>
  );
  return (
    <>
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage message={error.message} reload={fetchRated} />
      )}
      {!isLoading && !error.error && html}
    </>
  );
};
export default RatedPage;
