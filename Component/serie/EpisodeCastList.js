import { useParams } from "react-router-dom";

const EpisodeCastList = ({ list, className }) => {
  const { episodeNumber } = useParams();
  return (
    <>
      {list && (
        <main className={className}>
          <h1 className="text-white text-xl text-center">
            Episode {episodeNumber} (Crew)
          </h1>
          {list.map((crew) => (
            <li className="mx-2 list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0 hover:bg-slate-900 my-3">
              <div className="leading-5 text-center py-1">
                <h1 className="text-xl font-medium text-center">{crew.name}</h1>

                <h3> Job: {crew.job} </h3>
                <h5>popularity: {crew.popularity} mil.</h5>
              </div>
            </li>
          ))}
        </main>
      )}
    </>
  );
};
export default EpisodeCastList;
