import loaderImg from "../asset/icons8-loader-24.png";
import Wrapper from "./Wrapper";
const RootLoader = () => {
  return (
    <Wrapper
      bg={"bg-slate-800"}
      otherCss="flex min-h-[96vh] justify-center items-center"
    >
      <div className="animate-spin h-8 w-8">
        <img src={loaderImg} className="w-full h-full" alt="loader" />
      </div>
    </Wrapper>
  );
};
export default RootLoader;
