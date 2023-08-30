import { Link } from "react-router-dom";
import SideBar from "../Component/Sidenav";
import Wrapper from "../helpers/Wrapper";
import back from "../asset/icons8-forward-24.png";

const ErrorNavPage = () => {
  return (
    <main className="block transition-all max-h-screen relative grid-cols-10 ">
      <SideBar />
      <Wrapper otherCss="flex justify-center">
        <div className="mt-9">
          <h1 className="capitalize lg:text-4xl text-xl mb-9">
            Could not find the page you are looking for!
          </h1>
          <Link
            className="underline italic text-yellow-500 font-medium cursor-pointer"
            to="/"
          >
            Go Home
            <img className="inline" src={back} alt="back home" />
          </Link>
        </div>
      </Wrapper>
    </main>
  );
};
export default ErrorNavPage;
