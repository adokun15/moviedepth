import { secretToken } from "../../secretToken";
import { FilmAction } from "../Slices/filmsSlice";
import { TimeOut } from "../TimeOut";

export const FetchFilmData = (data) => {
  return async (dispatch) => {
    const promisesObject = data.map(async (link) => {
      dispatch(FilmAction.loaderHandler(true));

      dispatch(
        FilmAction.errorHandler({
          error: false,
          message: "",
        })
      );

      const promises = await fetch(
        `${link.api}?${link.body.split(",").join("&")}&page=${link.page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretToken}`,
          },
        }
      );
      if (!promises.ok) {
        dispatch(FilmAction.loaderHandler(false));
        dispatch(
          FilmAction.errorHandler({
            error: true,
            message: "Could not load Films",
          })
        );
      }
      const data = await promises.json();
      dispatch(FilmAction.loaderHandler(false));
      return {
        category: link.type,
        content: data.results.map((result) => {
          return {
            imgSrc: result.poster_path,
            id: result.id,
            title: result.title || result.original_name,
          };
        }),
      };
    });

    try {
      dispatch(FilmAction.loaderHandler(true));

      const data = await Promise.race([
        TimeOut(8, "movie list"),
        Promise.all(promisesObject),
      ]);
      dispatch(FilmAction.loaderHandler(false));
      dispatch(FilmAction.filmData(data));
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            FilmAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            FilmAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );
      dispatch(FilmAction.loaderHandler(false));
    }
  };
};
