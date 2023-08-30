import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FetchSerieInfo } from "../../store/apiThunks/SerieApi";
import EpisodeCastList from "./EpisodeCastList";
import EpisodeCastRow from "./EpisodeCastRow";

import vote from "../../asset/icons8-thumb-24.png";
import ErrorPage from "../../pages/ErrorPage";
import RootLoader from "../../helpers/RootLoader";
import { RatingAction } from "../../store/Slices/RatingSlice";
import { Notifier } from "../../store/Slices/notificationSlice";

import Uservote from "../../asset/icons8-thumb-24 (1).png";
import { originalImg } from "../../ImageLink";

const SingleSerieEpisode = () => {
  const { tvId, episodeNumber, seasonNumber } = useParams();
  const dispatch = useDispatch();
  const fetchedData = useCallback(() => {
    dispatch(FetchSerieInfo(tvId, seasonNumber, episodeNumber));
  }, [dispatch, tvId, seasonNumber, episodeNumber]);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);
  const { episode, isLoading, error } = useSelector((s) => s.serie);
  const { isLoggedIn, isSuccess } = useSelector((S) => S.auth);

  const openRatingModal = () => {
    if (!isLoggedIn) {
      dispatch(
        Notifier({ isOpened: true, message: "You are Not Loggged In Yet" })
      );
      return;
    }
    if (!isSuccess) {
      dispatch(
        Notifier({ isOpened: true, message: "You dont have an Account" })
      );
      return;
    }
    dispatch(
      RatingAction.ratingFunc({
        isOpened: true,
        ratingValue: episode.rated ? episode.rated.value : 1,
        mediaName: `${
          seasonNumber === 0 ? "Season Specials" : `Season ${seasonNumber}`
        } (Episode ${episodeNumber})`,
        mediaType: "episode",
        mediaId: tvId,
        seasonNumber,
        episodeNumber,
      })
    );
  };

  const { season, singleData } = useSelector((s) => s.serie);

  const episodeHtml = (
    <main className="relative overflow-scroll z-10  bg-slate-700 lg:flex px-3 block gap-4  pt-3 h-[86vh]  ">
      <div className="lg:w-[75%] w-[100%] overflow-scroll  max-h-[85vh]">
        <section
          style={{
            background: `${originalImg(episode.bgImgSrc)})`,
            minHeight: "60vh",
            position: "relative",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="overflow-hidden rounded-xl  bg-no-repeat  lg:h-[70vh] max-h-[65vh] mt-14 lg:mt-7 "
        >
          <div className="absolute h-[100%]   py-3 bg-[rgba(0,0,0,0.85)]   min-h-[55vh] text-center w-full text-white ">
            <h1 className="lg:text-6xl mb-8 text-3xl px-4 text-yellow-600 ">
              {episode.episodeTitle}
            </h1>
            <p className="lg:text-xl text-[1rem] my-6 mx-4">
              {episode.description}
            </p>
            <p className="text-sm my-2 mx-4">
              {episode.averageVote
                ? `Avg Ratings: ${parseFloat(episode.averageVote).toFixed(
                    1
                  )} / 10`
                : ""}
            </p>
          </div>
        </section>
        {singleData.title && (
          <nav className=" lg:w-full w-[100%]  top-0 z-70 text-white absolute lg:h-6 h-7 lg:text-[1.1rem] pt-1 text-[0.9rem]  italic  lg:pb-2 pb-1   ">
            <Link to={`/series`}>Series</Link>
            <Link to={`/series/${tvId}`}> {` > ${singleData.title}`}</Link>
            <Link to={`/series/${tvId}/${seasonNumber}`}>
              {seasonNumber
                ? ` >  ${
                    +seasonNumber !== 0
                      ? `Season ${seasonNumber}`
                      : season.seasonName
                  }`
                : ""}
            </Link>
            <p>{episodeNumber ? ` > Episode ${episodeNumber}` : ""}</p>
          </nav>
        )}
        {!singleData.title && (
          <nav className=" lg:w-full w-[100%]  top-0 z-70 text-white absolute lg:h-6 h-7 lg:text-[1.1rem] pt-1 text-[0.9rem]  italic  lg:pb-2 pb-1   ">
            <Link className="underline italic" to={`../${seasonNumber}`}>
              Go BACK
            </Link>
          </nav>
        )}
        <section className="flex my-3 items-center  lg:px-7 px-2  text-yellow-700  justify-between gap-5 ">
          <div className="lg:grid block grid-cols-3 text-yellow-400 lg:text-[0.8rem] text-[0.9rem]">
            <h2>Episode Length: {episode.runtime} mins</h2>
            <h2>Date Aired: {episode.airDate} </h2>
            <span>{episode.votes} people liked this Episode </span>
          </div>

          <div className="flex  gap-3 items-center">
            <h1 className="lg:flex hidden ">
              {episode.rated && isLoggedIn && (
                <span>
                  Your ratings :{" "}
                  {episode.rated ? `${episode.rated.value}/10` : ""}{" "}
                </span>
              )}
            </h1>
            <button
              onClick={openRatingModal}
              className="max-h-[24px] max-w-[24px]"
            >
              {episode.rated && isSuccess && isLoggedIn ? (
                <img src={Uservote} alt="vote" />
              ) : (
                <img src={vote} alt="vote" />
              )}
            </button>
          </div>
        </section>

        <h1 className="lg:hidden flex justify-center text-yellow-700">
          {episode.rated && isLoggedIn && (
            <span>
              Your ratings : {episode.rated ? `${episode.rated.value}/10` : ""}{" "}
            </span>
          )}
        </h1>
        <section className="my-5 lg:hidden block">
          <h1 className="mb-3 text-2xl text-yellow-600 text-center">Crew</h1>
          <EpisodeCastRow list={episode.crew} />
        </section>
      </div>
      <EpisodeCastList
        className=" lg:block hidden w-[25%] px-4 overflow-scroll max-h-[90vh]"
        list={episode.crew}
      />
    </main>
  );

  return (
    <>
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage
          message={error.message}
          reload={() => {
            dispatch(FetchSerieInfo(tvId, seasonNumber, episodeNumber));
          }}
        />
      )}
      {!isLoading && !error.error && episodeHtml}
    </>
  );
};
export default SingleSerieEpisode;
