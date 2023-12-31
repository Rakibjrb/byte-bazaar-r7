import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import CommonHelmet from "../../../../Components/Common/Helmet";

const AddProduct = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (info) => {
    const img = info?.image[0];
    const imgsize = img.size / (1024 * 1024);

    if (imgsize > 4) {
      Swal.fire("Select image under 4MB");
      return;
    }
    setUploading(true);

    const tags = info?.tags.toLowerCase().split(" ");

    const body = new FormData();
    body.set("key", import.meta.env.VITE_imgbb_api_key);
    body.append("image", img);

    axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    })
      .then((res) => {
        const imagelink = res.data?.data?.url;
        const productInfo = {
          name: info?.name,
          img: imagelink,
          price: parseInt(info?.price),
          description: info?.description,
          time: moment().format("Y-M-D"),
          votes: 0,
          category: info.category,
          tags,
          status: "Pending",
          owner: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };

        axiosSecure
          .post("/product", productInfo)
          .then((res) => {
            if (res.data) {
              Swal.fire("Product successfully added");
              navigate("/dashboard/my-products");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        reset();
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="md:mt-10">
      <div className="hidden md:block">
        <SectionHeader
          subtitle={"--Add Product--"}
          title={"Add a new product"}
        />
      </div>
      <div className="md:hidden">
        <SectionHeader title={"Add a new product"} />
      </div>
      <div className="w-full min-h-[60vh] bg-gray-700 mt-8 rounded-xl flex justify-center items-center py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-red-300 w-4/5 md:w-3/4 lg:w-1/2 rounded-xl p-5 space-y-5"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 text-[16px] font-semibold">
                Product Name :{" "}
              </span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full placeholder:text-gray-400"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 text-[16px] font-semibold">
                Upload Product Image :{" "}
              </span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full placeholder:text-gray-400 pt-2"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 text-[16px] font-semibold">
                Price :{" "}
              </span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full placeholder:text-gray-400"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 text-[16px] font-semibold">
                Tags :{" "}
              </span>
            </label>
            <input
              type="text"
              {...register("tags", { required: true })}
              placeholder="example computer motherboard"
              className="input input-bordered w-full placeholder:text-gray-400"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 text-[16px] font-semibold">
                Category :{" "}
              </span>
            </label>
            <input
              type="text"
              {...register("category", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full placeholder:text-gray-400"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 text-[16px] font-semibold">
                Write Description :{" "}
              </span>
            </label>
            <textarea
              rows="6"
              {...register("description", { required: true })}
              className="rounded-xl p-2"
              placeholder="Type here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn w-full font-semibold uppercase bg-red-800 text-white hover:bg-red-500"
          >
            {uploading ? (
              <ImSpinner3 className="text-xl animate-spin" />
            ) : (
              "Add Now"
            )}
          </button>
        </form>
      </div>
      <CommonHelmet titlename={"Add Products"} />
    </div>
  );
};

export default AddProduct;
