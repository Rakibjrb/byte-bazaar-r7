import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import useVote from "../../Hooks/useVote";
import { Link } from "react-router-dom";

const Trending = ({ product }) => {
  const handleVote = useVote();
  const { _id, name, img, category, votes } = product;

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
          <button onClick={handleVote} className="badge badge-outline">
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
};
export default Trending;
