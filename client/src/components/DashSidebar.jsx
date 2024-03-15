import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DashSidebar() {
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
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default DashSidebar;
