import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import useVote from "../../Hooks/useVote";
import { Link } from "react-router-dom";
import { useState } from "react";

const Trending = ({ product, votedproduct }) => {
  const [disable, setDisable] = useState(false);
  const { _id, name, img, category, votes } = product;
  const { handleVote } = useVote(_id, votes);

  const alreadyvoted = votedproduct?.find((vote) => vote?.productId === _id);
  const votedtrue = alreadyvoted?.productId === _id;

  return (
    <div className="card shadow-xl">
      <figure>
        <img className="w-full h-56" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <Link to={`/product/${_id}`}>
          <h2 className="card-title mb-5 hover:underline">{name}</h2>
        </Link>
        <div className="card-actions justify-end">
          <button
            disabled={disable || votedtrue}
            onClick={() => {
              handleVote();
              setDisable(true);
            }}
            className={`badge badge-outline ${
              disable || votedtrue ? "bg-gray-500 text-white" : ""
            }`}
          >
            <MdHowToVote className="mr-1" /> {votes || 0}
          </button>
          <div className="badge badge-outline">Category : {category}</div>
        </div>
      </div>
    </div>
  );
};

Trending.propTypes = {
  product: PropTypes.object,
  votedproduct: PropTypes.array,
};
export default Trending;
