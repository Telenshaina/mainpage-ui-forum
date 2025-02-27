import { PlusCircle } from "lucide-react";
import MainSidebar from "../../components/MainSidebar";
import ProfessorSidebar from "../../components/professor/ProfessorSidebar.tsx";
import ProfessorTopicGrid from "../../components/professor/ProfessorTopicGrid";
import ProfessorPostView from "../../components/professor/ProfessorPostView";

const ProfessorPage = () => {
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
            <h2 className="text-2xl font-semibold text-gray-900">Professor Dashboard</h2>
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <ProfessorTopicGrid />
          <ProfessorPostView />
        </div>
      </main>
      <ProfessorSidebar />
    </div>
  );
};

export default ProfessorPage;