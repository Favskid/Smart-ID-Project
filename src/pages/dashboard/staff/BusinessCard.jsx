import React from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import DashboardLayout from "../../../component/DashboardLayout";

const SmartID = () => {
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
    <DashboardLayout
      title="Smart ID"
      role="staff"
      profilePic={staff.photo}
      menu={[]} // staff menu can go here
    >
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="card bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            {/* Staff Photo */}
            <div className="avatar mb-4">
              <div className="w-28 rounded-full ring ring-indigo-400 ring-offset-2">
                <img src={staff.photo} alt="Staff" />
              </div>
            </div>

            {/* Staff Info */}
            <h2 className="text-2xl font-bold text-gray-800">{staff.name}</h2>
            <p className="text-gray-600">{staff.department}</p>
            <p className="text-sm text-gray-500">{staff.email}</p>

            {/* QR Code */}
            <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-inner">
              <QRCodeCanvas value={qrValue} size={150} />
            </div>

            {/* Smart ID Footer */}
            <p className="mt-4 text-xs text-gray-400">
              Business Card
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SmartID;
