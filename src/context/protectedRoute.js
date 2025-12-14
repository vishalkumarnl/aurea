import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ setShowLogin, children }) => {
  const user = useSelector((state) => state?.userData?.user);
  // Wait for redux-persist to rehydrate the store before deciding
  const rehydrated = useSelector((state) => state?._persist?.rehydrated);

  // If rehydration hasn't completed yet, don't redirect — show nothing (or a loader)
  if (rehydrated === false || typeof rehydrated === "undefined") {
    return null;
  }

  if (!user) {
    if (typeof setShowLogin === "function") setShowLogin(true);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
