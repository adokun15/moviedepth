import backImg from "../asset/icons8-back-24 (1).png";
import frontImg from "../asset/icons8-forward-24.png";
const Pages = ({ children, back, front, page, lastPage, maxDisable = 2 }) => {
  return (
    <div className=" flex justify-center mt-3 mb-1">
      <button onClick={back} disabled={page <= maxDisable}>
        <img src={backImg} alt="" />
      </button>
      <b className="text-3xl text-yellow-700">{children}</b>
      <button onClick={front} disabled={page >= lastPage}>
        <img src={frontImg} alt="" />
      </button>
    </div>
  );
};
export default Pages;
