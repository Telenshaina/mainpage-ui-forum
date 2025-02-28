import { 
    Users, Shield, Grid, Folder, Flag, Trash2, MessageSquare, 
    AlertCircle, Search, Megaphone, Clock 
} from "lucide-react";
import { useState, useEffect } from "react";
import { AddTopicDialog } from "../AddTopicDialog";
import { Button } from "../ui/button";
import { UserManagement } from "./UserManagement";
import { ForumManagement } from "./ForumManagement";
import { toast } from "../../hooks/use-toast";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeDialog, setActiveDialog] = useState<"user" | "forum" | null>(null);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        document.addEventListener('toggleSecondarySidebar', handleToggle);
        return () => document.removeEventListener('toggleSecondarySidebar', handleToggle);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            setSearchQuery("");
        }
    };

    const openUserManagement = () => {
        setActiveDialog("user");
        toast({ title: "User Management", description: "Opening user management panel" });
    };

    const openForumManagement = () => {
        setActiveDialog("forum");
        toast({ title: "Forum Management", description: "Opening forum management panel" });
    };

    const closeDialog = () => {
        setActiveDialog(null);
    };

    return (
        <>
            {/* Main Sidebar */}
            <aside 
                className={`w-64 h-screen bg-white border-l border-gray-200 fixed right-0 top-0 p-6 
                transition-transform duration-300 ease-in-out
                lg:translate-x-0 flex flex-col
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                z-30`}
            >
                <div className="mb-8">
                    <AddTopicDialog />
                </div>

                {/* Search Box */}
                <div className="mb-6">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search users, posts, flags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <Button type="submit" className="sr-only">Search</Button>
                    </form>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="space-y-6">
                        <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                            onClick={openUserManagement}
                        >
                            <Users size={16} className="mr-2 text-indigo-600" />
                            <span>Manage User Roles</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                            onClick={openForumManagement}
                        >
                            <Folder size={16} className="mr-2 text-yellow-600" />
                            <span>Forum Management</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Full-Screen Panel for User Management */}
            {activeDialog === "user" && (
                <div 
                    className="fixed inset-0 bg-white z-50 flex flex-col animate-fadeIn"
                >
                    <div className="p-6 flex justify-between items-center border-b">
                        <h2 className="text-2xl font-bold">User Management</h2>
                        <Button variant="ghost" onClick={closeDialog}>✕</Button>
                    </div>
                    <div className="p-6 flex-1 overflow-auto">
                        <UserManagement />
                    </div>
                </div>
            )}

            {/* Full-Screen Panel for Forum Management */}
            {activeDialog === "forum" && (
                <div 
                    className="fixed inset-0 bg-white z-50 flex flex-col animate-fadeIn"
                >
                    <div className="p-6 flex justify-between items-center border-b">
                        <h2 className="text-2xl font-bold">Forum Management</h2>
                        <Button variant="ghost" onClick={closeDialog}>✕</Button>
                    </div>
                    <div className="p-6 flex-1 overflow-auto">
                        <ForumManagement />
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSidebar;
