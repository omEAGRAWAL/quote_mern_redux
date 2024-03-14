import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOutSuccess, signOutStart } from "../redux/user/userSlice";
function DashSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    setTab(tabFromUrl);
    console.log(tabFromUrl);
  }, [location.search]);

  const handleSignout = async () => {
    try {
      console.log("signing out");
      dispatch(signOutStart());
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
        dispatch(signOutSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {/*left side*/}

      <Sidebar className="w-full md:w-56 ">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="md:min-h-screen ">
            <Sidebar.Item
              href="/dashboard/?tab=profile"
              icon={HiUser}
              label="user"
              active={tab === "profile"}
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item href="" icon={CiLogout} onClick={handleSignout}>
              SignOut
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default DashSidebar;
