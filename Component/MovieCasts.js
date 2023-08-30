import { useCallback, useEffect } from "react";
import Columns from "../helpers/Columns";
import { useDispatch, useSelector } from "react-redux";
import { CastsData } from "../store/apiThunks/CastsApi";
import ErrorPage from "../pages/ErrorPage";

const Casts = ({ id, className }) => {
  const { casts, castserror, isLoading } = useSelector((state) => state.casts);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => dispatch(CastsData(id)), [id, dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={className}>
      {!castserror.error && isLoading && (
        <p className="text-yellow-500 text-center text-xl italic text-center">
          loading
        </p>
      )}
      {castserror.error && !isLoading && (
        <ErrorPage message={castserror.message} />
      )}
      {!castserror.error && !isLoading && (
        <div>
          <h2 className="text-3xl text-center text-white">Cast</h2>
          <Columns
            lists={casts}
            className="mx-8 my-4 bg-slate-700 text-white text-center text-2xl rounded-[1rem] hover:bg-slate-800"
          />
        </div>
      )}
    </div>
  );
};
export default Casts;
