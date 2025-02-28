import { PlusCircle } from "lucide-react";
import MainSidebar from "../../components/MainSidebar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopicGrid from "../../components/admin/AdminTopicGrid";
import AdminPostView from "../../components/admin/AdminPostView";
import { useState } from "react";

const AdminPage = () => {
  const [activeView, setActiveView] = useState<"topics" | "posts">("topics");

  return (
    <div className="min-h-screen bg-white">
      <MainSidebar />
      {/* Mobile Secondary Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => document.dispatchEvent(new CustomEvent('toggleSecondarySidebar'))}
      >
        <PlusCircle size={24} className="text-primary" />
      </button>
      <main className="lg:ml-64 lg:mr-64 md:mx-0 min-h-screen animate-fade-in">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveView("topics")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === "topics" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Topics
              </button>
              <button
                onClick={() => setActiveView("posts")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === "posts" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Posts
              </button>
            </div>
          </div>
          
          {activeView === "topics" && <AdminTopicGrid />}
          {activeView === "posts" && <AdminPostView />}
        </div>
      </main>
      <AdminSidebar />
    </div>
  );
};

export default AdminPage;