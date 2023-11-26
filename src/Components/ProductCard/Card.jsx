import PropTypes from "prop-types";
import { useState } from "react";
import { MdHowToVote } from "react-icons/md";
import useVote from "../../Hooks/useVote";
import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ product, votedproduct }) => {
  const [disable, setDisable] = useState(false);
  const { _id, img, name, tags, votes, time } = product;
  const { handleVote } = useVote(_id, votes);

  const alreadyvoted = votedproduct?.find((vote) => vote?.productId === _id);
  const votedtrue = alreadyvoted?.productId === _id;

  return (
    <div className="pb-2 relative">
      <div className="effect overflow-hidden h-56 lg:h-40 ">
        <img className="image w-full h-full " src={img} alt={name} />
      </div>
      <div className="mt-4">
        <Link to={`/product/${_id}`}>
          <h3 className="text-2xl font-semibold hover:underline">{name}</h3>
        </Link>
        <p className="mt-2">Date : {time}</p>
        <div className="flex flex-wrap mt-3 mb-16">
          {tags?.map((tag) => (
            <p key={tag} className="text-[#7d7d7d] text-xl gap-4 mr-4">
              #{tag}
            </p>
          ))}
        </div>
        <div className="absolute w-full bottom-0 left-0 flex">
          <button
            disabled={disable || votedtrue}
            onClick={() => {
              handleVote();
              setDisable(true);
            }}
            className={`flex justify-center items-center rounded-lg py-2 w-full px-3 ${
              disable || votedtrue ? "bg-gray-400" : "bg-red-400"
            } text-white text-xl hover:bg-red-700 transition-all duration-300`}
          >
            <MdHowToVote className="mr-2 text-2xl" /> {votes || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object,
  votedproduct: PropTypes.array,
};
export default Card;
