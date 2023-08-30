import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../helpers/Wrapper";
import { useCallback, useEffect, useState } from "react";
import { FetchOtherData } from "../store/apiThunks/OtherApi";

import Pages from "../helpers/Pages";
import ErrorPage from "./ErrorPage";
import RootLoader from "../helpers/RootLoader";
import SeriesRows from "../helpers/SeriesRow";
import { OtherAction } from "../store/Slices/OtherSlice";
const PopularSeries = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.ui.toggle);
  const [pageState, setPageState] = useState(2);

  const popular = useSelector((state) => state.other);
  const { isLoading, error } = useSelector((state) => state.other);

  const fetchedData = useCallback(() => {
    dispatch(
      FetchOtherData({
        apiName: "popularSeries",
        page: pageState,
        lastPage: +popular.lastPage,
      })
    );
  }, [dispatch, pageState, popular.lastPage]);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const reload = () => {
    dispatch(OtherAction.loadingHandler(true));
    fetchedData();
  };
  const popularHTML = (
    <Wrapper
      bg="bg-slate-700 "
      otherCss={`max-h-screen col-span-9 grid ${
        toggle ? "col-span-7 " : "col-span-full"
      } overflow-scroll px-1 lg:max-h-[93.5vh] grid-rows-[repeat(12,1fr)] grid-cols-6 lg:col-span-9  flex row-span-9 `}
    >
      <div className="bg-slate-800  p-4 my-4 rounded-3xl first:mt-1 col-span-7">
        <h1 className="lg:text-5xl text-xl max-[600px]:text-center mb-3 capitalize text-white">
          Result for "Popular Series "
        </h1>
        <SeriesRows content={popular.data} />
        <Pages
          back={() => setPageState((p) => (p = p - 1))}
          front={() => setPageState((p) => (p = p + 1))}
          lastPage={+popular.lastPage}
          page={pageState}
          maxDisable={2}
        >
          {" "}
          {popular.page}{" "}
        </Pages>
      </div>
    </Wrapper>
  );
  return (
    <>
      {!isLoading && !error.error && popularHTML}
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage reload={reload} message={error.message} />
      )}
    </>
  );
};
export default PopularSeries;
