import React from "react";
import DashboardLayout from "../../component/DashboardLayout";
import SmartID from "./staff/smartID";

const StaffDashboard = () => {
  return (
    <DashboardLayout
      title="Staff Dashboard"
      role="staff"
      profilePic="/src/assets/pic.png"
    >
      <SmartID />
    </DashboardLayout>
  );
};

export default StaffDashboard;
