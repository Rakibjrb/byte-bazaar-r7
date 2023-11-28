import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Reported = ({ product, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, name, time } = product;

  const handleDeleteReported = async () => {
    const res = await axiosSecure.delete(`/delete-reported-product/${_id}`);
    res.data.deletedCount > 0 && Swal.fire("Product successfully deleted");
    refetch();
  };

  return (
    <tr>
      <th className="text-xl">{index + 1}.</th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{time}</div>
          </div>
        </div>
      </td>
      <th>
        <Link
          to={`/product/${_id}`}
          className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400"
        >
          View Details
        </Link>
      </th>
      <th>
        <button
          onClick={handleDeleteReported}
          className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800"
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

Reported.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.func,
};
export default Reported;
