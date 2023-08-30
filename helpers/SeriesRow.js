import { Link } from "react-router-dom";
import Image from "./Image";
const SeriesRows = ({ content }) => {
  return (
    <main className="py-2">
      <div className="grid  lg:grid-cols-5 grid-cols-2  grid-rows-1 gap-3 px-4 ">
        {content.map((movie) => (
          <div key={movie.id} className="">
            <Link to={`/series/${movie.id}`}>
              <Image imgSrc={movie.imgSrc} />
              {
                <h2 className="text-center text-1 font-medium  text-white">
                  {movie.title}
                </h2>
              }
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};
export default SeriesRows;
