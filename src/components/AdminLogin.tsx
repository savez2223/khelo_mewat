import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      Cookies.set("auth", "true", { expires: 1 });
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 py-2">
              Administration Dashboard
            </h2>
          </div>
          <nav className="space-y-4">
            <a
              href="/teams"
              className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Team Management
            </a>
            <a
              href="/admineventsnotices"
              className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Events & Notices
            </a>
            <a
              href="/admincontact"
              className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Contact Management
            </a>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 py-2">
            Administrator Sign-In
          </h2>
          <p className="text-gray-600 mt-2">Access the administration panel</p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}