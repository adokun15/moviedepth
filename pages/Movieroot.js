import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FetchSingleMovie } from "../store/apiThunks/MovieApi";
import { useDispatch, useSelector } from "react-redux";
import Casts from "../Component/MovieCasts";
import Wrapper from "../helpers/Wrapper";
import RootLoader from "../helpers/RootLoader";
import ErrorPage from "./ErrorPage";
import { MovieAction } from "../store/Slices/movieSlice";
const MovieDetail = () => {
  const { movieId } = useParams();
  const toggle = useSelector((state) => state.ui.toggle);

  const allParam = useParams();

  const { movie, isLoading, error } = useSelector((state) => state.movie);
  const { sessionId } = useSelector((s) => s.auth);
  const cast = useSelector((state) => state.cast.cast);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchSingleMovie(movieId, sessionId));
  }, [dispatch, movieId, sessionId]);

  const reload = () => {
    dispatch(MovieAction.loaderHandler(true));
    dispatch(FetchSingleMovie(movieId, sessionId));
  };
  const movieHtml = (
    <Wrapper
      bg="bg-slate-900"
      otherCss={` col-span-9 grid ${
        toggle ? "col-span-7 " : "col-span-full"
      } overflow-hidden  block px-1 lg:max-h-[88.5vh] max-h-[100vh] grid-rows-[repeat(12,1fr)]  `}
    >
      <nav className=" text-white text-[1.1rem] ml-6 my-2 italic  pb-2  col-end-5 col-start-1  row-end-2 h-4 ">
        <Link to={`/films/`}>Films</Link>
        <Link to={`/films/${allParam.movieId}`}>{` > ${
          movie.title || ""
        }`}</Link>
        <Link to={`${allParam.castId}`}>
          {allParam.castId ? ` > ${cast.originalName || ""}` : ""}
        </Link>{" "}
      </nav>

      <Casts
        id={movieId}
        className="col-start-5 lg:block hidden col-end-7 row-start-1 row-span-full overflow-scroll bg-slate-900 "
      />
      <Outlet context={() => dispatch(FetchSingleMovie(movieId, sessionId))} />
    </Wrapper>
  );
  return (
    <>
      {!isLoading && !error.error && movieHtml}
      {!isLoading && error.error && (
        <ErrorPage message="Could Not Load Movie " reload={reload} />
      )}
      {isLoading && !error.error && <RootLoader />}
    </>
  );
};
export default MovieDetail;
