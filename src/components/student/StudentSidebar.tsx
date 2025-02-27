import { HelpCircle, Book, Megaphone, Clock, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { AddTopicDialog } from "../AddTopicDialog";
import { Button } from "../ui/button";

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    document.addEventListener('toggleSecondarySidebar', handleToggle);
    return () => document.removeEventListener('toggleSecondarySidebar', handleToggle);
  }, []);

  const sections = [
    { icon: HelpCircle, label: "FAQ" },
    { icon: Book, label: "Instructions" },
    { icon: Megaphone, label: "Organization" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement actual search functionality
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Reset the search field
      setSearchQuery("");
    }
  };

  return (
    <aside 
      className={`
        w-64 h-screen bg-white border-l border-gray-200 fixed right-0 top-0 p-6 
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        z-30
      `}
    >
      <div className="mb-8">
        <AddTopicDialog />
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search FAQs or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <Button type="submit" className="sr-only">Search</Button>
        </form>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.label}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-secondary cursor-pointer transition-colors duration-200"
          >
            <section.icon size={20} />
            <span>{section.label}</span>
          </div>
        ))}

        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4 text-gray-900">Last Visited</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-secondary/50"
              >
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">Topic {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;