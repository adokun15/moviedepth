import Rows from "../helpers/Rows";
const MovieContent = ({ moviesContent }) => {
  return (
    <>
      {moviesContent.map((section, i) => (
        <div
          key={i}
          className="bg-slate-800  p-4 my-4 rounded-3xl first:mt-1  "
        >
          <h1 className="lg:text-5xl text-xl max-[600px]:text-center mb-3 capitalize text-white">
            {section.category || ""}
          </h1>
          <Rows
            content={section.content || []}
            type={section.movieType || ""}
          />
        </div>
      ))}
    </>
  );
};
export default MovieContent;
