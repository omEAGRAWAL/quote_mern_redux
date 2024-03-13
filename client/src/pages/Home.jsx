import HomePost from "../components/HomePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser === null) navigate("/sign-in");
  }, []);
  const { currentUser } = useSelector((state) => state.user);

  return <HomePost />;
}

export default Home;
