import React from "react";
import DashboardLayout from "../../../component/DashboardLayout";
import { QRCodeCanvas } from "qrcode.react";

const StaffProfile = () => {
  const staff = {
    id: "EMP001",
    name: "Favskid Dev",
    department: "Software Engineering",
    email: "Favskid@example.com",
    photo: "/src/assets/pic.png",
  };

  const qrValue = JSON.stringify({
    id: staff.id,
    name: staff.name,
    department: staff.department,
    email: staff.email,
  });

  return (
    <DashboardLayout role="staff" profilePic={staff.photo}>
          {/* header */}
          <div className="p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {staff.name}</p>
          </div>

      <div className="min-h-[calc(100vh-100px)] p-4 md:p-6">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-indigo-400 ring-offset-2 overflow-hidden">
                  <img src={staff.photo} alt="Profile" />
                </div>
              </div>
            </div>


            {/* Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{staff.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">{staff.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Department</p>
                  <p className="text-lg font-medium text-gray-800">{staff.department}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Employee ID</p>
                  <p className="text-lg font-medium text-gray-800">{staff.id}</p>
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

export default StaffProfile; 