import { Link, useParams } from "react-router-dom";
import { smallImg } from "../../ImageLink";
import SeasonImg from "../../asset/otherImg/MovieDepthSeason.png";

const SeasonList = ({ list, className }) => {
  const { tvId } = useParams();
  return (
    <main className={className}>
      <h1 className="text-white text-3xl text-center">Seasons</h1>
      {list &&
        list.length >= 1 &&
        list.map((season) => (
          <li className="mx-2 list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0 hover:bg-slate-900 my-3">
            <Link
              className="flex gap-3 "
              to={`/series/${tvId}/${season.seasonNumber}`}
            >
              <div className={season.imgSrc ? `h-[8rem]` : "h-[4rem]"}>
                <img
                  className={season.imgSrc ? `h-full` : "h-[10rem]"}
                  src={season.imgSrc ? smallImg(season.imgSrc) : SeasonImg}
                  alt={season.seasonName}
                />
              </div>
              <div className="leading-8">
                <h1 className="text-xl font-medium">{season.seasonName}</h1>
                <h3>Date Aired: {season.airDate}</h3>
                <h3>Episodes: {season.numberOfEpisodes}</h3>
                {season.Averagevotes ? (
                  <h5>
                    ratings:{" "}
                    <span className="text-xl">{season.Averagevotes}</span> / 10
                  </h5>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      {!list ||
        (list.length === 0 && (
          <p className="text-center text-yellow-500">No seasons Available </p>
        ))}
    </main>
  );
};
export default SeasonList;
