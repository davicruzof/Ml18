import { Routes, Route } from "react-router-dom";
import LoginScreen from "pages/signInPage";
import Signup from "pages/signUpScreen";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="Login" element={<LoginScreen />} />
      <Route path="Signup" element={<Signup />} />
    </Routes>
  );
}

export default AuthRoutes;
