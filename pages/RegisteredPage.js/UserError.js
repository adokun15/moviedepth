import { Link } from "react-router-dom";

const UserErrorPage = () => {
  return (
    <>
      <h1>Could Not Find The page are LOOKING for</h1>

      <section className="text-center ">
        <Link to=".." className="text-yellow-500  underline">
          Go back
        </Link>
      </section>
    </>
  );
};
export default UserErrorPage;
