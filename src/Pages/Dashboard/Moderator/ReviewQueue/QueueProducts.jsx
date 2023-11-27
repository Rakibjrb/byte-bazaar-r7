import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";

const QueueProducts = ({ product, index }) => {
  const [accept, setAccept] = useState(false);
  const [featured, setFeatured] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { _id, name, time, status } = product;

  const handleAcceptOrReject = async (data) => {
    await axiosSecure.patch(`/acceptpending/${_id}`, data);
    data.status === "Rejected" && setAccept(true);
    data.status === "Approved" && setAccept(true);
    data.category === "featured" && setFeatured(true);
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
      <td>
        {status === "Pending" && (
          <button
            disabled={accept}
            onClick={() => handleAcceptOrReject({ status: "Approved" })}
            className="btn btn-sm hover:bg-green-500 bg-green-600 text-white uppercase"
          >
            Accept
          </button>
        )}
      </td>
      <th>
        <button
          disabled={featured}
          onClick={() => handleAcceptOrReject({ category: "featured" })}
          className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400"
        >
          Make Featured
        </button>
      </th>
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
          disabled={accept}
          onClick={() => handleAcceptOrReject({ status: "Rejected" })}
          className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800"
        >
          Reject
        </button>
      </th>
    </tr>
  );
};

QueueProducts.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  pendingRefetch: PropTypes.func,
};
export default QueueProducts;
