import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useCupon from "../../../../Hooks/useCupon";

const ViewCupons = () => {
  const { allcupons, cuponrefetch } = useCupon();
  const axiosSecure = useAxiosSecure();

  const handleDeleteCupon = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/cupon/${id}`);
        res.data && Swal.fire("Cupon Deleted");
        cuponrefetch();
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
      {allcupons?.map((cupon) => (
        <div
          key={cupon._id}
          className="z-0 card bg-base-100 shadow-xl image-full"
        >
          <figure>
            <img src="https://i.ibb.co/wJQsSr5/intel.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{cupon?.cupon}</h2>
            <p>{cupon?.description}</p>
            <p>Cupon Amount : {cupon?.amount}</p>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleDeleteCupon(cupon._id);
                }}
              >
                Delete Cupon
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewCupons;
