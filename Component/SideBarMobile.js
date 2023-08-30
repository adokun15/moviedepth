import { useDispatch, useSelector } from "react-redux";
import { smallImg } from "../ImageLink";
import user from "../asset/icons8-user-24.png";
import { Link, useSubmit } from "react-router-dom";
import { uiActions } from "../store/UI";
import { AuthAction } from "../store/Slices/authSlice";
import { Notifier } from "../store/Slices/notificationSlice";
import { useCallback } from "react";

const SideBarMobile = () => {
  const { togglePhoneModal } = useSelector((s) => s.ui);
  const { username, userImg, country } = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const { isLoggedIn, isSuccess, tempToken } = useSelector((s) => s.auth);

  const toggleHandler = () => {
    dispatch(uiActions.togglePhone(false));
  };
  const submit = useSubmit();
  const logoutHandler = useCallback(() => {
    dispatch(uiActions.togglePhone(false));
    dispatch(
      Notifier({
        isOpened: true,
        message: "Logged out Successfully",
      })
    );

    dispatch(AuthAction.loginHandler(false));
    dispatch(AuthAction.UpdateUser(null));
    dispatch(AuthAction.UpdateUserList(null));
    dispatch(AuthAction.requestToken({ token: null }));

    submit(null, { action: "/logout", method: "post" });
  }, [submit, dispatch]);

  const RemoveAccountHandler = () => {
    localStorage.clear();
    dispatch(uiActions.togglePhone(false));
    dispatch(AuthAction.loginHandler(false));
    dispatch(AuthAction.successHandler(null));
    dispatch(AuthAction.createNewSession(null));
    dispatch(AuthAction.requestToken({ token: null }));
    dispatch(uiActions.toggleAuthHandler(false));
    dispatch(AuthAction.UpdateUser(null));
    dispatch(AuthAction.UpdateUserList(null));
    dispatch(
      Notifier({ isOpened: true, message: "Account Successfully Removed" })
    );
  };
  return (
    <>
      {togglePhoneModal && (
        <main className="block lg:hidden bg-slate-700 w-[34vh] top-0 h-[100vh]  absolute z-30">
          <div className=" items-center min-h-[5rem] border-b-4 border-solid">
            {isLoggedIn && tempToken && isSuccess && (
              <div>
                <div className="mt-3 w-12 h-12 m-auto rounded-[50%] overflow-hidden">
                  <img
                    src={userImg ? smallImg(userImg) : user}
                    alt="login"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-medium text-center">
                    {username}
                  </h1>
                  <p className="text-white text-center">
                    {country && `country:${country}`}
                  </p>
                </div>
              </div>
            )}
            {(!isLoggedIn || !tempToken) && isSuccess && (
              <h1 className="pt-5 text-center text-yellow-500 text-xl">
                MovieDepth
              </h1>
            )}
          </div>
          {isLoggedIn && tempToken && isSuccess && (
            <div>
              <h1 className="my-4 underline text-2xl  text-yellow-600">
                Account
              </h1>

              <div className="pr-5">
                <h1 className="text-yellow-600  text-xl pl-4 mb-1">Film</h1>
                <Link
                  to={`/info/${username}?feature=fav--movies`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white  hover:underline italic"
                  onClick={toggleHandler}
                >
                  Favourites
                </Link>
                <Link
                  to={`/info/${username}?feature=rated--movies`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white  hover:underline italic"
                  onClick={toggleHandler}
                >
                  Movies you Liked
                </Link>
                <Link
                  to={`/info/${username}?feature=watchlist--movies`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white  hover:underline italic"
                  onClick={toggleHandler}
                >
                  Your WatchList
                </Link>
              </div>

              <div className="pr-5">
                <h1 className="text-yellow-600  text-xl pl-4 mb-1">Series</h1>
                <Link
                  to={`/info/${username}?feature=fav--series`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white  hover:underline italic"
                  onClick={toggleHandler}
                >
                  Favourites
                </Link>
                <Link
                  to={`/info/${username}?feature=watchlist--series`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white  hover:underline italic"
                  onClick={toggleHandler}
                >
                  Your WatchList
                </Link>
                <Link
                  to={`/info/${username}?feature=rated--series`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white  hover:underline italic"
                  onClick={toggleHandler}
                >
                  Series you liked
                </Link>
              </div>

              <div className="pr-5">
                <h1 className="text-yellow-600  text-xl pl-4 mb-1">
                  Series Episode
                </h1>
                <Link
                  to={`/info/${username}?feature=rated--episode`}
                  className="block text-[1.1rem] ml-6 mb-1  text-white hover:underline italic"
                  onClick={toggleHandler}
                >
                  Episode you liked
                </Link>
              </div>

              <button
                onClick={logoutHandler}
                className="bg-yellow-700 mt-4 m-auto py-1 rounded-[0.8rem] px-6 min-w-[3rem] block  text-[1.1rem]  hover:bg-yellow-900  text-white  font-medium"
              >
                logout
              </button>
            </div>
          )}
          <div>
            {(!isLoggedIn || tempToken) && !isSuccess && (
              <>
                <h1 className="my-4 text-2xl  text-yellow-600">Account</h1>

                <button
                  className="transition-all m-auto lg:hidden block bg-yellow-600 px-3 py-1 text-[1.2rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                  onClick={() => {
                    dispatch(uiActions.togglePhone(false));
                    dispatch(uiActions.toggleAuthHandler(true));
                  }}
                >
                  Create an Account
                </button>
              </>
            )}
            {(!isLoggedIn || !tempToken) && isSuccess && (
              <>
                <h1 className="my-4 text-2xl  text-yellow-600">Account</h1>
                <button
                  className="transition-all m-auto lg:hidden block bg-yellow-600 px-3 py-1 text-[1rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                  onClick={() => {
                    dispatch(uiActions.togglePhone(false));
                    dispatch(uiActions.toggleAuthHandler(true));
                  }}
                >
                  Login
                </button>
                <p className="text-white text-center my-4">or</p>
                <button
                  onClick={RemoveAccountHandler}
                  className="transition-all m-auto lg:hidden block bg-yellow-600 px-3 py-1 text-[0.9rem] font-medium hover:bg-yellow-700 rounded-[0.5rem]"
                >
                  Disconnent Account
                </button>
              </>
            )}

            <button
              className="absolute left-[100%] text-4xl top-[45%] bg-yellow-500 ml-4 w-11 h-11 overflow-hidden rounded-[53%]"
              onClick={toggleHandler}
            >
              x
            </button>
          </div>
        </main>
      )}
    </>
  );
};
export default SideBarMobile;
