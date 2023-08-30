import { useSelector } from "react-redux";

const Wrapper = ({ children, bg, otherCss = "" }) => {
  const toggle = useSelector((state) => state.ui.toggle);

  return (
    <main
      className={` ${bg ? bg : "white"} ${otherCss} min-h-[83vh] max-h-[89vh] ${
        toggle ? "col-span-7" : "col-span-full"
      } lg:col-span-9  lg:pb-4 pb-9 overflow-scroll 
  `}
    >
      {children}
    </main>
  );
};
export default Wrapper;
