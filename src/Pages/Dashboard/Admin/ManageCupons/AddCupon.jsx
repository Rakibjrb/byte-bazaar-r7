import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCupon from "../../../../Hooks/useCupon";

const AddCupon = () => {
  const [showForm, setShowForm] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { cuponrefetch } = useCupon();

  const handleCuponSubmit = async (e) => {
    e.preventDefault();
    const info = {
      cupon: e.target.cupon.value,
      date: e.target.date.value,
      description: e.target.description.value,
      amount: e.target.amount.value,
    };

    const res = await axiosSecure.post("/cupon", info);
    res.data && Swal.fire("Cupon Added Successfully");
    setShowForm(false);
    e.target.reset();
    cuponrefetch();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h2 className="text-4xl mb-3">Add Cupon Code</h2>
        <button
          className="btn uppercase bg-[#f37d7d]"
          onClick={() => setShowForm(true)}
        >
          Add Cupon
        </button>
      </div>
      <form
        onSubmit={handleCuponSubmit}
        className={`${
          showForm ? "" : "hidden"
        } mt-5 p-5 bg-slate-400 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-7`}
      >
        <input
          className="w-full placeholder:text-black p-3 rounded-md"
          type="text"
          placeholder="Enter cupon code here"
          name="cupon"
          required
        />
        <input
          className="w-full  p-3 rounded-md"
          type="date"
          name="date"
          required
        />
        <input
          className="w-full placeholder:text-black p-3 rounded-md"
          type="text"
          placeholder="Enter cupon description here"
          name="description"
          required
        />
        <input
          className="w-full placeholder:text-black p-3 rounded-md"
          type="text"
          placeholder="Enter discount amout here"
          name="amount"
          required
        />
        <button className="btn w-full md:col-span-2 uppercase">
          Add This Cupon
        </button>
      </form>
    </div>
  );
};

export default AddCupon;
