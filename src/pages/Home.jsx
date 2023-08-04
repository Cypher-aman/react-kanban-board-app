import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/checkLogin";

const Home = function () {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    const isLogin = userLogin(userInfo);
    console.log(isLogin);
    if (!isLogin) navigate("/login");
    else navigate("/my-boards");
  }, []);

  return <div id="home">Home</div>;
};

export default Home;
