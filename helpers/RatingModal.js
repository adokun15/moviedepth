import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RatingAction } from "../store/Slices/RatingSlice";
import { ratingsPost } from "../store/Ratings";
import { Notifier } from "../store/Slices/notificationSlice";

const RatingModal = () => {
  const dispatch = useDispatch();
  const {
    mediaType,
    mediaId,
    ratingValue,
    mediaName,
    seasonNumber,
    episodeNumber,
  } = useSelector((s) => s.rated.ratings);
  const [rateState, setRate] = useState(ratingValue || 1);
  const { sessionId, isSuccess, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const updateRatingValue = () => {
    if (rateState > 10 || rateState < 1) return;
    if (!isLoggedIn) {
      dispatch(
        Notifier({ isOpened: true, message: "You are Not Loggged In Yet" })
      );
      dispatch(RatingAction.toggleModal(false));
      return;
    }
    if (!isSuccess) {
      dispatch(
        Notifier({ isOpened: true, message: "You dont have an Account" })
      );
      dispatch(RatingAction.toggleModal(false));
      return;
    }
    if (seasonNumber || episodeNumber) {
      dispatch(
        ratingsPost(
          { mediaType, mediaId, ratingValue: rateState },
          sessionId,
          seasonNumber,
          episodeNumber
        )
      );
      dispatch(RatingAction.toggleModal(false));
      return;
    }
    dispatch(
      ratingsPost({ mediaType, mediaId, ratingValue: rateState }, sessionId)
    );
    dispatch(RatingAction.toggleModal(false));
  };

  const deleteRatingValue = () => {
    if (!isLoggedIn) {
      dispatch(
        Notifier({ isOpened: true, message: "You are Not Loggged In Yet" })
      );
      dispatch(RatingAction.toggleModal(false));
      return;
    }
    if (!isSuccess) {
      dispatch(
        Notifier({ isOpened: true, message: "You dont have an Account" })
      );
      dispatch(RatingAction.toggleModal(false));
      return;
    }

    if (seasonNumber || episodeNumber) {
      dispatch(
        ratingsPost(
          { mediaType, mediaId, ratingValue: null, type: "delete" },
          sessionId,
          seasonNumber,
          episodeNumber
        )
      );

      dispatch(RatingAction.toggleModal(false));
      return;
    }
    dispatch(
      ratingsPost(
        { mediaType, mediaId, ratingValue: null, type: "delete" },
        sessionId
      )
    );

    dispatch(RatingAction.toggleModal(false));
  };

  const CloseModal = () => {
    dispatch(RatingAction.toggleModal(false));
  };
  const InputRef = useRef();
  const inputChange = () => {
    const inputval = InputRef.current;
    setRate(+inputval.value || 1);
  };

  return (
    <main className="z-30 fixed  px-5  py-4 flex justify-center bottom-0 w-full  bg-[rgba(0,0,0,0.9)] text-white min-h-[8rem]">
      <div>
        <h1 className="text-center text-2xl">Add Ratings </h1>
        <h1 className="text-center text-sm">{mediaName} </h1>
        <div className="mb-2 flex justify-center gap-4 items-center">
          <button
            onClick={() => {
              setRate((p) => p - 0.5);
            }}
            disabled={rateState <= 1.0}
            className="p-0 my-2 bg-yellow-600 px-3 font-medium text-xl"
          >
            {"<"}
          </button>
          <input
            className="font-medium text-center outline-none bg-none text-xl text-black"
            onChange={inputChange}
            ref={InputRef}
            type="number"
            max={10}
            min={1}
            maxLength={2}
            placeholder={
              rateState === 10 || rateState === 1
                ? rateState
                : rateState.toFixed(1)
            }
          />

          <button
            onClick={() => {
              setRate((p) => p + 0.5);
            }}
            disabled={rateState >= 10.0}
            className="p-0 my-2 bg-yellow-600 px-3 font-medium text-xl"
          >
            {">"}
          </button>
        </div>

        <div className="flex  justify-center gap-3 items-center">
          <button
            onClick={deleteRatingValue}
            className="rounded-xl outline-none hover:bg-red-900 px-7 bg-red-700"
          >
            Delete{" "}
          </button>
          <button onClick={CloseModal} className="mx-5 underline italic">
            close
          </button>
          <button
            className="rounded-xl outline-none px-7 bg-green-700 hover:bg-green-900"
            onClick={updateRatingValue}
          >
            OK
          </button>
        </div>
      </div>
    </main>
  );
};
export default RatingModal;
