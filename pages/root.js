import { useCallback, useEffect } from "react";
import { FetchHomeMovies } from "../store/apiThunks/MoviesApi";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import TopNav from "../Component/TopNav";
import SideBar from "../Component/Sidenav";
import AuthForm from "../Component/authComp/AuthForm";
import { getSession, getTokenDuration } from "../auth";
import { AuthAction, UserDetail } from "../store/Slices/authSlice";
import { Notifier } from "../store/Slices/notificationSlice";
import RatingModal from "../helpers/RatingModal";
import SideBarMobile from "../Component/SideBarMobile";

const RootJsx = () => {
  const dispatch = useDispatch();
  const token = useLoaderData();

  const { isOpened, message } = useSelector((S) => S.notify);
  const fetchAllMovies = useCallback(() => {
    dispatch(
      FetchHomeMovies([
        {
          api: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&year=2022&&vote_count.gte=10000&with_genres=action",
          type: "Action Filled and Adventure",
        },
        {
          api: "https://api.themoviedb.org/3/movie/popular?region=us,language=en-US&page=1",
          type: "Popular Movies",
        },
        {
          api: "https://api.themoviedb.org/3/movie/top_rated?region=us,language=en-US&page=1",
          type: "Top Rated Movies",
        },

        {
          api: "https://api.themoviedb.org/3/tv/on_the_air?region=us,language=en-US&page=3",
          type: "Series On Air ",
          movieType: "series",
        },
        {
          api: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=4",
          type: "Trending Movies",
        },
        {
          api: "https://api.themoviedb.org/3/movie/812225/recommendations?language=en-US&page=1",
          type: "Animation and Action",
        },
        {
          api: "https://api.themoviedb.org/3/movie/884605/recommendations?language=en-US&page=1",
          type: "Romance & Adventure mixed with a little Mystery",
        },
      ])
    );
  }, [dispatch]);
  const submit = useSubmit();
  const session = getSession();
  const { isLoggedIn } = useSelector((s) => s.auth);

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  useEffect(() => {
    if (isOpened) {
      setTimeout(() => {
        dispatch(Notifier({ isOpened: false, message: "" }));
      }, 4000);
    }

    if (!isLoggedIn) {
      dispatch(AuthAction.UpdateUser(null));
      dispatch(AuthAction.loginHandler(false));
    }

    if (session) {
      dispatch(AuthAction.createNewSession(session));
      dispatch(AuthAction.successHandler(true));
    } else {
      dispatch(AuthAction.successHandler(false));
    }

    if (!token) {
      //dispatch(AuthAction.loginHandler(false));
      return;
    }

    if (token && token !== "expired" && session) {
      dispatch(AuthAction.loginHandler(true));
      dispatch(UserDetail(session));
    }

    if (token === "expired") {
      dispatch(AuthAction.loginHandler(false));
      dispatch(
        Notifier({
          isOpened: true,
          message: "Account logged out due to Time Limit",
        })
      );
      dispatch(
        AuthAction.UpdateUser({
          username: null,
          id: null,
          country: null,
          userImg: null,
        })
      );
      dispatch(AuthAction.requestToken({ token: null }));
      dispatch(AuthAction.UpdateUserList(null));
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) return;
    setTimeout(() => {
      dispatch(AuthAction.loginHandler(false));
      dispatch(
        Notifier({
          isOpened: true,
          message: "Account logged out due to Time Limit",
        })
      );
      dispatch(
        AuthAction.UpdateUser({
          username: null,
          id: null,
          country: null,
          userImg: null,
        })
      );
      dispatch(AuthAction.requestToken({ token: null }));

      dispatch(AuthAction.UpdateUserList(null));
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [isLoggedIn, dispatch, isOpened, token, submit, session]);
  const ratingModal = useSelector((S) => S.rated);

  return (
    <>
      <main className="relative">
        <div className="relative max-h-[100vh] overflow-hidden">
          <TopNav />
          <SideBarMobile />
          <SideBar />
          <Outlet context={fetchAllMovies} />
        </div>
        <AuthForm />
      </main>
      {ratingModal.ratings.isOpened && <RatingModal />}
      {isOpened && (
        <div className="fixed text-black w-[100%] transition-all bottom-10 flex justify-center pb-1">
          <p className="lg:min-w-[15rem] text-center min-h-[2rem] bg-[#e9a20ddb] text-xl rounded-xl px-1 pl-4 ">
            {message}
          </p>
        </div>
      )}
    </>
  );
};
export default RootJsx;
/*    <div className="grid transition-all max-h-screen relative grid-cols-10 ">
      <TopNav />
      <SideBar />
      <Outlet context={fetchAllMovies} />
    </div>
 */
