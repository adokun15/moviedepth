import { useCallback, useEffect } from "react";
import { FetchFilmData } from "../store/apiThunks/FilmsApi";
import Wrapper from "../helpers/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import MovieContent from "../Component/MovieContent";
import ErrorPage from "./ErrorPage";
import RootLoader from "../helpers/RootLoader";
import { FilmAction } from "../store/Slices/filmsSlice";

const FilmPage = () => {
  const dispatch = useDispatch();

  const fetchedData = useCallback(() => {
    dispatch(
      FetchFilmData([
        {
          type: "Adventure & Action Movies",
          api: "https://api.themoviedb.org/3/discover/movie",
          body: "language=en,include_video=false,year=2019",
          page: 1,
        },
        {
          type: "Latest Movies",
          api: "https://api.themoviedb.org/3/discover/movie",
          page: 2,
          body: "year=2023,language=en",
        },
        {
          type: "High Rated Movie",
          api: "https://api.themoviedb.org/3/discover/movie",
          page: 4,
          body: "vote_count.gte=10000",
        },
        {
          type: "Mysteries with Adventures",
          api: "https://api.themoviedb.org/3/discover/movie",
          page: 2,
          body: "sort_by=popularity.desc&vote_average.gte=6&with_genres=horror&year=2012",
        },
        {
          type: "Thrillers",
          api: "https://api.themoviedb.org/3/discover/movie",
          page: 8,
          body: "sort_by=popularity.desc",
        },
      ])
    );
  }, [dispatch]);

  const reloadMovies = () => {
    dispatch(FilmAction.loaderHandler(true));
    fetchedData();
  };
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);
  const toggle = useSelector((state) => state.ui.toggle);
  const { films, isLoading, error } = useSelector((state) => state.films);
  const filmHtml = (
    <Wrapper
      bg={" bg-slate-700 "}
      otherCss={`max-h-screen ${
        toggle ? "col-span-7" : "col-span-full"
      } lg:col-span-9  overflow-scroll px-1  `}
    >
      <MovieContent moviesContent={films} />
    </Wrapper>
  );

  return (
    <>
      {!isLoading && !error.error && filmHtml}
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage message={error.message} reload={reloadMovies} />
      )}
    </>
  );
};
export default FilmPage;
