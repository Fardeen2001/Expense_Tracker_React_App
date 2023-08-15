import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthSignUpForm from "./Auth/AuthSignUpForm";
import Home from "./Components/Home";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import { useContext } from "react";
import AuthContext from "./Context/authContext";
import ForgotPassword from "./Auth/ForgotPassword";

function App() {
  const authCxt = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={!authCxt.isLoggedIn ? <Navigate to="/auth" /> : <Home />}
        />
        <Route exact path="/auth" element={<AuthSignUpForm />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/profile" element={<ContactDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
