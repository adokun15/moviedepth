import { secretToken } from "../secretToken";
import { RatingAction } from "./Slices/RatingSlice";
import { MovieAction } from "./Slices/movieSlice";
import { Notifier } from "./Slices/notificationSlice";
import { SerieAction } from "./Slices/tvSerieSlice";

export const ratingsPost = (
  { mediaType, mediaId, ratingValue, type = "" },
  session,
  seasonNumber,
  episodeNumber
) => {
  return async (dispatch) => {
    const Fetcher = (url, method) => {
      const Postoptions = {
        method: "post",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${secretToken}`,
        },
        body: JSON.stringify({ value: ratingValue }),
      };

      const Deleteoptions = {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${secretToken}`,
        },
      };
      return method === "post"
        ? fetch(url, Postoptions)
        : fetch(url, Deleteoptions);
    };

    const updateMovieRating = async () => {
      const url = `https://api.themoviedb.org/3/movie/${mediaId}/rating?session_id=${session}`;
      Fetcher(url, "post")
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) {
            dispatch(
              Notifier({ isOpened: true, message: "Unable To Rated Movie" })
            );
            return;
          }
          dispatch(MovieAction.UpdateMovieRatings({ value: ratingValue }));
        })
        .catch((err) => {
          dispatch(
            Notifier({ isOpened: true, message: "oops, something went Wrong" })
          );
        });
    };
    const deleteMovieRating = async () => {
      const url = `https://api.themoviedb.org/3/movie/${mediaId}/rating?session_id=${session}`;

      Fetcher(url, "delete")
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            dispatch(
              Notifier({
                isOpened: true,
                message: "Unable To Delete Movie Ratings",
              })
            );
            return;
          }
          dispatch(MovieAction.UpdateMovieRatings(false));
        })
        .catch(() =>
          dispatch(
            Notifier({ isOpened: true, message: "oops, something went Wrong" })
          )
        );
    };

    const updateSeriesRating = async () => {
      Fetcher(
        `https://api.themoviedb.org/3/tv/${mediaId}/rating?session_id=${session}`,
        "post"
      )
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) {
            dispatch(
              Notifier({ isOpened: true, message: "Unable To Rated Series" })
            );
            return;
          }
          dispatch(SerieAction.updateSeriesRatings({ value: ratingValue }));
        })
        .catch((err) => {
          dispatch(
            Notifier({ isOpened: true, message: "oops, something went Wrong" })
          );
        });
    };

    const deleteSeriesRating = async () => {
      Fetcher(
        `https://api.themoviedb.org/3/tv/${mediaId}/rating?session_id=${session}`,
        "delete"
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            dispatch(
              Notifier({
                isOpened: true,
                message: "Unable To Delete Series Ratings",
              })
            );
            return;
          }
          dispatch(SerieAction.updateSeriesRatings(false));
        })
        .catch(() =>
          dispatch(
            Notifier({ isOpened: true, message: "oops, something went Wrong" })
          )
        );
    };
    const updateEpisodeRating = async () => {
      const url = `https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?session_id=${session}`;
      Fetcher(url, "post")
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) {
            dispatch(
              Notifier({ isOpened: true, message: "Unable To Rated Episode" })
            );
            return;
          }
          dispatch(SerieAction.updateEpisodeRatings({ value: ratingValue }));
        })
        .catch((err) => {
          dispatch(
            Notifier({ isOpened: true, message: "oops, something went Wrong" })
          );
        });
    };

    const deleteEpisodeRating = async () => {
      const url = `https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?session_id=${session}`;
      Fetcher(url, "delete")
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            dispatch(
              Notifier({
                isOpened: true,
                message: "Unable To Delete episode Ratings",
              })
            );
            return;
          }
          dispatch(SerieAction.updateEpisodeRatings(false));
        })
        .catch(() =>
          dispatch(
            Notifier({ isOpened: true, message: "oops, something went Wrong" })
          )
        );
    };

    try {
      if (type === "delete" && mediaType === "tv") {
        await deleteSeriesRating();
      }

      if (type === "delete" && mediaType === "movie") {
        await deleteMovieRating();
      }

      if (type === "delete" && mediaType === "episode") {
        await deleteEpisodeRating();
      }

      if (mediaType === "tv" && type === "") {
        await updateSeriesRating();
      }

      if (mediaType === "movie" && type === "") {
        await updateMovieRating();
      }

      if (mediaType === "episode" && type === "") {
        await updateEpisodeRating();
      }
    } catch (err) {
      dispatch(Notifier({ isOpened: true, message: "Something went wrong" }));
      dispatch(RatingAction.toggleModal(false));
    }
  };
};
