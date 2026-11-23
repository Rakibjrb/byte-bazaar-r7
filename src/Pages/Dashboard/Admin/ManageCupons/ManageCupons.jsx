import CommonHelmet from "../../../../Components/Common/Helmet";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import AddCupon from "./AddCupon";
import ViewCupons from "./ViewCupons";

const ManageCupons = () => {
  return (
    <div>
      <div>Manage coupon codes</div>
      <AddCupon />
      <ViewCupons />
      <CommonHelmet titlename={"Manage Cupon Codes"} />
    </div>
  );
};

export default ManageCupons;
