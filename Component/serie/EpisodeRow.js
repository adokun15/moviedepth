import { Link, useParams } from "react-router-dom";
import { originalImg } from "../../ImageLink";

const EpisodeRow = ({ list }) => {
  const { tvId, seasonNumber } = useParams();
  const newList = list.filter((l) => l.seasonNumber !== 0);

  return (
    <div>
      {newList.map((episode) => (
        <>
          <li className=" block mx-2 list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0  my-3">
            <Link
              className="gap-3 "
              to={`/series/${tvId}/${seasonNumber}/${episode.episodeNumber}`}
            >
              <div className="h-[80%]">
                <img
                  className=" w-full"
                  src={originalImg(episode.imgSrc)}
                  alt={episode.episodeName}
                />
              </div>

              <div className="py-2 h-[20%] text-center leading-8">
                <h1 className="text-center text-[0.9rem] font-medium">
                  {episode.episodeName}
                </h1>
                <h5>Episode {episode.episodeNumber}</h5>
              </div>
            </Link>
          </li>
        </>
      ))}
      {!newList && <p>loading</p>}
    </div>
  );
};
export default EpisodeRow;
