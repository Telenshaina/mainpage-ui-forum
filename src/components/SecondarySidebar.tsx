import { HelpCircle, Book, Megaphone, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { AddTopicDialog } from "./AddTopicDialog";

const SecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("Rendering SecondarySidebar, isOpen:", isOpen); // Debug log

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

export default SecondarySidebar;