const EpisodeCastRow = ({ list }) => {
  return (
    <div>
      {list.map((crew) => (
        <>
          <li className=" block min-h-[6rem] mx-2 list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0  my-3">
            <div className="leading-5 text-center py-1">
              <h1 className="text-xl font-medium text-center">{crew.name}</h1>
              <h3> Job: {crew.job} </h3>
              <h5>popularity: {crew.popularity} mil.</h5>
            </div>
          </li>
        </>
      ))}
    </div>
  );
};
export default EpisodeCastRow;
