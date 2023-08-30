import { smallImg } from "../ImageLink.js";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/UI";

import user from "../asset/icons8-user-24.png";
import down from "../asset/icons8-expand-arrow-24.png";
import left from "../asset/icons8-back-24 (1).png";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import { useRef, useState } from "react";
import { FetchSearchedItem } from "../store/apiThunks/SearchApi";

import { AuthAction } from "../store/Slices/authSlice";
import { Notifier } from "../store/Slices/notificationSlice";
import { useCallback } from "react";
const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryRef = useRef();

  const { currentpage, lastPage } = useSelector((s) => s.searched.list);

  const { username, userImg } = useSelector((s) => s.auth.user);

  const searchhandler = (e) => {
    e.preventDefault();
    let result = queryRef.current;
    if (result.value === "") return;
    navigate("/search");

    dispatch(
      FetchSearchedItem({
        query: result.value,
        type: "multi",
        page: currentpage,
        lastPage: lastPage,
      })
    );
    //set Query Here For  Other DropDown
    result.value = "";
  };
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle((p) => !p);
  };
  const { isLoggedIn, isSuccess, tempToken } = useSelector((s) => s.auth);

  const submit = useSubmit();
  const logoutHandler = useCallback(() => {
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
  return (
    <nav
      className="
      
    lg:gap-4 lg:px-6 px-2 gap-2.5 col-span-full flex  bg-slate-800 text-yellow-600 items-center py-3 
     top-0 justify-between 
    "
      style={{ maxHeight: "10vh" }}
    >
      <div className="flex gap-2">
        <button
          className="lg:hidden block"
          onClick={() => {
            dispatch(uiActions.togglePhone(true));
          }}
        >
          ☰
        </button>
        <h1 className="lg:text-xl text-[1rem]">MovieDepth</h1>
      </div>
      <form
        onSubmit={searchhandler}
        className="lg:block lg:w-3/5 w-full text-[0.8rem]"
      >
        <input
          placeholder="Enter Movie/Serie name"
          ref={queryRef}
          className="w-3/4 rounded-tl-2xl rounded-bl-2xl outline-none p-1.5 bg-slate-300 text-black"
        />
        <button className="w-1/4 text-white p-1.5 rounded-tr-2xl rounded-br-2xl  bg-yellow-600 ">
          Search
        </button>
      </form>
      <div className="lg:flex hidden">
        {(!isLoggedIn || !tempToken) && (
          <button
            className="flex"
            onClick={() => {
              dispatch(uiActions.toggleAuthHandler(true));
            }}
          >
            {toggle ? (
              <img src={left} alt="login" />
            ) : (
              <img src={down} alt="login" />
            )}
            <div className=" mx-3 w-7 h-7 rounded-[50%] overflow-hidden">
              {tempToken && (
                <img
                  src={userImg ? smallImg(userImg) : user}
                  alt="login"
                  className="w-full h-full"
                />
              )}
              {!tempToken && (
                <img src={user} alt="login" className="w-full h-full" />
              )}
            </div>
          </button>
        )}

        {isLoggedIn && tempToken && isSuccess && (
          <button className="flex" onClick={toggleHandler}>
            {toggle ? (
              <img src={left} alt="login" />
            ) : (
              <img src={down} alt="login" />
            )}
            <div className=" mx-3 w-7 h-7 rounded-[50%] overflow-hidden">
              <img
                src={userImg ? smallImg(userImg) : user}
                alt="login"
                className="w-full h-full"
              />
            </div>
          </button>
        )}
        {isLoggedIn && tempToken && <p>{username}</p>}
      </div>
      {toggle && isLoggedIn && tempToken && (
        <>
          <div className="z-90 absolute pb-3  rounded-sm  pb-0 pl-0 overflow-hidden right-[0] min-w-[5rem] top-[5.7rem] min-h-[7rem]  bg-white lg:block hidden">
            <div className="pr-5">
              <h1 className="text-gray-700 font-bold text-xl pl-4 mb-1">
                <h1>Film</h1>
              </h1>
              <Link
                to={`/info/${username}?feature=fav--movies`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Favourites
              </Link>
              <Link
                to={`/info/${username}?feature=rated--movies`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Movies you Liked
              </Link>
              <Link
                to={`/info/${username}?feature=watchlist--movies`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Your WatchList
              </Link>
            </div>

            <div className="pr-5">
              <h1 className="text-gray-700 font-bold text-xl pl-4 mb-1">
                Series
              </h1>
              <Link
                to={`/info/${username}?feature=fav--series`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Favourites
              </Link>
              <Link
                to={`/info/${username}?feature=watchlist--series`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Your WatchList
              </Link>
              <Link
                to={`/info/${username}?feature=rated--series`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Series you liked
              </Link>
            </div>

            <div className="pr-5">
              <h1 className="text-gray-700 font-bold text-xl pl-4 mb-1">
                Series Episode
              </h1>
              <Link
                to={`/info/${username}?feature=rated--episode`}
                className="block text-[1.1rem] ml-6 mb-1  text-gray-900 hover:underline italic"
                onClick={toggleHandler}
              >
                Episode you liked
              </Link>
            </div>

            <button
              onClick={logoutHandler}
              className="bg-slate-700 mt-4 w-[100%]  block  text-[1.1rem]  hover:bg-slate-900  text-white  font-medium"
            >
              logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};
export default TopNav;
