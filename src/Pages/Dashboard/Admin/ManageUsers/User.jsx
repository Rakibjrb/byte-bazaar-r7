import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const User = ({ user, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedUser } = useAuth();
  const { _id, name, email, time, role } = user;

  const handleRoleChange = (changeRole) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes make ${changeRole}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/change-user-role/${loggedUser?.email}`,
          {
            id: _id,
            role: changeRole,
          }
        );

        await refetch();

        res.data?.modifiedCount > 0 &&
          Swal.fire(`Make ${changeRole} successfull`);
        res.data?.modifiedCount === 0 && Swal.fire(`something went wrong`);
      }
    });
  };

  return (
    <tr>
      <th className="text-xl">{index + 1}.</th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{time}</div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <th>
        <button
          disabled={role === "Admin"}
          onClick={() => handleRoleChange("Admin")}
          className="btn uppercase text-white btn-sm bg-green-500 hover:bg-gray-400"
        >
          Admin
        </button>
      </th>
      <th>
        <button
          disabled={role === "Moderator"}
          onClick={() => handleRoleChange("Moderator")}
          className="btn uppercase text-white btn-sm bg-red-400 hover:bg-gray-400"
        >
          Moderator
        </button>
      </th>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.func,
};
export default User;
