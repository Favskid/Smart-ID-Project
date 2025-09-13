import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaDownload, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaGlobe } from "react-icons/fa";
import DashboardLayout from "../../../component/DashboardLayout";
import { getProfile } from "../../../Api/authService";
import { useNotification } from "../../../component/Notification";

const BusinessCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Failed to load profile data');
      showNotification('Failed to load profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const cardElement = cardRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // High resolution settings
      const scale = 4;
      canvas.width = cardElement.offsetWidth * scale;
      canvas.height = cardElement.offsetHeight * scale;
      ctx.scale(scale, scale);
      
      // Create SVG representation for better quality
      const serializer = new XMLSerializer();
      const clonedElement = cardElement.cloneNode(true);
      
      // Apply styles inline for better SVG conversion
      const computedStyles = window.getComputedStyle(cardElement);
      clonedElement.style.cssText = computedStyles.cssText;
      
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${cardElement.offsetWidth}" height="${cardElement.offsetHeight}">
          <defs>
            <style>
              .gradient-bg { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); }
              .text-white { color: white; }
              .rounded-2xl { border-radius: 1rem; }
            </style>
          </defs>
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${serializer.serializeToString(clonedElement)}
            </div>
          </foreignObject>
        </svg>
      `;
      
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      
      img.onload = () => {
        // Draw gradient background manually
        const gradient = ctx.createLinearGradient(0, 0, cardElement.offsetWidth, cardElement.offsetHeight);
        gradient.addColorStop(0, '#2563eb');
        gradient.addColorStop(1, '#7c3aed');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cardElement.offsetWidth, cardElement.offsetHeight);
        
        // Draw the card content
        ctx.drawImage(img, 0, 0);
        
        // Create download
        const link = document.createElement('a');
        link.download = `business-card-${profile?.staffId || 'card'}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('Business card downloaded successfully!', 'success');
      };
      
      img.onerror = () => {
        // Fallback method
        const gradient = ctx.createLinearGradient(0, 0, cardElement.offsetWidth, cardElement.offsetHeight);
        gradient.addColorStop(0, '#2563eb');
        gradient.addColorStop(1, '#7c3aed');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cardElement.offsetWidth, cardElement.offsetHeight);
        
        // Add basic text content
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`${profile?.firstName} ${profile?.lastName}`, 40, 60);
        
        ctx.font = '18px Arial';
        ctx.fillText(profile?.jobTitle || '', 40, 90);
        
        ctx.font = '14px Arial';
        ctx.fillText(profile?.department || '', 40, 115);
        ctx.fillText(profile?.email || '', 40, 140);
        
        const link = document.createElement('a');
        link.download = `business-card-${profile?.staffId || 'card'}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('Business card downloaded (fallback version)!', 'success');
      };
      
      img.src = url;
      
    } catch (err) {
      console.error('Download failed:', err);
      showNotification('Failed to download card. Please try again.', 'error');
    }
  };

  const qrValue = profile ? JSON.stringify({
    staffId: profile.staffId,
    name: `${profile.firstName} ${profile.lastName}`,
    department: profile.department,
    jobTitle: profile.jobTitle,
    email: profile.email,
    position: profile.position
  }) : '';

  if (loading) {
    return (
      <DashboardLayout title="Business Card" role="staff">
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Business Card" role="staff">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={fetchProfile}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Business Card" role="staff">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Card</h1>
            <p className="text-gray-600">Your professional business card</p>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={downloadCard}
              className="btn btn-primary gap-2"
            >
              <FaDownload /> Download PNG
            </button>
          </div>

          {/* Business Card */}
          <div className="flex justify-center">
            <div 
              ref={cardRef}
              className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 w-full max-w-lg text-white relative overflow-hidden"
              style={{ aspectRatio: '1.75/1' }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">
                      {profile?.firstName} {profile?.lastName}
                    </h2>
                    <p className="text-blue-100 text-lg mb-2">{profile?.jobTitle}</p>
                    <p className="text-blue-200 text-sm">{profile?.department}</p>
                  </div>
                  
                  {/* Profile Photo */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 shadow-lg ml-4">
                    <img 
                      src={profile?.profilePhotoUrl || '/src/assets/pic.png'} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/src/assets/pic.png';
                      }}
                    />
                  </div>
                </div>

                {/* Middle Section - Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-blue-200" />
                    <span className="text-sm">{profile?.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaBriefcase className="text-blue-200" />
                    <span className="text-sm">{profile?.position}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-200" />
                    <span className="text-sm">ID: {profile?.staffId}</span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-blue-200 mb-1">Smart ID System</p>
                    <p className="text-xs text-blue-300">{new Date().getFullYear()}</p>
                  </div>
                  
                  {/* QR Code */}
                  <div className="bg-white p-2 rounded-lg">
                    <QRCodeCanvas 
                      value={qrValue} 
                      size={60}
                      bgColor="#ffffff"
                      fgColor="#1e40af"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Preview Info */}
          <div className="text-center mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Card Features</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaDownload className="text-blue-600" />
                  <span>Downloadable PNG</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaGlobe className="text-green-600" />
                  <span>QR Code Enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBriefcase className="text-purple-600" />
                  <span>Professional Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-orange-600" />
                  <span>Company Branded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessCard;
