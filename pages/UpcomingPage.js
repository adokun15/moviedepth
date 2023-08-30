import Pages from "../helpers/Pages";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../helpers/Wrapper";
import { FetchOtherData } from "../store/apiThunks/OtherApi";
import { useCallback, useEffect, useState } from "react";
import Rows from "../helpers/Rows";
import ErrorPage from "./ErrorPage";
import RootLoader from "../helpers/RootLoader";
import { OtherAction } from "../store/Slices/OtherSlice";

const Upcoming = () => {
  const [pageState, setPageState] = useState(1);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.other);

  const toggle = useSelector((state) => state.ui.toggle);
  const upcoming = useSelector((state) => state.other);

  const fetchedUpcomingMovies = useCallback(() => {
    dispatch(
      FetchOtherData({
        apiName: "upcoming",
        page: pageState,
        lastPage: +upcoming.lastPage,
      })
    );
  }, [dispatch, pageState, upcoming.lastPage]);
  useEffect(() => {
    fetchedUpcomingMovies();
  }, [fetchedUpcomingMovies]);

  const reload = () => {
    dispatch(OtherAction.loadingHandler(true));
    fetchedUpcomingMovies();
  };
  const upcomingHtml = (
    <Wrapper
      bg="bg-slate-700"
      otherCss={`max-h-screen col-span-9 grid ${
        toggle ? "col-span-7 " : "col-span-full"
      } overflow-scroll px-1 lg:max-h-[93.5vh] grid-rows-[repeat(12,1fr)] grid-cols-6 lg:col-span-9 flex row-start-9 `}
    >
      {" "}
      <div className="bg-slate-800  p-4 my-4 rounded-3xl first:mt-1 col-span-7">
        <h1 className="lg:text-5xl text-xl max-[600px]:text-center mb-3 capitalize text-white">
          Result for "Upcoming Movie"
        </h1>
        <Rows content={upcoming.data} />
        <Pages
          back={() => setPageState((p) => (p = p - 1))}
          front={() => setPageState((p) => (p = p + 1))}
          lastPage={+upcoming.lastPage}
          page={pageState}
          maxDisable={2}
        >
          {" "}
          {upcoming.page}{" "}
        </Pages>
      </div>
    </Wrapper>
  );

  return (
    <>
      {!isLoading && !error.error && upcomingHtml}
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage message={error.message} reload={reload} />
      )}
    </>
  );
};
export default Upcoming;
