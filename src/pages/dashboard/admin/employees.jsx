import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DashboardLayout from "../../../component/DashboardLayout";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaEyeSlash, FaUsers } from "react-icons/fa";

const EmployeeTable = () => {
  const [selectedQR, setSelectedQR] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
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
      status: "active"
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
      status: "active"
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

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isEdit) {
          setEditingEmployee(prev => ({
            ...prev,
            photo: event.target.result
          }));
        } else {
          setNewEmployee(prev => ({
            ...prev,
            pic: event.target.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
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
      status: "active"
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

  // Edit employee
  const handleEditEmployee = () => {
    if (!editingEmployee.name || !editingEmployee.department || !editingEmployee.email || !editingEmployee.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setEmployees(prev => prev.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    
    setShowEditForm(false);
    setEditingEmployee(null);
  };

  // Deactivate/Activate employee
  const toggleEmployeeStatus = (employeeId) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: emp.status === "active" ? "inactive" : "active" }
        : emp
    ));
  };

  // Delete employee
  const deleteEmployee = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    }
  };

  // Open edit form
  const openEditForm = (employee) => {
    setEditingEmployee({ ...employee });
    setShowEditForm(true);
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "employees.xlsx");
  };

  const activeEmployees = employees.filter(emp => emp.status === "active");
  const inactiveEmployees = employees.filter(emp => emp.status === "inactive");

  return (
    <DashboardLayout role="admin" profilePic="/src/assets/pic.png">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Staff</p>
                <p className="text-2xl font-bold text-green-600">{activeEmployees.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaEye className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Staff</p>
                <p className="text-2xl font-bold text-orange-600">{inactiveEmployees.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FaEyeSlash className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-purple-600">{new Set(employees.map(emp => emp.department)).size}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Staff Management</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary btn-sm flex items-center gap-2"
            >
              <FaPlus size={14} />
              Add Staff
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
                <th className="text-black">ID</th>
                <th className="text-black">Name</th>
                <th className="text-black">Job Title</th>
                <th className="text-black">Department</th>
                <th className="text-black">Email</th>
                <th className="text-black">Phone</th>
                <th className="text-black">Status</th>
                <th className="text-black">QR Code</th>
                <th className="text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className={emp.status === "inactive" ? "opacity-60" : ""}>
                  <td className="font-medium text-black">{emp.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={emp.photo} alt={emp.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-black">{emp.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-black">{emp.jobTitle}</td>
                  <td className="text-black">{emp.department}</td>
                  <td className="text-black">{emp.email}</td>
                  <td className="text-black">{emp.phone}</td>
                  <td>
                    <span className={`badge ${emp.status === "active" ? "badge-success" : "badge-warning"}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <img
                      src={emp.qrCode}
                      alt="QR Code"
                      className="h-12 w-12 cursor-pointer"
                      onClick={() => setSelectedQR(emp.qrCode)}
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditForm(emp)}
                        className="btn btn-xs btn-outline btn-info"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => toggleEmployeeStatus(emp.id)}
                        className={`btn btn-xs btn-outline ${emp.status === "active" ? "btn-warning" : "btn-success"}`}
                        title={emp.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {emp.status === "active" ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="btn btn-xs btn-outline btn-error"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
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
                <h3 className="text-lg font-semibold">Add New Staff Member</h3>
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
                      placeholder="Enter staff name"
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
                      <span className="label-text font-medium">Profile Picture</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="file-input file-input-bordered w-full"
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
                    Add Staff
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}

        {/* Edit Employee Modal */}
        {showEditForm && editingEmployee && (
          <dialog open className="modal modal-open">
            <div className="modal-box max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Staff Member</h3>
                <button 
                  onClick={() => setShowEditForm(false)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleEditEmployee(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editingEmployee.name}
                      onChange={handleEditInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Department *</span>
                    </label>
                    <select
                      name="department"
                      value={editingEmployee.department}
                      onChange={handleEditInputChange}
                      className="select select-bordered w-full"
                      required
                    >
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
                      value={editingEmployee.email}
                      onChange={handleEditInputChange}
                      className="input input-bordered w-full"
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
                      value={editingEmployee.phone}
                      onChange={handleEditInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Profile Picture</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, true)}
                      className="file-input file-input-bordered w-full"
                    />
                    {editingEmployee.photo && (
                      <div className="mt-2">
                        <img 
                          src={editingEmployee.photo} 
                          alt="Current" 
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update Staff
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
