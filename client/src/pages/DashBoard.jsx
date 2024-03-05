import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
function DashBoard() {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //write code to clear redux sttore and sign out from user account

  return (
    <div>
      <div>
        {/*left side*/}

        <Sidebar>
          <Sidebar.Items className="min-h-screen">
            <Sidebar.ItemGroup>
              <Sidebar.Item href="" icon={CiLogout} onClick={handleSignout}>
                SignOut
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/?tab=profile" icon={HiUser}>
                Profile
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      <div className="">{/*right side*/}</div>
    </div>
  );
}

export default DashBoard;
