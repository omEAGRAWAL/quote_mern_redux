import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import About from "./pages/About";
import Dashboard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/FooterCom";
import CreatePost from "./pages/CreatePost";
import PrivateRoutes from "./components/PrivateRoutes";
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/createPost" element={<CreatePost />} />

          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
