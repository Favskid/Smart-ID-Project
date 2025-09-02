import React from "react";
import { FaUserCircle } from "react-icons/fa";
import DashboardLayout from "../../component/DashboardLayout";

const StaffDashboard = () => {
  const staffMenu = [
    { label: "Smart ID", link: "/dashboard/smart-id", icon: FaUserCircle },
    { label: "Business Card", link: "/dashboard/business-card" },
    { label: "Profile", link: "/dashboard/profile" },
  ];

  return (
    <DashboardLayout
      title="Staff Dashboard"
      role="staff"
      menu={staffMenu}
      profilePic="/src/assets/pic.png"
    >
      <h1 className="text-2xl font-semibold text-gray-700">
        Welcome Staff 👋
      </h1>
      <p className="mt-2 text-gray-600">Here’s your overview.</p>

    </DashboardLayout>
  );
};

export default StaffDashboard;
