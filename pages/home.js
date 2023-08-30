import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../helpers/Wrapper";
import MovieContent from "../Component/MovieContent";
import ErrorPage from "./ErrorPage";
import RootLoader from "../helpers/RootLoader";
import { useOutletContext } from "react-router-dom";
import { MovieAction } from "../store/Slices/movieSlice";

//Container for movies/series
const Home = () => {
  const toggle = useSelector((state) => state.ui.toggle);
  const { movies, isLoading, error } = useSelector((state) => state.movies);

  const FetchedAllMovies = useOutletContext();

  const dispatch = useDispatch();
  const reloadMovies = () => {
    dispatch(MovieAction.loaderHandler(true));
    FetchedAllMovies();
  };
  const all = (
    <Wrapper
      bg={" bg-slate-700 "}
      otherCss={`${
        toggle ? "col-span-7" : "col-span-full"
      } lg:col-span-9  overflow-scroll px-1  `}
    >
      <MovieContent moviesContent={movies} />
    </Wrapper>
  );

  return (
    <>
      {!isLoading && !error.error && all}
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage message={error.message} reload={reloadMovies} />
      )}
    </>
  );
};
export default Home;
