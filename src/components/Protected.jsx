import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Protected = ({ isBlocked, children }) => {
  const cookies = new Cookies();
  const loggedUser = cookies.get("user-info");
  console.log(isBlocked, loggedUser);

  if (loggedUser && isBlocked === false) {
    return children;
  } else {
    alert("You were blocked!");
    return <Navigate to="/" replace />;
  }
};

export default Protected;