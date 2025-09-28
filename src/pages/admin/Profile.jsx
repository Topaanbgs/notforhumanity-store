import React, { useState, useMemo } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaKey, FaCamera, FaSave, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminAvatar from "../../assets/profile.jpeg";

const ProfileHeader = ({ name, email, avatarUrl, onLogout }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-center gap-6">
      {/* Profile picture with update button */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <img src={avatarUrl} alt="Admin Avatar" className="w-full h-full object-cover rounded-full border-4 border-red-500 shadow-xl" />
        <button className="absolute bottom-0 right-0 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-150 shadow-md ring-2 ring-white" title="Change Avatar">
          <FaCamera className="text-sm" />
        </button>
      </div>

      {/* Name and email */}
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-extrabold text-gray-900 truncate">{name}</h2>
        <p className="text-gray-500 mt-0.5 flex items-center gap-2 text-sm">
          <FaEnvelope className="text-red-500" />
          {email}
        </p>
      </div>

      {/* Logout button */}
      <Link to="/" onClick={onLogout} className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-300 font-medium transition duration-150 flex-shrink-0">
        <FaSignOutAlt /> Log Out
      </Link>
    </div>
  );
};

const ProfileSettingsForm = () => {
  const [contactData, setContactData] = useState({
    fullName: "Topan Bagus Prasetyo",
    phone: "+62 8515555****",
    bio: "Chief Everything Officer (CEO) and System Developer. Direct management of inventory, orders, and technical infrastructure.",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Contact info handlers
  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Info Saved:", contactData);
    alert("Contact information updated successfully!");
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }
    console.log("Password Change Request:", passwords);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Personal info form */}
      <form onSubmit={handleContactSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
          <FaUserCircle className="text-red-600" /> Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={contactData.fullName}
              onChange={handleContactChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input type="tel" id="phone" name="phone" value={contactData.phone} onChange={handleContactChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow" />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio / Role
          </label>
          <textarea id="bio" name="bio" rows="3" value={contactData.bio} onChange={handleContactChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow" />
        </div>

        <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 font-medium shadow-md transition-colors mt-6">
          <FaSave /> Save Changes
        </button>
      </form>

      {/* Password update form */}
      <form onSubmit={handlePasswordSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
          <FaKey className="text-red-600" /> Update Password
        </h3>

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow"
              required
            />
          </div>
        </div>

        <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 font-medium shadow-md transition-colors mt-6">
          <FaKey /> Change Password
        </button>
      </form>
    </div>
  );
};

export default function AdminProfile() {
  const adminName = "Topan Bagus Prasetyo";
  const [avatar, setAvatar] = useState(null);

  const adminEmail = useMemo(() => {
    const firstName = adminName.split(" ")[0].toLowerCase();
    return `${firstName}@nfhmn.staff.com`;
  }, [adminName]);

  const handleLogout = () => {
    console.log("Logging out user...");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:max-w-7xl lg:mx-auto">
      {/* Page header */}
      <div className="border-b pb-4 border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account information and security preferences.</p>
      </div>

      {/* Profile header */}
      <ProfileHeader name={adminName} email={adminEmail} avatarUrl={AdminAvatar} onLogout={handleLogout} />

      {/* Forms section */}
      <ProfileSettingsForm />
    </div>
  );
}
