import { secretToken } from "../../secretToken";
import { SeriesAction } from "../Slices/tvSeriesSlice";
import { TimeOut } from "../TimeOut";

export const FetchSeriesData = (data) => {
  return async (dispatch) => {
    const promise = data.map(async (link) => {
      dispatch(SeriesAction.loadingHandler(true));
      dispatch(
        SeriesAction.errorHandler({
          error: false,
          message: "",
        })
      );

      const promises = await fetch(
        `${link.api}${link.body ? "?" : ""}${
          link.body ? link.body.split(",").join("&") : ""
        }${link.body ? `&page=${link.page}` : ""}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretToken}`,
          },
        }
      );
      if (!promises.ok) {
        dispatch(SeriesAction.loadingHandler(false));
        dispatch(
          SeriesAction.errorHandler({
            message: "Could Not Load series",
            error: true,
          })
        );
      }
      const data = await promises.json();
      return {
        category: link.type,
        content: data.results.map((result) => {
          return {
            imgSrc: result.poster_path,
            id: result.id,
            title: result.title || result.name || result.original_name,
          };
        }),
      };
    });

    try {
      dispatch(SeriesAction.loadingHandler(true));
      const data = await Promise.race([
        TimeOut(8, "Series "),
        Promise.all(promise),
      ]);
      dispatch(SeriesAction.loadingHandler(false));
      dispatch(SeriesAction.seriesData(data));
    } catch (err) {
      dispatch(SeriesAction.loadingHandler(false));
      typeof err === "string"
        ? dispatch(
            SeriesAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            SeriesAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );
    }
  };
};
