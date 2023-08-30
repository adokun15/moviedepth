import { Link } from "react-router-dom";
import Image from "./Image";
import SeasonImg from "../asset/otherImg/MovieDepth (6).png";

const Rows = ({ content, type }) => {
  return (
    <main className="py-2">
      {content.length > 0 && content && (
        <div className="grid  lg:grid-cols-5 grid-cols-2  grid-rows-1 gap-3 px-4 ">
          {content.map((movie) => (
            <div key={movie.id} className="">
              <Link
                to={`${type ? `/series/${movie.id}` : `/films/${movie.id}`}`}
              >
                <Image
                  imgSrc={movie.imgSrc ? movie.imgSrc : SeasonImg}
                  height={90}
                />
                {
                  <h2 className="text-center text-1 font-medium  text-white">
                    {movie.title}
                  </h2>
                }
              </Link>
            </div>
          ))}
        </div>
      )}
      {!content && content.length === 0 && <p>No no</p>}
    </main>
  );
};
export default Rows;
/*
<main className="grid grid-cols-2 gap-1 lg:grid-cols-5 ">
    {content.map((movie) => (
      <div key={movie.id} className="px-2 py-2">
        <Link to={`/${movie.id}`}>
          <img
            className="rounded-2xl"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="movie"
          />
          <h1 className="text-center text-xl font-serif">
            {movie.original_title}
          </h1>
        </Link>
      </div>
    ))}
  </main>*/
