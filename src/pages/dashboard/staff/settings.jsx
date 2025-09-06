import React, { useState } from 'react'
import DashboardLayout from '../../../component/DashboardLayout'
import { FaUser, FaPhone, FaBuilding, FaCamera, FaEdit, FaSave, FaTimes, FaCogs } from 'react-icons/fa'

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: 'Favskid',
    lastName: 'Dev',
    phoneNumber: '+234 123 456 7890',
    department: 'IT',
    profilePicture: null
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const staff = {
    id: "EMP001",
    name: "Favskid Dev",
    department: "Software Engineering",
    email: "Favskid@example.com",
    photo: "/src/assets/pic.png",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Profile update:', formData)
    
    // For demo purposes, show success message
    alert('Profile updated successfully!')
    setIsEditing(false)
    
    //  data to API
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file
      })
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form to original values
    setFormData({
      firstName: 'Favskid',
      lastName: 'Dev',
      phoneNumber: '+234 123 456 7890',
      department: 'IT',
      profilePicture: null
    })
    setPreviewImage(null)
  }

  return (
    <DashboardLayout role="staff" profilePic={staff.photo}>
      {/* Header */}
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaCogs className="text-teal-600" />
          Settings
        </h1>
        <p className="text-sm text-gray-500">Manage your profile and account settings</p>
      </div>

      <div className="min-h-[calc(100vh-100px)] p-4 md:p-6">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full ring ring-teal-400 ring-offset-2 overflow-hidden bg-gradient-to-br from-teal-100 to-blue-200 flex items-center justify-center">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={staff.photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer transition duration-200">
                  <FaCamera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition duration-200 shadow-md"
              >
                <FaEdit className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    disabled={!isEditing}
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 text-gray-900 placeholder-gray-500 ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white shadow-sm'
                    }`}
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    disabled={!isEditing}
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 text-gray-900 placeholder-gray-500 ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white shadow-sm'
                    }`}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    disabled={!isEditing}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 text-gray-900 placeholder-gray-500 ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white shadow-sm'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="department"
                    name="department"
                    required
                    disabled={!isEditing}
                    value={formData.department}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 text-gray-900 ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white shadow-sm'
                    }`}
                  >
                    <option value="">Select your department</option>
                    <option value="IT">Information Technology</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Administration">Administration</option>
                    <option value="Research">Research & Development</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
                >
                  <FaSave className="h-4 w-4" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
                >
                  <FaTimes className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}