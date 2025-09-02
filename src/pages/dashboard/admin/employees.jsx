import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DashboardLayout from "../../../component/DashboardLayout";
import { FaPlus, FaTimes } from "react-icons/fa";

const EmployeeTable = () => {
  const [selectedQR, setSelectedQR] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    idNumber: "",
    department: "",
    email: "",
    phone: "",
    pic: ""
  });

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      photo: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      name: "Hart Hagerty",
      jobTitle: "Desktop Support Technician",
      department: "IT",
      email: "hart@example.com",
      phone: "+1 555-123-4567",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=EMP001",
    },
    {
      id: "EMP002",
      photo: "https://img.daisyui.com/images/profile/demo/3@94.webp",
      name: "Brice Swyre",
      jobTitle: "Tax Accountant",
      department: "Finance",
      email: "brice@example.com",
      phone: "+1 555-987-6543",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=EMP002",
    },
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new employee
  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.idNumber || !newEmployee.department || !newEmployee.email || !newEmployee.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const newEmp = {
      id: newEmployee.idNumber,
      photo: newEmployee.pic || "https://img.daisyui.com/images/profile/demo/1@94.webp",
      name: newEmployee.name,
      jobTitle: "Employee",
      department: newEmployee.department,
      email: newEmployee.email,
      phone: newEmployee.phone,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${newEmployee.idNumber}`,
    };

    setEmployees(prev => [...prev, newEmp]);
    
    // Reset form
    setNewEmployee({
      name: "",
      idNumber: "",
      department: "",
      email: "",
      phone: "",
      pic: ""
    });
    
    setShowAddForm(false);
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "employees.xlsx");
  };

  return (
    <DashboardLayout role="admin" profilePic="/src/assets/pic.png">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Employees List</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary btn-sm flex items-center gap-2"
            >
              <FaPlus size={14} />
              Add Employee
            </button>
            <button onClick={downloadExcel} className="btn btn-sm btn-outline btn-primary">
              Download Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="font-medium">{emp.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={emp.photo} alt={emp.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{emp.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.jobTitle}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>
                    <img
                      src={emp.qrCode}
                      alt="QR Code"
                      className="h-12 w-12 cursor-pointer"
                      onClick={() => setSelectedQR(emp.qrCode)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Employee Modal */}
        {showAddForm && (
          <dialog open className="modal modal-open">
            <div className="modal-box max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Employee</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter employee name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">ID Number *</span>
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={newEmployee.idNumber}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter ID number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Department *</span>
                    </label>
                    <select
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newEmployee.phone}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Profile Picture URL</span>
                    </label>
                    <input
                      type="url"
                      name="pic"
                      value={newEmployee.pic}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter profile picture URL (optional)"
                    />
                  </div>
                </div>
                
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}

        {/* QR Modal */}
        {selectedQR && (
          <dialog open className="modal">
            <div className="modal-box flex flex-col items-center">
              <img src={selectedQR} alt="QR Code Large" className="w-64 h-64" />
              <button
                className="btn mt-4 btn-primary"
                onClick={() => setSelectedQR(null)}
              >
                Close
              </button>
            </div>
          </dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeTable;
