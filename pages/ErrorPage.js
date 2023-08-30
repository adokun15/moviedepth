import errImg from "../asset/icons8-error-24.png";
import Wrapper from "../helpers/Wrapper";

const ErrorPage = ({ message, reload }) => {
  return (
    <Wrapper otherCss="flex min-h-[85vh] justify-center bg-white">
      <div className="mt-14">
        <h1 className="lg:text-3xl text-xl  text-red-600 my-3">{message}</h1>
        <img className="h-8 m-auto w-8" src={errImg} alt="error" />
        <button
          className=" m-auto block my-6 py-1 px-7 bg-slate-800 transition-all text-white cursor-pointer border-none outline-none hover:bg-slate-900 rounded-xl"
          onClick={reload}
        >
          Try again
        </button>
      </div>
    </Wrapper>
  );
};
export default ErrorPage;
