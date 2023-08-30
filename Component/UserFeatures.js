import { Link } from "react-router-dom";
import Image from "../helpers/Image";
import { useDispatch, useSelector } from "react-redux";
import { Features } from "../store/Features";
import backImg from "../asset/icons8-back-24 (1).png";
import frontImg from "../asset/icons8-forward-24.png";

const UserFeature = () => {
  const { userFeatures } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const frontHandler = () => {
    dispatch(
      Features(
        {
          type: userFeatures.type,
          feature: userFeatures.feature,
          page: userFeatures.currentPage + 1,
          lastPage: userFeatures.lastPage,
        },
        sessionId
      )
    );
  };

  const backHandler = () => {
    dispatch(
      Features(
        {
          type: userFeatures.type,
          feature: userFeatures.feature,
          page: userFeatures.currentPage - 1,
          lastPage: userFeatures.lastPage,
        },
        sessionId
      )
    );
  };
  const { sessionId } = useSelector((s) => s.auth);

  return (
    <>
      {userFeatures.feature && (
        <div className="bg-slate-800 min-h-[88vh] h-fit rounded-xl">
          <main className="py-2">
            <div className="grid  lg:grid-cols-5 grid-cols-2  grid-rows-1 gap-3 px-4 ">
              {userFeatures.list.length >= 1 &&
                userFeatures.list.map((movie) => (
                  <div
                    key={movie.id || movie.showId}
                    className="max-h-70 overflow-hidden"
                  >
                    <Link
                      to={
                        movie.type === "movies"
                          ? `/films/${movie.id}`
                          : movie.type === "tv"
                          ? `/series/${movie.id || movie.showId}`
                          : `/series/${movie.showId}/${movie.seasonNumber}/${movie.episodeNumber}`
                      }
                    >
                      <Image imgSrc={movie.imgSrc} height={70} />
                      {
                        <h2 className="text-center lg:text-lg text-[0.9rem] font-medium  text-white">
                          {movie.title}
                        </h2>
                      }
                      {movie.seasonNumber && movie.episodeNumber && (
                        <h4 className="text-center text-sm font-medium  text-white">
                          Season {movie.seasonNumber}, Episode{" "}
                          {movie.episodeNumber}
                        </h4>
                      )}
                    </Link>
                  </div>
                ))}
            </div>
            <div className="px-4 ">
              {userFeatures.list.length === 0 && (
                <h1 className="text-white my-4 grid-flow-col text-3xl text-center">{`You dont Have any ${
                  userFeatures.type === "fav" &&
                  userFeatures.feature === "movies"
                    ? "Favorites movies"
                    : userFeatures.type === "fav" &&
                      userFeatures.feature === "tv"
                    ? "Favorites Series"
                    : userFeatures.type === "watchlist" &&
                      userFeatures.feature === "movies"
                    ? "WatchListed  movies"
                    : userFeatures.type === "watchlist" &&
                      userFeatures.feature === "tv"
                    ? "Watchlisted Series"
                    : userFeatures.type === "rated" &&
                      userFeatures.feature === "tv"
                    ? "Series you liked"
                    : userFeatures.type === "rated" &&
                      userFeatures.feature === "movies"
                    ? "Movies you liked"
                    : userFeatures.type === "rated" &&
                      userFeatures.feature === "episode"
                    ? "Episode you liked"
                    : "Liked/rated"
                }`}</h1>
              )}
            </div>
          </main>
          {userFeatures.list &&
            userFeatures.list.length !== 0 &&
            userFeatures.lastPage !== userFeatures.currentPage && (
              <div className=" flex justify-center mt-3 mb-1">
                <button
                  onClick={backHandler}
                  disabled={userFeatures.currentPage <= 1}
                >
                  <img src={backImg} alt="" />
                </button>
                <b className="text-3xl text-yellow-700">
                  {userFeatures.currentPage}
                </b>
                <button onClick={frontHandler}>
                  <img src={frontImg} alt="" />
                </button>
              </div>
            )}
        </div>
      )}
      {!userFeatures.feature && (
        <p className="text-center text-yellow-600">
          Not Available at the Moment
        </p>
      )}
    </>
  );
};
export default UserFeature;
