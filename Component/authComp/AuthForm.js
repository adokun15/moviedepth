import { useDispatch, useSelector } from "react-redux";
import { AuthAction, AuthActionThunk } from "../../store/Slices/authSlice";
import { useEffect, useRef } from "react";
import { uiActions } from "../../store/UI";
import { getSession } from "../../auth";
import { Notifier } from "../../store/Slices/notificationSlice";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const BackDrop = ({ children }) => {
  return (
    <main className="bg-[rgba(0,0,0,0.6)] overflow-scroll h-[100vh] top-0 w-full z-40 absolute ">
      {children}
    </main>
  );
};
const AuthForm = () => {
  const nameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  //  const [isAuthorized, setAuthorized] = useState(null);

  const Session = getSession();

  const { tempToken, isSuccess, sessionId, errBody } = useSelector(
    (s) => s.auth
  );
  useEffect(() => {
    if (!Session) {
      dispatch(AuthAction.successHandler(false));
    } else {
      dispatch(AuthAction.successHandler(true));
      //dispatch action for user
    }
  }, [Session, dispatch]);

  const requestToken = () => {
    dispatch(AuthActionThunk("requestToken"));
  };

  /* 
  const getSessionId = useCallback(() => {
    if (!isLoggedIn) return;
    dispatch(AuthActionThunk("session", tempToken));
  }, [isLoggedIn, dispatch, tempToken]);
*/

  const [tok] = useSearchParams();
  const request = tok.get("request_token");
  const appproved = tok.get("approved");
  const denied = tok.get("denied");
  const getSessionId = useCallback(() => {
    dispatch(AuthActionThunk("session", request));
  }, [dispatch, request]);

  useEffect(() => {
    if (!request) return;

    dispatch(uiActions.toggleAuthHandler(true));
  }, [request, dispatch]);

  const ValidateRequest = (e) => {
    e.preventDefault();

    dispatch(
      AuthActionThunk(
        "loginValidation",
        tempToken,
        {
          username: nameRef.current.value,
          password: passwordRef.current.value,
        },
        sessionId
      )
    );
  };
  const { toggleAuth } = useSelector((s) => s.ui);

  const RemoveAccountHandler = () => {
    localStorage.clear();
    dispatch(AuthAction.loginHandler(false));
    dispatch(AuthAction.successHandler(null));
    dispatch(AuthAction.createNewSession(null));
    dispatch(AuthAction.requestToken({ token: null }));
    dispatch(uiActions.toggleAuthHandler(false));
    dispatch(
      AuthAction.UpdateUser({
        username: "",
        id: "",
        country: "",
        userImg: null,
      })
    );
    dispatch(
      AuthAction.UpdateUserList({
        favouritesMovies: [],
        favouriteTv: [],
        watchListTv: [],
        watchListMovie: [],
        ratedMovies: [],
        ratedTvEpisode: [],
        ratedTv: [],
      })
    );
    dispatch(
      Notifier({ isOpened: true, message: "Account Successfully Removed" })
    );
  };
  return (
    <>
      {toggleAuth && (
        <BackDrop>
          <div className="text-white z-30 bg-slate-800  m-auto lg:mt-8 mt-14 min-h-[40vh] lg:w-3/5 w-[90%] px-5 rounded-xl py-4 ">
            <h1 className="lg:text-4xl text-2xl text-center">MovieDepth</h1>
            {!isSuccess && (
              <>
                <div className="text-center">
                  <i className="block text-2xl italic my-2">
                    {" "}
                    To Login or To Create an Account on MovieDepth
                  </i>
                  Please Note that MovieDepth gets Movies, Series and Any <br />
                  Other Data displayed from a <b>Third Party Source(TMDB).</b>
                  <br />{" "}
                  <i className="my-4 block">
                    * In order to activate different Functionality *
                  </i>
                  Create an Account/ Login to your Account on <b>TMDB</b>
                  <br />
                  You will enable Features like:
                  <ul>
                    <li> Add Favourite movie/Series</li>
                    <li> Add movie/Series to WatchList</li>
                    <li> Rate movies/series</li>
                    <li>.etc.</li>
                  </ul>
                  <i className="block mt-3">
                    After clicking the Button, you will be redirected to TMDB
                  </i>
                  <i className="block">
                    Create an Account/ Login (If you already own an account),
                    then
                  </i>
                  <i className="block">
                    You be redirected to <b>MovieDepth</b> to Authorize access
                  </i>
                  <div className=" flex gap-4 justify-center mt-6">
                    {(!request || denied) && (
                      <button
                        onClick={requestToken}
                        className="transition-all bg-yellow-600 px-5 py-2 text-[1.2rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                      >
                        Visit TMDB
                      </button>
                    )}
                    {request && appproved && (
                      <>
                        <button
                          onClick={getSessionId}
                          className="transition-all bg-yellow-600 px-5 py-2 text-[1.2rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                        >
                          Authorize Access
                        </button>
                      </>
                    )}

                    <button
                      onClick={() =>
                        dispatch(uiActions.toggleAuthHandler(false))
                      }
                      className="transition-all bg-yellow-600 px-3 py-1 text-[1.2rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}

            {isSuccess && (
              <div className="m-auto w-full ">
                <h1 className="lg:text-xl text-sm mt-2 ">
                  Login to your Account
                </h1>
                <p className="text-red-500 block text-xl italic text-center my-2">
                  {errBody.error ? errBody.message : ""}
                </p>
                <form className="lg:w-4/5 w-[100%] min-h-[8rem] m-auto ">
                  <input
                    ref={nameRef}
                    className="block text-black m-auto w-full outline-none px-3 py-2 rounded-xl text-xl font-medium mb-4"
                    placeholder="Enter Tmdb UserName"
                  />
                  <input
                    ref={passwordRef}
                    className="block text-black  m-auto w-full outline-none px-3 py-2 rounded-xl text-xl font-medium "
                    placeholder="Enter Tmdb password"
                  />
                  <button
                    className="w-2/5 my-4 m-auto block bg-yellow-600 text-xl font-medium rounded-xl"
                    onClick={ValidateRequest}
                  >
                    submit
                  </button>
                </form>
                <div className="flex justify-between">
                  <div className="block">
                    <button
                      onClick={RemoveAccountHandler}
                      className="transition-all lg:block hidden underline italic px-3 py-1 text-[1.2rem] font-medium hover:text-yellow-700 rounded-[0.5rem]"
                    >
                      Disconnent Account
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(uiActions.toggleAuthHandler(false))}
                    className="transition-all bg-yellow-600 px-3 py-1 text-[1.2rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </BackDrop>
      )}
    </>
  );
};
export default AuthForm;
