import { Link, useParams } from "react-router-dom";
import { originalImg } from "../../ImageLink";
import episodeImg from "../../asset/otherImg/MovieDepth.png";
const EpisodeList = ({ list, className }) => {
  const { tvId, seasonNumber } = useParams();
  return (
    <>
      {list && (
        <main className={className}>
          <h1 className="text-white text-3xl text-center">
            Season {seasonNumber}
          </h1>
          {list.map((episode) => (
            <li className="mx-2 max-h-[5rem] list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0 hover:bg-slate-900 my-3">
              <Link
                className="flex gap-3 "
                to={`/series/${tvId}/${seasonNumber}/${episode.episodeNumber}`}
              >
                <div className=" w-[35%]">
                  <img
                    className="h-full"
                    src={
                      episode.imgSrc ? originalImg(episode.imgSrc) : episodeImg
                    }
                    alt={episode.episodeName}
                  />
                </div>
                <div className="leading-5 w-[65%] py-1">
                  <h1 className="text-sm font-medium">{episode.episodeName}</h1>
                  <h3>Episode {episode.episodeNumber} </h3>
                  <h3>Runtime: {episode.episodeRuntime} mins</h3>
                  {episode.averagevotes ? (
                    <h5>
                      ratings:{" "}
                      <span className="text-xl">{episode.averagevotes}</span> /
                      10
                    </h5>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </main>
      )}
    </>
  );
};
export default EpisodeList;
