import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthSignUpForm from "./Auth/AuthSignUpForm";
import Home from "./Components/Home";
import ContactDetails from "./Components/ContactDetails/ContactDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<AuthSignUpForm />} />
        <Route exact path="/profile" element={<ContactDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
