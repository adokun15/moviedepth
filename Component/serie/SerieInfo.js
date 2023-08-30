import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FetchSerieInfo } from "../../store/apiThunks/SerieApi";
import { originalImg, smallImg } from "../../ImageLink";
import SeasonList from "./SeasonList";
import Slider from "../Slider";
import SeasonRow from "./SeasonRow";

import movieImg from "../../asset/otherImg/MovieDepth (6).png";
import errImg from "../../asset/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg";

import watchlist from "../../asset/icons8-bookmark-24.png";
import favourite from "../../asset/icons8-favorite-24.png";
import vote from "../../asset/icons8-thumb-24.png";
import creatorImg from "../../asset/otherImg/MovieDepth (5).png";
import netImg from "../../asset/otherImg/MovieDepth (1).png";

import SectionHeader from "../../helpers/SectionHeader";
import Section from "../../helpers/Section";
import RootLoader from "../../helpers/RootLoader";
import ErrorPage from "../../pages/ErrorPage";

import Userwatchlisted from "../../asset/icons8-bookmark-48.png";
import Useravourite from "../../asset/icons8-favorite-24 (1).png";
import Uservote from "../../asset/icons8-thumb-24 (1).png";

import { WatchListFavoriteHandler } from "../../store/watchlistFavorite";
import { Notifier } from "../../store/Slices/notificationSlice";
import { RatingAction } from "../../store/Slices/RatingSlice";

const SerieInfo = () => {
  const { tvId } = useParams();
  const dispatch = useDispatch();

  const { isSuccess, isLoggedIn, sessionId } = useSelector((s) => s.auth);

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
      WatchListFavoriteHandler(tvId, sessionId, {
        name: type,
        bool,
        media: "tv",
      })
    );
  };
  const fetchedData = useCallback(() => {
    dispatch(FetchSerieInfo(tvId));
  }, [dispatch, tvId]);
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const { singleData, seasons, isLoading, error } = useSelector((s) => s.serie);

  const openRatingModal = () => {
    dispatch(
      RatingAction.ratingFunc({
        isOpened: true,
        ratingValue: singleData.rated ? singleData.rated.value : 1,
        mediaName: singleData.title,
        mediaType: "tv",
        mediaId: singleData.serieId,
      })
    );
  };

  const { seasonNumber, episodeNumber } = useParams();
  const { season } = useSelector((s) => s.serie);

  const infoPage = (
    <main className="overflow-scroll  bg-slate-700 lg:flex px-3 block gap-4  pt-3 max-h-[85vh] relative ">
      <div className=" overflow-scroll mt-14 lg:mt-6 lg:w-[75%] w-[100%]">
        <section
          style={{
            background: singleData.bgImgSrc
              ? `url(${originalImg(singleData.bgImgSrc)})`
              : `url(${movieImg})`,
            minHeight: "70vh",
            position: "relative",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="overflow-hidden bg-no-repeat  rounded-xl lg:h-[70vh]  "
        >
          {" "}
          <div className="absolute h-[100%]  py-3 bg-[rgba(0,0,0,0.85)]   min-h-[55vh] text-center w-full text-white ">
            <h1 className="lg:text-6xl mb-8 text-3xl px-4 text-yellow-600 ">
              {singleData.title}
            </h1>
            <p className="lg:text-xl text-[1rem] my-6 mx-4">
              {singleData.description}
            </p>
            {singleData.tag && (
              <p className="text-xl my-1 mx-2 italic">{singleData.tag}</p>
            )}
          </div>
        </section>
        <nav className=" lg:w-full w-[100%]  top-0 z-70 text-white absolute lg:h-6 h-7 lg:text-[1.1rem] pt-1 text-[0.9rem]  italic  lg:pb-2 pb-1   ">
          <Link to={`/series`}>Series</Link>
          <Link to={`/series/${tvId}`}> {` > ${singleData.title}`}</Link>
          <Link to={`${seasonNumber}`}>
            {seasonNumber
              ? ` >  ${
                  +seasonNumber !== 0
                    ? `Season ${seasonNumber}`
                    : season.seasonName
                }`
              : ""}
          </Link>
          <Link to={`${episodeNumber}`}>
            {episodeNumber ? ` > Episode ${episodeNumber}` : ""}
          </Link>
        </nav>

        <section className="flex my-3  px-7  text-yellow-700  justify-between gap-5 lg:text-xl text-[0.7rem]  ">
          <span className="block">{singleData.votes} people liked this.</span>
          <span className="block">
            Avg. Ratings: {singleData.averageVotes?.toFixed(2)}/10{" "}
          </span>
          {singleData.rated && isLoggedIn && (
            <span>
              Your ratings :{" "}
              {singleData.rated
                ? `${singleData.rated.value || singleData.rated}/10`
                : ""}{" "}
            </span>
          )}
        </section>
        <section className="flex my-3  px-7  text-yellow-700  justify-between gap-5 ">
          <div className="grid grid-cols-3 text-yellow-400 lg:text-[1rem] gap-2 lg:w-4/5 w-full text-[0.6rem]">
            <h2>Episodes/minute: {singleData.runtime} mins </h2>
            <h2>
              Number Of Season: {singleData.totalSeasons}{" "}
              {singleData.totalSeasons === 1 ? "Season" : "Seasons"}
            </h2>
            <h2>
              Number Of Episode: {singleData.totalEpisodes}{" "}
              {singleData.totalEpisodes === 1 ? "Episode" : "Episodes"}
            </h2>
            <h2>First Date Aired: {singleData.firstAirDate}</h2>
            <h2>Last Date Aired: {singleData.lastAirDate}</h2>
            <h2>Status: {singleData.status}</h2>
          </div>
          <div className="lg:flex hidden gap-5 items-center">
            <button
              className="max-h-[5rem] max-w-[5rem]"
              onClick={() =>
                watchlistFavHandler("tvFavorite", singleData.favorite, {
                  media: "tv",
                })
              }
            >
              {singleData.favorite && isSuccess && isLoggedIn ? (
                <img src={Useravourite} alt="favorite" />
              ) : (
                <img src={favourite} alt="favorite" />
              )}
            </button>

            <button
              className="max-h-[24px] max-w-[24px]"
              onClick={() =>
                watchlistFavHandler("tvWatchList", singleData.watchlist, {
                  media: "tv",
                })
              }
            >
              {singleData.watchlist && isSuccess && isLoggedIn ? (
                <img src={Userwatchlisted} alt="watchlist" />
              ) : (
                <img src={watchlist} alt="watchlist" />
              )}
            </button>
            <button
              className="max-h-[24px] max-w-[24px]"
              onClick={openRatingModal}
            >
              {singleData.rated && isSuccess && isLoggedIn ? (
                <img src={Uservote} alt="vote" />
              ) : (
                <img src={vote} alt="vote" />
              )}
            </button>
          </div>
        </section>

        <section className="flex lg:hidden justify-center">
          <div className="flex gap-7 items-center">
            <button
              className="max-h-[24px] max-w-[24px]"
              onClick={() =>
                watchlistFavHandler("tvFavorite", singleData.favorite, {
                  media: "tv",
                })
              }
            >
              {singleData.favorite && isSuccess && isLoggedIn ? (
                <img src={Useravourite} alt="favorite" />
              ) : (
                <img src={favourite} alt="favorite" />
              )}
            </button>

            <button
              className="max-h-[24px] max-w-[24px]"
              onClick={() =>
                watchlistFavHandler("tvWatchList", singleData.watchlist, {
                  media: "tv",
                })
              }
            >
              {singleData.watchlist && isSuccess && isLoggedIn ? (
                <img src={Userwatchlisted} alt="watchlist" />
              ) : (
                <img src={watchlist} alt="watchlist" />
              )}
            </button>
            <button
              className="max-h-[24px] max-w-[24px]"
              onClick={openRatingModal}
            >
              {singleData.rated && isSuccess && isLoggedIn ? (
                <img src={Uservote} alt="vote" />
              ) : (
                <img src={vote} alt="vote" />
              )}
            </button>
          </div>
        </section>

        {seasons && seasons.length >= 1 && (
          <section className="my-4  lg:hidden block">
            <h1 className="mb-3 text-3xl text-center mt-6 text-yellow-600">
              Seasons
            </h1>
            <SeasonRow list={seasons} />
          </section>
        )}

        {singleData.creators && singleData.creators.length !== 0 && (
          <Section>
            <SectionHeader>Creators</SectionHeader>
            <Slider>
              {singleData.creators.map((c) => (
                <div className="max-h-[35rem] block list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0  my-3 mx-2 min-w-[9rem] ">
                  <div className="lg:h-[14rem] h-[12rem] w-full">
                    <img
                      className="h-full w-[100%]"
                      src={c.imgSrc ? originalImg(c.imgSrc) : creatorImg}
                      alt={c.peopleId}
                    />
                  </div>
                  <h2 className="text-xl shadow-inner italic text-center text-yellow-700">
                    {c.name}
                  </h2>
                </div>
              ))}
            </Slider>
          </Section>
        )}
        <Section>
          <SectionHeader>Genres</SectionHeader>
          <div className=" block lg:ml-4   gap-5 rounded-2xl my-3 lg:justify-around justify-between lg:px-7 lg:text-xl text-[0.7rem] min-h-[3rem] items-center  text-yellow-700 text-xl bg-slate-800">
            {singleData.genre.map((g) => (
              <div>{g}</div>
            ))}
            {!singleData.genre ||
              (singleData.genre.length === 0 && (
                <p className="text-center">No Genre Available</p>
              ))}
          </div>
        </Section>
        <section className="bg-slate-800 my-3 rounded-2xl px-6 overflow-hidden">
          <SectionHeader> Production Company(s)</SectionHeader>
          {singleData.companies && (
            <div className=" grid gap-2  grid-cols-3">
              {singleData.companies.map((company) => (
                <div className="my-4 max-w-25 max-h-46 lg:w-full lg:h-full overflow-hidden">
                  {company.imgSrc ? (
                    <>
                      <img
                        src={
                          company.imgSrc
                            ? `${smallImg(company.imgSrc)}`
                            : errImg
                        }
                        alt="Company"
                        className="max-h-[80%] max-w-[100%]"
                      />
                    </>
                  ) : null}
                </div>
              ))}
              {!singleData.companies ||
                (singleData.companies.length === 0 && (
                  <p className="text-center block justify-center">
                    Companies Data Unavailable
                  </p>
                ))}
            </div>
          )}
        </section>
        <section className="py-2 bg-slate-800 my-3 rounded-2xl px-6">
          <SectionHeader> Production Country</SectionHeader>

          <div className="block lg:ml-7">
            {singleData.countries.map((country) => (
              <p className="lg:text-xl text-[0.9rem] my-3 text-yellow-700">
                {country}
              </p>
            ))}
            {!singleData.countries ||
              (singleData.countries.length === 0 && (
                <p className="text-center">Country Data Unavailable</p>
              ))}
          </div>
        </section>

        <Section>
          <SectionHeader>Network</SectionHeader>
          <div className="grid grid-cols-3 gap-3">
            {singleData.networks &&
              singleData.networks >= 1 &&
              singleData.networks.map((net) => (
                <div
                  className="my-4 max-w-25 max-h-25 lg:w-full lg:h-full overflow-hidden"
                  key={net.networkId}
                >
                  <div key={net.networkId}>
                    <img
                      className="h-full w-[100%]  rounded-xl"
                      src={net.imgSrc ? originalImg(net.imgSrc) : netImg}
                      alt={net.name}
                    />
                  </div>
                  <h2 className="lg:text-3xl text-[1rem] italic text-center text-yellow-700">
                    {net.name},{net.origin}
                  </h2>
                </div>
              ))}
            {!singleData.networks && singleData.networks === 0 && (
              <p className="text-center block justify-center">
                No Networks Data Available
              </p>
            )}
          </div>
        </Section>
        <section className="text-center lg:mt-4 w-full overflow-hidden">
          <h3 className="text-yellow-600">
            {singleData.InProduction
              ? "Series Still In Production"
              : "Series Not In Production"}
          </h3>
        </section>
      </div>
      <SeasonList
        className=" lg:block hidden w-[25%] overflow-scroll max-h-[90vh]"
        list={seasons}
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
            dispatch(FetchSerieInfo(tvId));
          }}
        />
      )}
      {!isLoading && !error.error && infoPage}
    </>
  );
};
export default SerieInfo;
