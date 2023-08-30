import { useDispatch, useSelector } from "react-redux";
import MovieCastWrapper from "../helpers/MovieWrapper";
import MovieSerieError from "../helpers/MovieSerieError";
import MovieSerieLoader from "../helpers/MovieSerieLoader";
import { uiActions } from "../store/UI";

import errImg from "../asset/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg";
import close from "../asset/icons8-expand-arrow-24.png";
import open from "../asset/icons8-collapse-arrow-24.png";
import watchlist from "../asset/icons8-bookmark-24.png";
import favourite from "../asset/icons8-favorite-24.png";
import vote from "../asset/icons8-thumb-24.png";

import Userwatchlisted from "../asset/icons8-bookmark-48.png";
import Useravourite from "../asset/icons8-favorite-24 (1).png";
import Uservote from "../asset/icons8-thumb-24 (1).png";

import movieImg from "../asset/otherImg/MovieDepth (6).png";
import { WatchListFavoriteHandler } from "../store/watchlistFavorite";
import { Notifier } from "../store/Slices/notificationSlice";
import { RatingAction } from "../store/Slices/RatingSlice";
import Slider from "./Slider";
import { originalImg } from "../ImageLink";
import { Link, useOutletContext } from "react-router-dom";

const SingleMovie = () => {
  //Selectors
  const { movie, isLoading, error } = useSelector((state) => state.movie);
  const movieFunc = useOutletContext();
  const { isSuccess, isLoggedIn, sessionId } = useSelector((s) => s.auth);
  const { toggle } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openRatingModal = () => {
    dispatch(
      RatingAction.ratingFunc({
        isOpened: true,
        ratingValue: movie.rated ? movie.rated.value : 1,
        mediaName: movie.title,
        mediaType: "movie",
        mediaId: movie.id,
      })
    );
  };
  const watchlistFavHandler = (type, bool) => {
    if (!isLoggedIn) {
      dispatch(
        Notifier({
          isOpened: true,
          message: "You are Not logged In.",
        })
      );
    }
    if (!isSuccess) {
      dispatch(
        Notifier({
          isOpened: true,
          message: "You dont Have an Account yet. ",
        })
      );
    }
    if (!isLoggedIn || !isSuccess) return;

    dispatch(
      WatchListFavoriteHandler(movie.id, sessionId, {
        name: type,
        bool,
        media: "movie",
      })
    );
  };
  const { casts } = useSelector((state) => state.casts);

  const movieHtml = (
    <MovieCastWrapper cls="block relative max-h-[80vh] lg:max-h-[100%] lg:col-end-5 col-span-full ">
      <div className="w-full">
        <section
          style={{
            background: movie.bgImgSrc
              ? `url(${originalImg(movie.bgImgSrc)})`
              : `url(${movieImg})`,
            minHeight: "65vh",
            position: "relative",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="overflow-hidden rounded-xl  bg-no-repeat  lg:h-[70vh] "
        >
          <div className="absolute h-[100%]   py-3 bg-[rgba(0,0,0,0.85)]   min-h-[55vh] text-center w-full text-white ">
            <h1 className="lg:text-6xl mb-8 text-3xl px-4 text-yellow-600 ">
              {movie.title}
            </h1>
            <p className="lg:text-xl text-[1rem] my-6 mx-4">
              {movie.description}
            </p>
            {movie.tag && (
              <>
                <p className="lg:text-xl text-[0.7rem] my-1 mx-2 italic">
                  *{movie.tag}*
                </p>
              </>
            )}
            <div className="flex relative mb-5 lg:grid-cols-3 text-[0.8rem] rounded-2xl my-3 px-3 min-h-[3rem] items-center text-yellow-700 lg:text-xl lg:hidden  items-center justify-between">
              {movie.status && <p>status: {movie.status}</p>}
              {movie.popularity && <p>{movie.popularity} million views</p>}
              {movie.releasedDate && <p>{movie.releasedDate}</p>}
            </div>
          </div>
        </section>
        {
          <section className="flex my-3  px-7  text-yellow-700  justify-between gap-5 lg:text-xl text-[0.7rem] ">
            <span className="block">{movie.votes} people liked this.</span>
            <span className="block">
              Avg. Ratings: {movie.averageVotes?.toFixed(2)}/10{" "}
            </span>
            {movie.rated && isLoggedIn && (
              <span>
                Your ratings :{" "}
                {movie.rated ? `${movie.rated.value || movie.rated}/10` : ""}
              </span>
            )}
          </section>
        }{" "}
        <section className="flex my-3  px-7 items-center  text-yellow-700  justify-between gap-5 ">
          <p className="lg:text-xl text-[0.8rem]">
            Movie Runtime: {movie.runtime} mins
          </p>
          <div className="flex gap-5 items-center">
            <button
              className="max-h-[5rem] max-w-[5rem]"
              onClick={() =>
                watchlistFavHandler("movieFavorite", movie.favorite, {
                  media: "movie",
                })
              }
            >
              {movie.favorite && isSuccess && isLoggedIn ? (
                <img src={Useravourite} alt="favorite" />
              ) : (
                <img src={favourite} alt="favorite" />
              )}
            </button>
            <button
              className="max-h-[24px] max-w-[24px]"
              onClick={() =>
                watchlistFavHandler("movieWatchList", movie.watchlist, {
                  media: "movie",
                })
              }
            >
              {movie.watchlist && isSuccess && isLoggedIn ? (
                <img src={Userwatchlisted} alt="watchlist" />
              ) : (
                <img src={watchlist} alt="watchlist" />
              )}
            </button>
            <button
              onClick={openRatingModal}
              className="max-h-[24px] max-w-[24px]"
            >
              {movie.rated && isSuccess && isLoggedIn ? (
                <img src={Uservote} alt="vote" />
              ) : (
                <img src={vote} alt="vote" />
              )}
            </button>
          </div>
        </section>
        <section className="block lg:hidden">
          <h1 className="text-3xl text-center my-4 text-white">Cast</h1>
          {casts.length !== 0 && casts && (
            <Slider>
              {casts.map((cast, i) => (
                <>
                  <li
                    key={i}
                    className="max-h-[35rem] block list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0  my-3 mx-2 min-w-[9rem]"
                  >
                    <Link className="gap-3 " to={`${cast.castId}/cast`}>
                      <div className="h-[80%]">
                        <img
                          className=" w-full"
                          src={
                            cast.imgSrc ? originalImg(cast.imgSrc) : movieImg
                          }
                          alt={cast.name}
                        />
                      </div>

                      {(cast.name || cast.originalName) && cast.character && (
                        <div className="py-2 h-[20%] text-center leading-2">
                          <h1 className="text-center text-[0.8rem] font-medium">
                            {cast.name || cast.originalName}
                          </h1>
                          as
                          <p className="text-yellow-700 pl-3 text-start">
                            {cast.character}
                          </p>
                        </div>
                      )}
                    </Link>
                  </li>
                </>
              ))}
            </Slider>
          )}
          {!casts ||
            (casts.length === 0 && (
              <p className="text-center text-white">No Cast Available.</p>
            ))}
        </section>
        <section className="bg-slate-800 my-3 rounded-2xl px-6">
          <h1 className="lg:text-3xl text-xl text-center lg:text-start text-white">
            Genres
          </h1>

          {movie.genre && movie.genre.length >= 1 && (
            <div className=" block lg:ml-4   gap-5 rounded-2xl my-3 lg:justify-around justify-between lg:px-7 lg:text-xl text-[0.7rem] min-h-[3rem] items-center  text-yellow-700 text-xl bg-slate-800">
              {movie.genre.map((g, i) => (
                <p key={i}>{g}</p>
              ))}
            </div>
          )}
          {!movie.genre ||
            (movie.genre.length === 0 && (
              <p className="text-center">No Genre Available</p>
            ))}
        </section>
        <section className="py-2 bg-slate-800 my-3 rounded-2xl px-6">
          <h1 className="lg:text-3xl text-xl text-center lg:text-start text-white">
            Production Country
          </h1>

          <div className="block lg:ml-7">
            {movie.countryOrigin &&
              movie.countryOrigin.length >= 1 &&
              movie.countryOrigin.map((country, i) => (
                <p
                  key={i}
                  className="lg:text-xl text-[0.9rem] my-3 text-yellow-700"
                >
                  {country.title}
                </p>
              ))}
            {!movie.countryOrigin ||
              (movie.countryOrigin.length === 0 && (
                <p className="text-center">Country Data Unavailable</p>
              ))}
          </div>
        </section>
        <section className="py-2 bg-slate-800 my-3 rounded-2xl px-6">
          <h1 className="lg:text-3xl text-xl text-center lg:text-start text-white">
            Language(s) spoken in the movie
          </h1>
          <div className="lg:flex gap">
            {movie.languages &&
              movie.languages.length >= 1 &&
              movie.languages.map((l, i) => (
                <p
                  key={i}
                  className="lg:text-xl text-[0.9rem] my-3 text-yellow-700 ml-5"
                >
                  {l.name}
                </p>
              ))}
            {!movie.languages ||
              (movie.languages.length === 0 && (
                <p className="text-center"> Language(s) Data Unavailable</p>
              ))}
          </div>
        </section>
        <section className="bg-slate-800 my-3 rounded-2xl px-6 overflow-hidden">
          <h1 className="lg:text-3xl text-xl text-center lg:text-start text-white">
            Production companies
          </h1>
          {toggle && movie.companies && movie.companies.length >= 1 && (
            <div className=" grid gap-2  grid-cols-3">
              {movie.companies.map((company, i) => (
                <div
                  key={i}
                  className="my-4 max-w-25 max-h-25 lg:w-full lg:h-full overflow-hidden"
                >
                  {company.ImgSrc ? (
                    <>
                      <img
                        src={
                          company.ImgSrc
                            ? `https://image.tmdb.org/t/p/w300/${company.ImgSrc}`
                            : errImg
                        }
                        alt="Company"
                        className="max-h-[80%] max-w-[100%]"
                      />
                    </>
                  ) : null}
                </div>
              ))}
              {!movie.companies ||
                (movie.companies.length === 0 && (
                  <p className="text-center block justify-center">
                    Companies Data Unavailable
                  </p>
                ))}
            </div>
          )}
          <div className=" flex justify-center">
            <button
              className=" mx-auto my-4"
              onClick={() => dispatch(uiActions.toggleHandler())}
            >
              {toggle ? (
                <img src={open} alt="open" />
              ) : (
                <img src={close} alt="open" />
              )}
            </button>
          </div>
        </section>
        <section className="bg-slate-800 my-3 rounded-2xl px-6 hidden lg:block">
          <h1 className="lg:text-3xl text-xl text-center lg:text-start text-white">
            Movie Detail
          </h1>
          <div className="lg:grid lg:grid-cols-3  hidden text-[0.8rem] rounded-2xl my-3 px-7 min-h-[3rem] items-center text-yellow-700 lg:text-xl  items-center">
            <p>status: {movie.status}</p>
            <p>{movie.popularity} million views</p>
            <p>Release date: {movie.releasedDate}</p>
          </div>
        </section>
        {movie.homepage && (
          <section className="text-center w-full overflow-hidden">
            <h3 className="text-yellow-600">
              Learn more{" "}
              <p className="text-yellow-500 italic underline">
                @
                <a
                  className="block text-[0.8rem]"
                  href={movie.homepage}
                  rel="noreferrer"
                  target="_blank"
                >
                  {movie.title}
                </a>
              </p>
            </h3>
          </section>
        )}
      </div>
    </MovieCastWrapper>
  );

  return (
    <>
      {!isLoading && !error.error && movieHtml}
      {isLoading && !error.error && <MovieSerieLoader />}
      {!isLoading && error.error && (
        <MovieSerieError message={error.message} reload={() => movieFunc()} />
      )}
    </>
  );
};
export default SingleMovie;
