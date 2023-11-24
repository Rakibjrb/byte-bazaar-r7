import PropTypes from "prop-types";
import { BiSolidUpvote } from "react-icons/bi";
import useVote from "../../Hooks/useVote";
import "./card.css";

const Card = ({ product }) => {
  const handleVote = useVote();
  const { img, name, tags, votes } = product;

  return (
    <div className="p-2 relative">
      <div className="effect overflow-hidden h-56 lg:h-40 ">
        <img className="image w-full h-full " src={img} alt={name} />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <div className="flex flex-wrap mt-3 mb-16">
          {tags?.map((tag) => (
            <p key={tag} className="text-[#7d7d7d] text-xl gap-4 mr-4">
              #{tag}
            </p>
          ))}
        </div>
        <div className="absolute w-full bottom-0 left-0 flex">
          <button
            onClick={handleVote}
            className="flex justify-center items-center rounded-lg py-2 w-full px-3 bg-red-600 text-white text-xl hover:bg-red-700 transition-all duration-300"
          >
            <BiSolidUpvote className="mr-2" /> {votes || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object,
};
export default Card;
