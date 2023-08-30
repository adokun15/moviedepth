import MovieCastWrapper from "./MovieWrapper";
import errImg from "../asset/icons8-error-24.png";

const MovieSerieError = ({ message, reload }) => {
  return (
    <MovieCastWrapper cls="flex bg-white justify-center min-h-[80vh]">
      <div className="mt-14">
        <h1 className="text-3xl  text-yellow-600 my-3">{message}</h1>
        <img className="h-8 m-auto w-8" src={errImg} alt="error" />

        <button
          className=" m-auto block my-6 py-1 px-7 bg-slate-800 transition-all text-white cursor-pointer border-none outline-none hover:bg-slate-900 rounded-xl"
          onClick={reload}
        >
          Try Again
        </button>
      </div>
    </MovieCastWrapper>
  );
};
export default MovieSerieError;
