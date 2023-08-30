import { accountId, secretToken } from "../secretToken";
import { AuthAction } from "./Slices/authSlice";

export const Features = (
  { type = "", feature = "", page, lastPage },
  session
) => {
  return async (dispatch) => {
    try {
      if (page >= lastPage) page = 1;

      if (page < 1) page = lastPage;
      const fetchResult = async (link) => {
        dispatch(AuthAction.userLoaderHander(true));
        const fetchData = await fetch(link, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretToken}`,
          },
        });

        if (!fetchData.ok) {
          dispatch(
            AuthAction.userErrorHandler({
              error: true,
              message: `Could not Load ${feature}`,
            })
          );
          dispatch(AuthAction.userLoaderHander(false));
          return;
        }

        const jsonObj = await fetchData.json();

        dispatch(AuthAction.userLoaderHander(false));
        dispatch(
          AuthAction.userErrorHandler({
            error: false,
            message: ``,
          })
        );
        return {
          lengthOfFeature: jsonObj.total_results,
          lastPage: jsonObj.total_pages,
          list: jsonObj.results.map((r) => {
            return {
              title: r.original_title || r.name || null,
              id: r.id,
              seasonNumber: r.season_number || null,
              showId: r.show_id || null,
              episodeNumber: r.episode_number || null,
              imgSrc: r.poster_path || r.still_path || null,
              type: feature,
            };
          }),
          currentPage: jsonObj.page,
          type,
          feature,
        };
      };

      if (type === "fav") {
        const result = await fetchResult(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/${feature}?language=en-US&page=${page}&session_id=${session}&sort_by=created_at.asc`
        );
        dispatch(AuthAction.UpdateUserList(result));
      }
      if (type === "watchlist") {
        const result = await fetchResult(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/${feature}?language=en-US&page=${page}&session_id=${session}&sort_by=created_at.asc`
        );
        dispatch(AuthAction.UpdateUserList(result));
      }
      if (type === "rated") {
        if (feature === "episode") {
          const result = await fetchResult(
            `https://api.themoviedb.org/3/account/${accountId}/rated/tv/episodes?language=en-US&page=${page}&session_id=${session}&sort_by=created_at.asc`
          );

          dispatch(AuthAction.UpdateUserList(result));
        }
        if (feature === "tv" || feature === "movies") {
          const result = await fetchResult(
            `https://api.themoviedb.org/3/account/${accountId}/rated/${feature}?language=en-US&page=${page}&session_id=${session}&sort_by=created_at.asc`
          );
          dispatch(AuthAction.UpdateUserList(result));
        }
      }
    } catch (e) {
      dispatch(
        AuthAction.userErrorHandler({
          error: true,
          message: "Something Went Wrong",
        })
      );
      dispatch(AuthAction.userLoaderHander(false));
    }
  };
};
