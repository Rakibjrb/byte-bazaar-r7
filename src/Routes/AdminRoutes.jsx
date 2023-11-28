import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import useGetUser from "../Hooks/useGetUser";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { user, userLoading } = useAuth();
  const { userDataFromDB, isPending } = useGetUser();

  if (userLoading || isPending) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && userDataFromDB.role === "Admin") {
    return children;
  }

  return <Navigate state={{ from: location.pathname }} to="/login" replace />;
};

AdminRoutes.propTypes = {
  children: PropTypes.node,
};
export default AdminRoutes;
