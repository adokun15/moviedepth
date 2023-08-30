import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FetchSerieInfo } from "../../store/apiThunks/SerieApi";
import EpisodeList from "./EpisodeList";
import EpisodeRow from "./EpisodeRow";
import ErrorPage from "../../pages/ErrorPage";
import RootLoader from "../../helpers/RootLoader";
import { originalImg } from "../../ImageLink";

const SingleSerieSeason = () => {
  const { tvId, seasonNumber } = useParams();
  const dispatch = useDispatch();
  const fetchedData = useCallback(() => {
    dispatch(FetchSerieInfo(tvId, seasonNumber));
  }, [dispatch, tvId, seasonNumber]);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const { season, singleData, isLoading, error } = useSelector((s) => s.serie);

  const seasonHtml = (
    <main className="overflow-scroll  bg-slate-700 lg:flex px-3 block gap-4  pt-3 h-[84vh] relative  lg:max-h-[86vh]">
      <div className="lg:overflow-hidden mt-8 lg:mt-4 lg:w-[75%] w-[100%] overflow-scroll">
        <section
          style={{
            background: `url(${originalImg(season.seasonImgSrc)})`,
            maxHeight: "84vh",
            minHeight: "70vh",
            position: "relative",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="overflow-hidden rounded-xl  bg-no-repeat  lg:h-[70vh] max-h-[65vh] lg:mt-5"
        >
          <div className="absolute h-[100%]   py-3 bg-[rgba(0,0,0,0.85)]   min-h-[55vh] text-center w-full text-white ">
            <h1 className="lg:text-6xl mb-8 text-3xl px-4 text-yellow-600 ">
              {season.seasonName}
            </h1>
            <p className="lg:text-xl text-[0.8rem] my-6 mx-4">
              {season.description}
            </p>
            <p className="text-sm my-2 mx-4">
              {season.averageVote
                ? `Avg Ratings: ${parseFloat(season.averageVote)} / 10`
                : ""}
            </p>
          </div>
        </section>
        {singleData.title && (
          <nav className=" lg:w-full w-[100%]  top-0 z-70 text-white absolute lg:h-6 h-7 lg:text-[1.1rem] pt-1 text-[0.9rem]  italic  lg:pb-2 pb-1   ">
            <Link to={`/series`}>Series</Link>
            <Link to={`/series/${tvId}`}> {` > ${singleData.title}`}</Link>
            <p>
              {seasonNumber
                ? ` >  ${
                    +seasonNumber !== 0
                      ? `Season ${seasonNumber}`
                      : season.seasonName
                  }`
                : ""}
            </p>
          </nav>
        )}

        {!singleData.title && (
          <nav className=" lg:w-full w-[100%]  top-0 z-70 text-white absolute lg:h-6 h-7 lg:text-[1.1rem] pt-1 text-[0.9rem]  italic  lg:pb-2 pb-1   ">
            <Link className="underline italic" to={`../`}>
              Go BACK
            </Link>
          </nav>
        )}
        <div className="flex  px-4 text-yellow-400 justify-between lg:text-[1rem] gap-2 lg:w-4/5 w-full text-[0.8rem]">
          s{" "}
          <h2>
            Number Of Episode: {season.episodes.length}
            {season.totalEpisodes === 1 ? " Episode" : " Episodes"}
          </h2>
          <h2> Date Aired: {season.airDate}</h2>
        </div>
        <section className=" my-4  lg:hidden block">
          <h1 className="my-5 text-xl text-center text-yellow-600 z-40">
            Episodes
          </h1>
          <EpisodeRow list={season.episodes} />
        </section>
      </div>
      <EpisodeList
        className=" lg:block hidden w-[25%] lg:h-full overflow-scroll max-h-[90vh]"
        list={season.episodes}
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
            dispatch(FetchSerieInfo(tvId, seasonNumber));
          }}
        />
      )}
      {!isLoading && !error.error && seasonHtml}
    </>
  );
};
export default SingleSerieSeason;
