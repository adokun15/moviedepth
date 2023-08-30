import { secretToken } from "../../secretToken";
import { OtherAction } from "../Slices/OtherSlice";
import { TimeOut } from "../TimeOut";

export const FetchOtherData = (type = {}) => {
  return async (dispatch) => {
    if (type.page > type.lastPage) type.page = 1;

    if (type.page < 1) type.page = type.lastPage;
    try {
      const FetchedResultsMovies = async (data) => {
        try {
          dispatch(OtherAction.loadingHandler(true));
          dispatch(
            OtherAction.errorHandler({
              error: false,
              message: "",
            })
          );

          const fetchData = await fetch(data, {
            method: "get",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${secretToken}`,
            },
          });

          if (!fetchData.ok) {
            dispatch(
              OtherAction.errorHandler({
                error: true,
                message: "Could NOT load Your Movies!",
              })
            );
            dispatch(OtherAction.loadingHandler(false));
          }

          const results = await fetchData.json();
          dispatch(OtherAction.loadingHandler(false));
          return {
            type: type.apiName,
            currentPage: results.page,
            lastPage: results.total_pages,
            data: results.results.map((result) => {
              return {
                imgSrc: result.poster_path,
                id: result.id,
                title: result.title || result.original_name,
              };
            }),
          };
        } catch (err) {
          dispatch(OtherAction.loadingHandler(false));
          dispatch(
            OtherAction.errorHandler({
              error: true,
              message: "SomeThing Went Wrong!",
            })
          );
        }
      };

      const FetchedResultsSeries = async (data) => {
        try {
          dispatch(OtherAction.loadingHandler(true));
          dispatch(
            OtherAction.errorHandler({
              error: false,
              message: "",
            })
          );

          const fetchData = await fetch(data, {
            method: "get",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${secretToken}`,
            },
          });

          if (!fetchData.ok) {
            dispatch(
              OtherAction.errorHandler({
                error: true,
                message: "Could NOT load Your Series!",
              })
            );
            dispatch(OtherAction.loadingHandler(false));
          }

          const results = await fetchData.json();
          dispatch(OtherAction.loadingHandler(false));
          return {
            type: type.apiName,
            currentPage: results.page,
            lastPage: results.total_pages,
            data: results.results.map((result) => {
              return {
                imgSrc: result.poster_path,
                id: result.id,
                title: result.name,
              };
            }),
          };
        } catch (err) {
          dispatch(OtherAction.loadingHandler(false));
          dispatch(
            OtherAction.errorHandler({
              error: true,
              message: "SomeThing Went Wrong!",
            })
          );
        }
      };

      if (type.apiName === "upcoming") {
        dispatch(OtherAction.loadingHandler(true));
        const result = await Promise.race([
          TimeOut(8, "Upcoming movie List"),
          FetchedResultsMovies(
            `https://api.themoviedb.org/3/movie/${type.apiName}?language=en-US&page=${type.page}`
          ),
        ]);

        dispatch(OtherAction.newData(result));
      }

      if (type.apiName === "popular") {
        dispatch(OtherAction.loadingHandler(true));
        const result = await Promise.race([
          TimeOut(8, "Popular Movie List"),
          FetchedResultsMovies(
            `https://api.themoviedb.org/3/movie/${type.apiName}?language=en-US&page=${type.page}`
          ),
        ]);
        dispatch(OtherAction.newData(result));
      }

      if (type.apiName === "top_rated") {
        dispatch(OtherAction.loadingHandler(true));
        const result = await Promise.race([
          TimeOut(8, "Top Rated Movie List"),
          FetchedResultsMovies(
            `https://api.themoviedb.org/3/movie/${type.apiName}?language=en-US&page=${type.page}`
          ),
        ]);
        dispatch(OtherAction.newData(result));
      }

      if (type.apiName === "onAir") {
        dispatch(OtherAction.loadingHandler(true));
        const result = await Promise.race([
          TimeOut(8),
          FetchedResultsSeries(
            `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${type.page}`
          ),
        ]);
        dispatch(OtherAction.newData(result));
      }

      if (type.apiName === "popularSeries") {
        dispatch(OtherAction.loadingHandler(true));
        const result = await Promise.race([
          TimeOut(8, "Popular Series List"),
          FetchedResultsSeries(
            `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${type.page}`
          ),
        ]);

        dispatch(OtherAction.newData(result));
      }

      if (type.apiName === "top_ratedSeries") {
        dispatch(OtherAction.loadingHandler(true));
        const result = await Promise.race([
          TimeOut(8, "Top rated Series List"),
          FetchedResultsSeries(
            `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${type.page}`
          ),
        ]);

        dispatch(OtherAction.newData(result));
      }
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            OtherAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            OtherAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );
      dispatch(OtherAction.loadingHandler(false));
    }
  };
};
