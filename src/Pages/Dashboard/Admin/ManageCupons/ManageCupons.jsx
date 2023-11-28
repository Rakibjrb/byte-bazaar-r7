import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import AddCupon from "./AddCupon";
import ViewCupons from "./ViewCupons";

const ManageCupons = () => {
  return (
    <div>
      <SectionHeader subtitle={"--Cupons--"} title={"Manage Cupon Codes"} />
      <AddCupon />
      <ViewCupons />
    </div>
  );
};

export default ManageCupons;
