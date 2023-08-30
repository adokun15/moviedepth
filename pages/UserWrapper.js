import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FavouritesPage from "./RegisteredPage.js/FavouritesList";
import Wrapper from "../helpers/Wrapper";
import UserErrorPage from "./RegisteredPage.js/UserError";
import WatchListPage from "./RegisteredPage.js/WatchList";
import RatedPage from "./RegisteredPage.js/RatedPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserWrapper = () => {
  const [param] = useSearchParams();
  const { username } = useParams();
  const { user, isLoggedIn, isSuccess } = useSelector((s) => s.auth);
  const feature = param.get("feature");

  const html =
    feature === "fav--movies" ? (
      <FavouritesPage type="movies" />
    ) : feature === "fav--series" ? (
      <FavouritesPage type="series" />
    ) : feature === "watchlist--series" ? (
      <WatchListPage type="series" />
    ) : feature === "watchlist--movies" ? (
      <WatchListPage type="movies" />
    ) : feature === "rated--movies" ? (
      <RatedPage type="movies" />
    ) : feature === "rated--series" ? (
      <RatedPage type="series" />
    ) : feature === "rated--episode" ? (
      <RatedPage type="episode" />
    ) : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (username !== user.username || !isLoggedIn) {
      navigate("/");
    }
    if (username !== user.username && !isSuccess) {
      navigate("/");
    }
  }, [dispatch, isSuccess, isLoggedIn, user.username, username, navigate]);
  if (!html) return <UserErrorPage />;
  return (
    <Wrapper otherCss="bg-slate-600 min-h-[85.8vh]  px-4 overflow-scroll max-h-[94vh] pb-[10vh]">
      {html}
    </Wrapper>
  );
};
export default UserWrapper;
