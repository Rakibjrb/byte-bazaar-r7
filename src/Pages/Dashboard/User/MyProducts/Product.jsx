import PropTypes from "prop-types";

const Product = ({ product, index }) => {
  const { name, time, votes, status } = product;

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
      <td className="font-semibold">{votes}+</td>
      <td>
        {status === "Approved" && (
          <div className="btn btn-sm hover:bg-green-700 bg-green-500 text-white uppercase">
            {status}
          </div>
        )}
        {status === "Rejected" && (
          <div className="btn btn-sm hover:bg-yellow-500 bg-yellow-500 text-white uppercase">
            {status}
          </div>
        )}
        {status === "Pending" && (
          <div className="btn btn-sm hover:bg-red-500 bg-red-500 text-white uppercase">
            {status}
          </div>
        )}
      </td>
      <th>
        <button className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400">
          Update
        </button>
      </th>
      <th>
        <button className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800">
          Delete
        </button>
      </th>
    </tr>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
};
export default Product;
