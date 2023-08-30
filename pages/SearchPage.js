import { useDispatch, useSelector } from "react-redux";
import Pages from "../helpers/Pages";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useEffect, useState } from "react";
import { FetchSearchedItem } from "../store/apiThunks/SearchApi";
import { Link } from "react-router-dom";
import Image from "../helpers/Image";
import RootLoader from "../helpers/RootLoader";
import ErrorPage from "./ErrorPage";
import { SearchAction } from "../store/Slices/searchedItemSlice";

const SearchPage = () => {
  const options = ["all", "series", "movies"];
  const defaultOption = options[0];
  const [filter, setfilter] = useState("");

  const [page, setPageState] = useState(1);
  const dispatch = useDispatch();

  const { list, query, currentpage, lastPage } = useSelector(
    (s) => s.searched.list
  );
  const { error, isLoading } = useSelector((s) => s.searched);

  useEffect(() => {
    if (!query) return;

    if (filter === "all") {
      dispatch(FetchSearchedItem({ query, type: "multi", page }));
    }
    if (filter === "series") {
      dispatch(FetchSearchedItem({ query, type: "series", page }));
    }
    if (filter === "movies") {
      dispatch(FetchSearchedItem({ query, type: "movies", page }));
    }
  }, [filter, query, dispatch, page]);

  const searchWrapper = (
    <main className="bg-slate-700 min-h-[94vh] px-4 overflow-scroll max-h-[94vh] pb-[10vh]">
      <div className=" text-white flex justify-between px-10 bg-slate-800 my-2 min-h-[3rem] items-center rounded-xl">
        <h2 className="lg:text-2xl text-[1rem] capitalize font-medium">
          {query && `Result for "${query}"`}
        </h2>
        {query && (
          <Dropdown
            options={options}
            onChange={(val) => {
              setfilter(val.value);
            }}
            arrowClosed={<span className="text-yellow-900 text-3xl" />}
            arrowOpen={<span className="text-yellow-900 text-3xl" />}
            value={defaultOption}
            className="bg-red z-0 text-[0.8rem] w-fit  font-medium relative"
            placeholder="Select an option"
          />
        )}
      </div>
      <div className="bg-slate-800 h-fit rounded-xl">
        <main className="py-2">
          <div className="grid  lg:grid-cols-5 grid-cols-2  grid-rows-1 gap-3 px-4 ">
            {query !== "" &&
              list.length >= 1 &&
              list.map((movie) => (
                <div key={movie.id} className="max-h-70 overflow-hidden">
                  <Link to={`/${movie.type}/${movie.id}`}>
                    <Image imgSrc={movie.imgSrc} height={70} />
                    {
                      <h2 className="text-center text-1 font-medium  text-white">
                        {movie.title}
                      </h2>
                    }
                  </Link>
                </div>
              ))}
          </div>
          <div className="px-4 ">
            {query.length >= 1 && list.length === 0 && (
              <h1 className="text-white my-4 grid-flow-col text-3xl text-center">{`NO result for ${query}`}</h1>
            )}
            {query === "" && list.length === 0 && (
              <h1 className="text-white grid-cols- my-4 text-3xl text-center">
                Search for Movies/series
              </h1>
            )}
          </div>
        </main>
        {list.length !== 0 && query && lastPage !== page && (
          <Pages
            back={() => {
              setPageState((p) => (p = p - 1));
              if (page !== 1) {
                dispatch(
                  FetchSearchedItem({
                    query,
                    type: "multi",
                    page: page - 1,
                    lastPage,
                  })
                );
              }
            }}
            front={() => {
              setPageState((p) => (p = p + 1));
              dispatch(
                FetchSearchedItem({
                  query,
                  type: "multi",
                  page: page + 1,
                  lastPage,
                })
              );
            }}
            lastPage={+lastPage}
            page={page}
            maxDisable={1}
          >
            {currentpage}
          </Pages>
        )}
      </div>
    </main>
  );
  return (
    <>
      {isLoading && !error.error && <RootLoader />}
      {!isLoading && error.error && (
        <ErrorPage
          message={error.message}
          reload={() => {
            dispatch(SearchAction.loaderHandler(true));
            dispatch(
              FetchSearchedItem({
                query,
                type: "multi",
                page,
                lastPage,
              })
            );
            dispatch(SearchAction.loaderHandler(false));
          }}
        />
      )}
      {!isLoading && !error.error && searchWrapper}
    </>
  );
};
export default SearchPage;
