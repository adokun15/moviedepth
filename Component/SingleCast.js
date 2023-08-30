import ErrCast from "../asset/otherImg/MovieDepth (6).png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FetchCastData } from "../store/apiThunks/CastApi";
import MovieCastWrapper from "../helpers/MovieWrapper";

import MovieSerieLoader from "../helpers/MovieSerieLoader";
import MovieSerieError from "../helpers/MovieSerieError";
import { Link } from "react-router-dom";
import { CastAction } from "../store/Slices/castSlice";
import { smallImg } from "../ImageLink";
const SingleCast = () => {
  const { cast, isLoading, error } = useSelector((state) => state.cast);

  const { casts } = useSelector((state) => state.casts);
  const { castId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchCastData(castId));
  }, [castId, dispatch, casts]);
  const redo = () => {
    dispatch(CastAction.CastData(null));
  };
  const castHtml = (
    <MovieCastWrapper cls="min-h-[90vh] mt-3" typeError="cast">
      <section className="lg:block hidden">
        <div className="h-[20rem] object-cover  w-[20rem] overflow-hidden  m-auto rounded-[40%] ">
          <img
            src={cast.imgSrc ? `${smallImg(cast.imgSrc)}` : ErrCast}
            alt="Cast Img"
            className="w-full h-full "
          />
        </div>
      </section>
      <h1 className=" text-center my-2 text-5xl text-yellow-600">
        {" "}
        {cast.name}
      </h1>
      <p className="block lg:hidden text-yellow-600 text-center">
        as ({cast.role})
      </p>
      <section className="text-xl my-3 text-yellow-600 text-center lg:block hidden">
        <p>
          <b>{cast.name}</b> played the role of <i>{cast.role}</i>.
        </p>
      </section>

      <section className="lg:block hidden my-5">
        <div className=" flex px-9 text-yellow-600 justify-between">
          <article className=" font-medium">
            Gender:
            <span> {cast.gender}</span>
          </article>
          <article className=" font-medium">
            Popularity:
            <span> known by {cast.popularity} million people</span>
          </article>

          <article className=" font-medium">
            Department:
            <span> {cast.department}</span>
          </article>
        </div>
      </section>
      <section className="text-center ">
        <Link onClick={redo} to=".." className="text-yellow-500  underline">
          Go back
        </Link>
      </section>
    </MovieCastWrapper>
  );

  return (
    <>
      {!isLoading && !error.error && castHtml}
      {isLoading && !error.error && <MovieSerieLoader />}
      {!isLoading && error.error && (
        <MovieSerieError
          message="Could Not Load Cast!"
          reload={() => {
            dispatch(FetchCastData(castId));
          }}
        />
      )}
    </>
  );
};
export default SingleCast;
