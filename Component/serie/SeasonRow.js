import { Link, useParams } from "react-router-dom";
import { originalImg } from "../../ImageLink";
import SeasonImg from "../../asset/otherImg/MovieDepthSeason.png";

import Slider from "../Slider";

const SeasonRow = ({ list }) => {
  const { tvId } = useParams();
  const newList = list.filter((l) => l.seasonNumber !== 0);
  return (
    <Slider>
      {newList.map((season) => (
        <>
          <li className=" mx-2 list-none rounded-xl text-white bg-slate-800  overflow-hidden first:mt-0  my-3">
            <Link
              className="block gap-3 "
              to={`/series/${tvId}/${season.seasonNumber}`}
            >
              <div className="h-[80%]">
                <img
                  className=" w-full"
                  src={season.imgSrc ? originalImg(season.imgSrc) : SeasonImg}
                  alt={season.seasonName}
                />
              </div>

              <div className="py-2 h-[20%]leading-8">
                <h1 className="text-center text-2xl font-medium">
                  {season.seasonName}
                </h1>
              </div>
            </Link>
          </li>
        </>
      ))}
    </Slider>
  );
};
export default SeasonRow;
