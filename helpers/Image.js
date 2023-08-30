import imgNotFound from "../asset/otherImg/MovieDepth (6).png";
const Image = ({ imgSrc }) => {
  const Immg = (
    <img
      src={`https://image.tmdb.org/t/p/w300/${imgSrc}`}
      alt="movie"
      className={`h-9/11 w-full rounded-2xl`}
      loading="lazy"
    />
  );

  const notFound = (
    <img
      src={imgNotFound}
      alt="movie"
      className={` w-full rounded-2xl lg:h-[80%] h-full `}
      loading="lazy"
    />
  );
  return (
    <>
      {imgSrc && Immg}
      {(!imgSrc || imgSrc === null) && notFound}
    </>
  );
};
export default Image;
