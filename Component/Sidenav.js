import { NavLink } from "react-router-dom";
const SideBar = () => {
  const list = (
    <>
      <NavLink
        to="/popular--movies"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm"
      >
        Popular movies
      </NavLink>
      <NavLink
        to="/toprated--movies"
        className="[&.active]:underline text-yellow-400  block text-center text-[0.5rem]  lg:text-sm "
      >
        Top-Rated movies
      </NavLink>
      <NavLink
        to="/upcoming"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm "
      >
        Upcoming movies
      </NavLink>
      <NavLink
        to="/films"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm "
        end
      >
        Films
      </NavLink>
      <NavLink
        to="/"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm "
        end
      >
        All
      </NavLink>
      <NavLink
        to="/series"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm "
        end
      >
        Series
      </NavLink>
      <NavLink
        to="/onAir"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm"
      >
        OnAir
      </NavLink>
      <NavLink
        to="/toprated--series"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm"
      >
        Top-Rated Series
      </NavLink>
      <NavLink
        to="/popular--series"
        className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm"
      >
        Popular Series
      </NavLink>
    </>
  );
  return (
    <>
      <nav
        style={{ minHeight: "2vh" }}
        className={` hidden bg-slate-800 px-6 lg:flex justify-between pb-4`}
      >
        {list}
      </nav>
      <nav
        style={{ minHeight: "2vh" }}
        className="lg:hidden  overflow-scroll  w-full  bg-slate-800 px-6 pb-4"
      >
        <div className=" flex  text-[0.7rem] w-[100%]">
          <NavLink
            to="/"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[6rem]  break-normal"
            end
          >
            All
          </NavLink>
          <NavLink
            to="/films"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
            end
          >
            Films
          </NavLink>
          <NavLink
            to="/series"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
            end
          >
            Series
          </NavLink>

          <NavLink
            to="/popular--movies"
            className="[&.active]:underline text-center  min-w-[9rem]  break-normal  text-yellow-400  block lg:text-sm "
          >
            Popular movies
          </NavLink>
          <NavLink
            to="/toprated--movies"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
          >
            Top-Rated movies
          </NavLink>
          <NavLink
            to="/upcoming"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
          >
            Upcoming movies
          </NavLink>
          <NavLink
            to="/onAir"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
          >
            OnAir
          </NavLink>
          <NavLink
            to="/toprated--series"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
          >
            Top-Rated Series
          </NavLink>
          <NavLink
            to="/popular--series"
            className="[&.active]:underline text-yellow-400  block text-center  lg:text-sm min-w-[9rem]  break-normal"
          >
            Popular Series
          </NavLink>
        </div>
      </nav>
    </>
  );
};
export default SideBar;
