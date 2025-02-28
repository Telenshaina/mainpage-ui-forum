
import { Home, User, TrendingUp, Bookmark, Menu, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Button } from "./ui/button";

const MainSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, setUserRole } = useUser();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: User, label: "My Page", path: "/my-page" },
    { icon: TrendingUp, label: "Popular", path: "/popular" },
    { icon: Bookmark, label: "Saved", path: "/saved" },
  ];

  const toggleRole = () => {
    if (userRole === 'student') {
      setUserRole('professor');
    } else if (userRole === 'professor') {
      setUserRole('admin');
    } else {
      setUserRole('student');
    }
  };

  return (
    <>
      {/* Mobile menu trigger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <aside className={`
        w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 p-6 
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        z-40
        animate-fade-in
      `}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-md"></div>
          <h1 className="text-xl font-semibold">NEUQuery</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-secondary hover:text-primary transition-colors duration-200"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Role Toggle - for demonstration */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-600 mb-2">
              Currently viewing as: <span className="font-semibold">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
            </p>
            <Button 
              onClick={toggleRole} 
              className="flex items-center space-x-2"
              variant="outline"
            >
              <UserCog size={16} />
              <span>Switch Role</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;