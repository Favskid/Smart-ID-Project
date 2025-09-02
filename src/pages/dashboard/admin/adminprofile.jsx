import React from "react";
import DashboardLayout from "../../../component/DashboardLayout";
import { QRCodeCanvas } from "qrcode.react";
import { FaUsers, FaBuilding, FaTasks } from "react-icons/fa";

const Adminprofile = () => {
  const admin = {
    id: "ADM001",
    name: "Favskid Admin",
    department: "System Administration",
    email: "admin@example.com",
    photo: "/src/assets/pic.png",
  };

  const qrValue = JSON.stringify({
    id: admin.id,
    name: admin.name,
    role: "Admin",
    email: admin.email,
  });

  return (
    <DashboardLayout role="admin" profilePic={admin.photo}>
      <div className="min-h-[calc(100vh-100px)] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, {admin.name}</p>
      </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat bg-white/80 backdrop-blur rounded-2xl shadow-md">
            <div className="stat-figure text-indigo-500">
              <FaUsers size={28} />
            </div>
            <div className="stat-title text-black">Total Staff</div>
            <div className="stat-value text-indigo-600">128</div>
          </div>
          <div className="stat bg-white/80 backdrop-blur rounded-2xl shadow-md">
            <div className="stat-figure text-indigo-500">
              <FaBuilding size={28} />
            </div>
            <div className="stat-title text-black">Departments</div>
            <div className="stat-value text-indigo-600">12</div>
          </div>
          <div className="stat bg-white/80 backdrop-blur rounded-2xl shadow-md">
            <div className="stat-figure text-indigo-500">
              <FaTasks size={28} />
            </div>
            <div className="stat-title text-black">Active Projects</div>
            <div className="stat-value text-indigo-600">34</div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-indigo-400 ring-offset-2 overflow-hidden">
                  <img src={admin.photo} alt="Profile" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{admin.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">{admin.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Department</p>
                  <p className="text-lg font-medium text-gray-800">{admin.department}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Admin ID</p>
                  <p className="text-lg font-medium text-gray-800">{admin.id}</p>
                </div>
              </div>
            </div>

            {/* QR */}
            <div className="flex-shrink-0 self-center md:self-auto">
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-100">
                <QRCodeCanvas value={qrValue} size={150} />
              </div>
              <p className="mt-2 text-center text-xs text-gray-500">Smart ID QR</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Adminprofile;
