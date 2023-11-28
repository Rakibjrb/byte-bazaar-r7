import PropTypes from "prop-types";

const User = ({ user, index }) => {
  const { name, email, time } = user;

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
        <button className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400">
          Admin
        </button>
      </th>
      <th>
        <button className="btn uppercase text-white btn-sm bg-gray-500 hover:bg-gray-400">
          Moderator
        </button>
      </th>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
};
export default User;
