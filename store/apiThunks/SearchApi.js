import { secretToken } from "../../secretToken";
import { SearchAction } from "../Slices/searchedItemSlice";
import { TimeOut } from "../TimeOut";

export const FetchSearchedItem = ({ query, type, page, lastPage = 2 }) => {
  return async (dispatch) => {
    if (page > lastPage) page = 1;

    if (page < 1) page = lastPage;

    const getMultiResults = async () => {
      dispatch(SearchAction.loaderHandler(true));
      dispatch(
        SearchAction.errorHandler({
          error: false,
          message: "",
        })
      );

      const fetchedData = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&page=${
          page || 1
        }`,
        {
          method: "get",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretToken}`,
          },
        }
      );
      if (!fetchedData.ok) {
        dispatch(
          SearchAction.errorHandler({
            error: true,
            message: `Could not Fetch Result "${query}"`,
          })
        );
        dispatch(SearchAction.loaderHandler(false));
      }

      const multidata = await fetchedData.json();

      const movieSerie = multidata.results.filter(
        (m) => m.media_type !== "person"
      );
      const ms = movieSerie.map((ms) => {
        return {
          type: ms.media_type === "movie" ? "films" : "series",
          id: ms.id,
          imgSrc: ms.poster_path,
          title: ms.title || ms.original_title || ms.name || ms.original_name,
        };
      });
      return {
        query,
        list: ms,
        currentpage: multidata.page,
        lastPage: multidata.total_pages,
      };
    };

    try {
      dispatch(SearchAction.loaderHandler(true));
      const all = await Promise.race([TimeOut(8), getMultiResults()]);
      dispatch(SearchAction.loaderHandler(false));
      if (type === "multi") {
        dispatch(SearchAction.addList(all));
      }
      if (type === "series") {
        const tv = all.list.filter((s) => s.type === "series");
        dispatch(
          SearchAction.addList({
            query: all.query,
            list: tv,
            currentpage: page,
            lastpage: all.lastPage,
          })
        );
      }
      if (type === "movies") {
        const movies = all.list.filter((s) => s.type === "films");
        dispatch(
          SearchAction.addList({
            query: all.query,
            list: movies,
            currentpage: page,
            lastpage: all.lastPage,
          })
        );
      }
      return;
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            SearchAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            SearchAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );

      dispatch(SearchAction.loaderHandler(false));
    }
  };
};
