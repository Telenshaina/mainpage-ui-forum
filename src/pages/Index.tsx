import { useState } from "react";
import StudentPage from "./student/StudentPage";
import ProfessorPage from "./professor/ProfessorPage";
import AdminPage from "./admin/AdminPage";

const Index = () => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login simulation
  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Academic Forum</h1>
          <p className="text-center mb-6">Please log in to continue</p>
          <div className="space-y-4">
            <button
              onClick={() => handleLogin("student")}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Log in as Student
            </button>
            <button
              onClick={() => handleLogin("professor")}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Log in as Professor
            </button>
            <button
              onClick={() => handleLogin("admin")}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Log in as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Log Out
        </button>
      </div>

      {userRole === "admin" && <AdminPage />}
      {userRole === "professor" && <ProfessorPage />}
      {userRole === "student" && <StudentPage />}
    </div>
  );
};

export default Index;
