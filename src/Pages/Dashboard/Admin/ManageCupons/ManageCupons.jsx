import CommonHelmet from "../../../../Components/Common/Helmet";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import AddCupon from "./AddCupon";
import ViewCupons from "./ViewCupons";

const ManageCupons = () => {
  return (
    <div>
      <SectionHeader subtitle={"--Cupons--"} title={"Manage Cupon Codes"} />
      <AddCupon />
      <ViewCupons />
      <CommonHelmet titlename={"Manage Cupon Codes"} />
    </div>
  );
};

export default ManageCupons;
