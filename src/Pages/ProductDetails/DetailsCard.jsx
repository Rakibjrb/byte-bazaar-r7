import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import useVote from "../../Hooks/useVote";

const DetailsCard = ({ product }) => {
  const handleVote = useVote();

  const { name, owner, img, description, tags, votes, time } = product;

  return (
    <div>
      <div className="flex justify-between bg-red-700 py-4 px-3 md:px-6 items-center">
        <div className="flex items-center gap-4 text-white">
          <img
            className="w-12 h-12 rounded-full"
            src={owner?.image || "https://i.ibb.co/5x441PC/user.png"}
            alt={owner?.name || "user19419"}
          />
          <div>
            <h4>Name : {owner?.name || "user19419"}</h4>
            <h4>Date : {time || "0-0-0"}</h4>
          </div>
        </div>
        <IoShareSocial className="text-3xl hover:cursor-pointer text-white" />
      </div>
      <div className="pb-2 relative">
        <div className="effect overflow-hidden h-56 lg:h-[400px] ">
          <img
            className="image w-full h-full "
            src={img || ""}
            alt={name || ""}
          />
        </div>
        <div className="mt-4">
          <p className="mt-3 text-justify">
            <span className="font-bold text-xl">Read Details : </span>
            {description || "no details"}
          </p>
          <h3 className="mt-2 font-semibold">Total Voted : {votes || 0}</h3>
          <div className="flex flex-wrap mt-3 mb-16">
            {tags?.map((tag) => (
              <p key={tag} className="text-[#7d7d7d] text-xl gap-4 mr-4">
                #{tag}
              </p>
            ))}
          </div>
          <div className="absolute w-full bottom-0 left-0 flex gap-3">
            <button
              onClick={handleVote}
              className="flex justify-center items-center rounded-lg py-2 flex-1 w-full px-3 bg-red-600 text-white text-xl hover:bg-red-700 transition-all duration-300"
            >
              <MdHowToVote className="mr-2 text-2xl" /> {votes || 0}
            </button>
            <button className="flex-1 w-full btn-outline btn font-semibold uppercase">
              Report Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  product: PropTypes.object,
};
export default DetailsCard;