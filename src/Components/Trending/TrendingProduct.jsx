import PropTypes from "prop-types";
import { BiSolidUpvote } from "react-icons/bi";
import useVote from "../../Hooks/useVote";

const Trending = ({ product }) => {
  const handleVote = useVote();
  const { name, img, category, votes } = product;

  return (
    <div className="card shadow-xl">
      <figure>
        <img className="w-full h-56" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title mb-5">{name}</h2>
        <div className="card-actions justify-end">
          <button onClick={handleVote} className="badge badge-outline">
            <BiSolidUpvote /> {votes || 0}
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
