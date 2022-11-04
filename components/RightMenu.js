import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Menu, Avatar, Grid, Dropdown, notification } from "antd";
import Link from "next/link";

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    fetch(`http://localhost:3000/users/${session}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  console.log(userData);

  let router = useRouter();
  function redirect() {
    router.push("/");
  }

  const openNotification = () => {
    notification.open({
      message: "LogOut Status",
      description: "Logged Out Successfully!",
      duration: 1.5,
    });
  };

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        localStorage.clear();
        redirect();
        //  alert("logged out")
      }
    });
  };

  const { md } = useBreakpoint();

  const menu = (
    <Menu>
      {"error" in userData ? (
        <Menu.Item>
          <Link href="/login">Login</Link>
        </Menu.Item>
      ) : (
        " "
      )}

      {"error" in userData ? (
        " "
      ) : (
        <Menu.Item>
          <Link href="/userprofile">View Profile</Link>
        </Menu.Item>
      )}

      {"error" in userData ? (
        " "
      ) : (
        <Menu.Item>
          <a
            onClick={() => {
              handleLogout();
              openNotification();
            }}
          >
            Logout
          </a>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Menu overflowedIndicator mode={md ? "horizontal" : "inline"}>
      <Menu.Item>
        <Link href="/">
          <b>Home</b>
        </Link>
      </Menu.Item>

      {userData.is_organiser ? (
        <Menu.Item>
          <Link href="/createvent">
            <b>Create an Event</b>
          </Link>
        </Menu.Item>
      ) : (
        " "
      )}

      <Menu.Item>
        <Link href="/about">
          <b>About Us</b>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <div>
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
            {/* <Link  href={`/userprofile`}> */}
            <Avatar
              size={50}
              src={`${userData.user_profile?.avatar_img}`}
              icon={<UserOutlined />}
            />
            {/* </Link> */}
          </Dropdown>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
