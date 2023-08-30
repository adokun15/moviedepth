import { secretToken } from "../../secretToken";
import { CastAction } from "../Slices/castSlice";
import { TimeOut } from "../TimeOut";

export const FetchCastData = (castId) => {
  return async (dispatch) => {
    try {
      dispatch(CastAction.loaderHandler(true));
      const fetchData = await fetch(
        `https://api.themoviedb.org/3/credit/${castId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretToken}`,
          },
        }
      );

      if (!fetchData.ok) {
        dispatch(
          CastAction.errorHandler({
            error: true,
            message: "Could not load Movie",
          })
        );
        dispatch(CastAction.loaderHandler(false));
      }

      const data = await Promise.race([
        TimeOut(8, "Cast Information"),
        fetchData.json(),
      ]);
      dispatch(CastAction.loaderHandler(false));

      const cast = {
        //personal Detail
        department: data.department,
        peopleId: data.person.id,
        name: data.person.name,
        originalName: data.person.original_name,
        gender:
          data.person.gender === 2
            ? "Male"
            : data.person.gender === 1
            ? "Female"
            : "Unkwown",
        popularity: data.person.popularity,
        imgSrc: data.person.profile_path,
        castId: data.id,
        media: data.media_type,
        //movie Role Acted In(Detail)
        role: data.media.character,
        moviebg: data.media.backdrop_path,
        movieId: data.media.id,
        movieTitle: data.media.title,
        originalMovieTitle: data.media.original_title,
        movieImgSrc: data.media.poster_path,
        movieDescription: data.media.overview,
        movieGenreId: [...data.media.genre_ids],
        moviePopularity: data.media.popularity,
        movieReleaseDate: data.media.release_date,
        votes: data.media.vote_count,
      };

      dispatch(CastAction.CastData(cast));
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            CastAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            CastAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );

      dispatch(CastAction.loaderHandler(false));
    }
  };
};
