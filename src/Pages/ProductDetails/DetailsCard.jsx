import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import useVote from "../../Hooks/useVote";

const DetailsCard = ({ product }) => {
  const handleVote = useVote();

  return (
    <div>
      <div className="flex justify-between bg-red-400 py-4 px-3 md:px-6 items-center">
        <div className="flex items-center gap-4 text-white">
          <img
            className="w-12 h-12 rounded-full"
            src={
              product[0]?.owner?.image || "https://i.ibb.co/5x441PC/user.png"
            }
            alt={product[0]?.owner?.name || "user19419"}
          />
          <div>
            <h4>Name : {product[0]?.owner?.name || "user19419"}</h4>
            <h4>Profession : {product[0]?.owner?.profession || "none"}</h4>
          </div>
        </div>
        <IoShareSocial className="text-3xl hover:cursor-pointer text-white" />
      </div>
      <div className="pb-2 relative">
        <div className="effect overflow-hidden h-56 lg:h-[400px] ">
          <img
            className="image w-full h-full "
            src={product[0]?.img || ""}
            alt={product[0]?.name || ""}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-semibold">
            {product[0]?.name || "product name"}
          </h3>
          <p className="mt-3">
            <span className="font-bold">Read Details : </span>
            {product[0]?.description || "no details"}
          </p>
          <h3 className="mt-2 font-semibold">
            Total Voted : {product[0]?.votes || 0}
          </h3>
          <div className="flex flex-wrap mt-3 mb-16">
            {product[0]?.tags?.map((tag) => (
              <p key={tag} className="text-[#7d7d7d] text-xl gap-4 mr-4">
                #{tag}
              </p>
            ))}
          </div>
          <div className="absolute w-full bottom-0 left-0 flex gap-5">
            <button
              onClick={handleVote}
              className="flex justify-center items-center rounded-lg py-2 flex-1 w-full px-3 bg-red-600 text-white text-xl hover:bg-red-700 transition-all duration-300"
            >
              <MdHowToVote className="mr-2 text-2xl" /> {product[0]?.votes || 0}
            </button>
            <button className="flex-1 w-full btn-outline btn">
              Report Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  product: PropTypes.array,
};
export default DetailsCard;
