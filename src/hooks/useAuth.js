import { useContext } from "react";
import { AuthContext } from "../core/contexts/AuthContext";

const useAuth = () => useContext(AuthContext);
export default useAuth;
