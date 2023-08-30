import { accountId, secretToken, secretTokenKey } from "../secretToken";
import { MovieAction } from "./Slices/movieSlice";
import { Notifier } from "./Slices/notificationSlice";
import { SerieAction } from "./Slices/tvSerieSlice";

export const WatchListFavoriteHandler = (id, session, type = {}) => {
  return async (dispatch) => {
    const AddFavorite = async (bool) => {
      const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${session}&api_key=${secretTokenKey}`;

      const option = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
        body: JSON.stringify({
          media_type: type.media,
          media_id: id,
          favorite: !bool,
        }),
      };
      fetch(url, option)
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            dispatch(
              Notifier({
                isOpened: true,
                message: "An Error Occured. Could not add to Favorites!",
              })
            );
            return;
          }

          type.media === "tv"
            ? dispatch(SerieAction.updateFavorite(!bool))
            : dispatch(MovieAction.updateFavouriteMovie(!bool));

          if (!bool) {
            dispatch(
              Notifier({
                isOpened: true,
                message: `${
                  type.media === "tv" ? "Series" : "Movie"
                } added to Favourites List`,
              })
            );
          } else {
            dispatch(
              Notifier({
                isOpened: true,
                message: `${
                  type.media === "tv" ? "Series" : "Movie"
                } removed from Favourites List`,
              })
            );
          }
        });
    };

    const AddWatchList = async (bool) => {
      const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${session}&api_key=${secretTokenKey}`;

      const option = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
        body: JSON.stringify({
          media_type: type.media,
          media_id: id,
          watchlist: !bool,
        }),
      };
      fetch(url, option)
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            dispatch(
              Notifier({
                isOpened: true,
                message: "An Error Occured. Could not add to WatchList!",
              })
            );
            return;
          }
          type.media === "tv"
            ? dispatch(SerieAction.updateWatchList(!bool))
            : dispatch(MovieAction.updateWatchListMovie(!bool));
          if (!bool) {
            dispatch(
              Notifier({
                isOpened: true,
                message: `${
                  type.media === "tv" ? "Series" : "Movie"
                } added to WatchList`,
              })
            );
          } else {
            dispatch(
              Notifier({
                isOpened: true,
                message: `${
                  type.media === "tv" ? "Series" : "Movie"
                }removed from WatchList`,
              })
            );
          }
        });
    };

    try {
      if (type.name === "movieFavorite") {
        await AddFavorite(type.bool);
        return;
      }
      if (type.name === "movieWatchList") {
        await AddWatchList(type.bool);
        return;
      }
      if (type.name === "tvFavorite") {
        await AddFavorite(type.bool);
        return;
      }
      if (type.name === "tvWatchList") {
        await AddWatchList(type.bool);
        return;
      }
    } catch (e) {
      dispatch(
        Notifier({
          isOpened: true,
          message: "An Error Occured. ",
        })
      );
    }
  };
};
