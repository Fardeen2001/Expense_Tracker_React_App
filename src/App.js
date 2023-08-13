import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthSignUpForm from "./Auth/AuthSignUpForm";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<AuthSignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
