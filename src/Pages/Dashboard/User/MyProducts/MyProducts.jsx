import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
const MyProducts = () => {
  return (
    <div className="md:mt-10">
      <div className="hidden md:block">
        <SectionHeader subtitle={"--My Products--"} title={"My All Products"} />
      </div>
      <div className="md:hidden">
        <SectionHeader title={"My All Products"} />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xl">SL No.</th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Votes</th>
                <th className="text-xl">Status</th>
                <th className="text-xl">Update</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th className="text-xl">1.</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">
                        Date : 2023-11-23
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">10+</td>
                <td>
                  <div className="btn btn-sm hover:bg-red-700 bg-red-700 text-white uppercase">
                    Pending
                  </div>
                </td>
                <th>
                  <button className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400">
                    Update
                  </button>
                </th>
                <th>
                  <button className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800">
                    Delete
                  </button>
                </th>
              </tr>
              {/* row 2 */}
              <tr>
                <th className="text-xl">2.</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">Brice Swyre</div>
                      <div className="text-sm opacity-50">
                        Date : 2023-11-23
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">20+</td>
                <td>
                  <div className="btn btn-sm hover:bg-red-700 bg-red-700 text-white uppercase">
                    Pending
                  </div>
                </td>
                <th>
                  <button className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400">
                    Update
                  </button>
                </th>
                <th>
                  <button className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800">
                    Delete
                  </button>
                </th>
              </tr>
              {/* row 3 */}
              <tr>
                <th className="text-xl">3.</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">Marjy Ferencz</div>
                      <div className="text-sm opacity-50">
                        Date : 2023-11-23
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">50+</td>
                <td>
                  <div className="btn btn-sm hover:bg-red-700 bg-red-700 text-white uppercase">
                    Pending
                  </div>
                </td>
                <th>
                  <button className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400">
                    Update
                  </button>
                </th>
                <th>
                  <button className="btn uppercase text-white btn-sm bg-red-700 hover:bg-red-800">
                    Delete
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
