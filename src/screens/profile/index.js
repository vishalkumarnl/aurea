import React, { useState } from "react";
import ProfilePage from "./component/ProfilePage";
import AddressManager from "components/AddressManage";
import SideBar from "./component/sideBar";
import "./index.css";

export default function Profile() {
  const [section, setSection] = useState("profile")
  return (
    <div className="page-container">
      <SideBar section={section} setSection={setSection}/> 
      {section === "profile" && <ProfilePage/>}
      {section === "address" && <AddressManager />}
    </div>
  );
}
