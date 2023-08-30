import { Outlet } from "react-router-dom";
import Wrapper from "../helpers/Wrapper";
const SingleSerie = () => {
  const serieHtml = (
    <Wrapper
      bg="bg-slate-700"
      otherCss="relative lg:max-h-[85vh] h-[89vh] overflow-hidden"
    >
      <Outlet />
    </Wrapper>
  );

  return <>{serieHtml}</>;
};
export default SingleSerie;
