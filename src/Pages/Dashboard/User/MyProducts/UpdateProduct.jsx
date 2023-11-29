import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ImSpinner3 } from "react-icons/im";
import useProductById from "../../../../Hooks/useProductById";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UpdateProduct = () => {
  const productId = useParams().id;
  const { data } = useProductById(productId);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (info) => {
    const img = info?.image[0];
    const imgsize = img.size / (1024 * 1024);

    if (imgsize > 4) {
      Swal.fire("Select image under 4MB");
      return;
    }

    setUploading(true);

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
        const updatedInfo = {
          productId,
          name: info?.name,
          img: imagelink,
          price: parseInt(info?.price),
          description: info?.description,
        };

        axiosSecure
          .patch("/product", updatedInfo)
          .then((res) => {
            if (res.data) {
              Swal.fire("Product successfully updated");
              setUploading(false);
              navigate("/dashboard/my-products");
            }
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
        reset();
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return (
    <div className="w-3/4 mx-auto px-5 bg-gray-700 mt-8 rounded-xl flex justify-center items-center py-10 mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-red-300 rounded-xl p-2 space-y-5 w-full"
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
            defaultValue={data?.name}
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
            defaultValue={data?.price}
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
            defaultValue={data?.description}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn w-full font-semibold uppercase bg-red-800 text-white hover:bg-red-500"
        >
          {uploading ? (
            <ImSpinner3 className="text-xl animate-spin" />
          ) : (
            "Update Now"
          )}
        </button>
        <button
          onClick={() => {
            reset();
            navigate("/dashboard/my-products");
          }}
          type="submit"
          className="btn w-full font-semibold uppercase bg-red-800 text-white hover:bg-red-500"
        >
          Cancel Update
        </button>
      </form>
    </div>
  );
};
export default UpdateProduct;
