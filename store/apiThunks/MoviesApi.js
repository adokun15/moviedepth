import { MoviesAction } from "../Slices/moviesSlice";
import { secretToken } from "../../secretToken.js";

import { AllContentAction } from "../Slices/allContentModifier";
import { TimeOut } from "../TimeOut";
export const FetchHomeMovies = (k = []) => {
  return async (dispatch) => {
    //movies/series
    const promises = k.map(async (link) => {
      dispatch(MoviesAction.loaderHandler(true));
      dispatch(
        MoviesAction.errorHandler({
          error: false,
          message: "",
        })
      );

      const dataPromises = await fetch(link.api, {
        method: "get",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
      });

      if (!dataPromises.ok) {
        dispatch(
          MoviesAction.errorHandler({
            error: true,
            message: "Could not load Movies",
          })
        );
        dispatch(MoviesAction.loaderHandler(false));
      }
      const res = await dataPromises.json();
      dispatch(MoviesAction.loaderHandler(false));

      const data = res.results.map((result) => {
        return {
          type: "",
          imgSrc: result.poster_path,
          id: result.id,
          title: result.title || result.name || result.original_name,
        };
      });
      return {
        content: data,
        category: link.type,
        movieType: link.movieType,
      };
    });
    try {
      dispatch(MoviesAction.loaderHandler(true));

      const data = await Promise.race([TimeOut(8), Promise.all(promises)]);

      dispatch(MoviesAction.loaderHandler(false));

      dispatch(AllContentAction.modifyContent(data));
      dispatch(MoviesAction.addMovie(data));
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            MoviesAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            MoviesAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );
      dispatch(MoviesAction.loaderHandler(false));
    }
  };
};
