import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import useGellAllUsers from "../../../../Hooks/DashboardData/useGellAllUsers";
import User from "./User";

const ManageUsers = () => {
  const { allusers } = useGellAllUsers();

  return (
    <div className="mt-8">
      <div className="hidden md:block">
        <SectionHeader subtitle={"--Manage--"} title={"Manage Users"} />
      </div>
      <div className="md:hidden">
        <SectionHeader title={"Manage Users"} />
      </div>
      <div className="overflow-x-auto">
        <div className="md:w-auto mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Name</th>
                <th>User Email</th>
                <th>Make Moderator</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {allusers?.map((user, index) => (
                <User key={user._id} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
