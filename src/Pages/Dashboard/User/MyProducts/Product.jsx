import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Product = ({ product, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, name, time, votes, status } = product;

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/product/${id}`)
          .then((res) => {
            res.data && refetch();
            Swal.fire("Delete!");
          })
          .catch((err) => err && toast.error("something went wrong"));
      }
    });
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
        <button
          onClick={() => handleDeleteProduct(_id)}
          className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800"
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.func,
};
export default Product;
