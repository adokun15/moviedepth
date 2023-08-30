import { secretToken } from "../../secretToken";
import { CastAction } from "../Slices/castSlice";
import { CastsAction } from "../Slices/castsSlice";
import { TimeOut } from "../TimeOut";

export const CastsData = (movieId) => {
  return async (dispatch) => {
    try {
      dispatch(CastsAction.loadingHandler(true));
      const fetchData = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretToken}`,
          },
        }
      );
      if (!fetchData.ok) {
        dispatch(CastAction.loaderHandler(false));
        dispatch(
          CastsAction.errorHandler({
            castserror: {
              error: true,
              message: "Could Not Load Casts",
            },
          })
        );
      }

      const data = await Promise.race([TimeOut(8), fetchData.json()]);
      dispatch(CastsAction.loadingHandler(false));

      const newData = data.cast.map((c) => {
        return {
          gender:
            c.gender === 2 ? "Male" : c.gender === 1 ? "Female" : "Unkwown",
          peopleId: c.id,
          castId: c.credit_id,
          character: c.character,
          imgSrc: c.profile_path,
          name: c.name,
          originalName: c.original_name,
        };
      });

      dispatch(CastsAction.addCast({ casts: newData, castserror: {} }));
    } catch (err) {
      dispatch(CastsAction.loadingHandler(false));

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
            CastsAction.errorHandler({
              castserror: {
                error: true,
                message: "Something went Wrong",
              },
            })
          );
    }
  };
};
