import { Link } from "react-router-dom";

const Columns = ({ lists, className }) => {
  return (
    <ul>
      {lists &&
        lists.length >= 1 &&
        lists.map((list) => (
          <li key={list.id} className={className}>
            <Link to={`${list.castId}/cast`}>{list.name}</Link>
          </li>
        ))}
      {!lists ||
        (lists.length === 0 && (
          <p className="text-center mt-7 text-yellow-500">No Casts Available</p>
        ))}
    </ul>
  );
};
export default Columns;
