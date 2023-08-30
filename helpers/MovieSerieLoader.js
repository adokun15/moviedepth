import MovieCastWrapper from "./MovieWrapper";
import loaderImg from "../asset/icons8-loader-24.png";

const MovieSerieLoader = () => {
  return (
    <MovieCastWrapper cls="flex justify-center items-center col-start-1 col-end-5 min-h-[80vh]">
      <div className="animate-spin h-8 w-8 ">
        <img src={loaderImg} className="w-full h-full" alt="loader" />
      </div>
    </MovieCastWrapper>
  );
};
export default MovieSerieLoader;
