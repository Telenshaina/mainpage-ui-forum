
import { useState } from "react";
import { Button } from "../ui/button";
import { 
  MessageSquare, 
  ThumbsUp, 
  Filter, 
  Search, 
  CheckCircle, 
  Flag, 
  UserCheck,
  Shield,
  Trash2,
  Edit
} from "lucide-react";
import { toast } from "../../hooks/use-toast";

const TopicCard = ({ 
  title, 
  description, 
  image, 
  comments, 
  likes, 
  isProfessorVerified,
  isFlagged,
  author
}: {
  title: string;
  description: string;
  image: string;
  comments: number;
  likes: number;
  isProfessorVerified?: boolean;
  isFlagged?: boolean;
  author: string;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVerified, setIsVerified] = useState(isProfessorVerified);
  const [flagged, setFlagged] = useState(isFlagged);
  
  const handleVerify = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVerified(!isVerified);
    toast({
      title: isVerified ? "Verification Removed" : "Topic Verified",
      description: isVerified 
        ? "You've removed the verification badge from this topic." 
        : "You've verified this topic as accurate.",
    });
  };

  const handleFlag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlagged(!flagged);
    toast({
      title: flagged ? "Flag Removed" : "Topic Flagged",
      description: flagged 
        ? "You've removed the flag from this topic." 
        : "You've flagged this topic for review.",
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Topic Removed",
      description: "The topic has been removed from the platform.",
    });
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button 
            size="sm"
            variant={isVerified ? "default" : "outline"}
            className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
            onClick={handleVerify}
          >
            <CheckCircle size={14} className="mr-1" />
            {isVerified ? "Verified" : "Verify"}
          </Button>

          <Button 
            size="sm"
            variant={flagged ? "default" : "outline"}
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
            onClick={handleFlag}
          >
            <Flag size={14} className="mr-1" />
            {flagged ? "Flagged" : "Flag"}
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit size={16} className="text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleRemove}>
              <Trash2 size={16} className="text-red-500" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
          <UserCheck size={14} />
          <span>By: {author}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MessageSquare size={16} />
              <span>{comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp size={16} />
              <span>{likes}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-primary"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminTopicGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const topics = [
    {
      title: "Getting Started with React",
      description: "Tips and tricks for beginners learning React development",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      comments: 15,
      likes: 42,
      isProfessorVerified: true,
      isFlagged: false,
      author: "John Smith",
      tags: ["programming", "frontend"]
    },
    {
      title: "Web Design Trends 2024",
      description: "Discussion about the latest trends in web design",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      comments: 8,
      likes: 24,
      isProfessorVerified: false,
      isFlagged: true,
      author: "Jessica Lee",
      tags: ["design", "trends"]
    },
    {
      title: "UI/UX Best Practices",
      description: "Share your experience and learn from others about UI/UX design",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      comments: 32,
      likes: 87,
      isProfessorVerified: true,
      isFlagged: false,
      author: "Mike Johnson",
      tags: ["design", "ux"]
    },
    {
      title: "Database Architecture for Web Apps",
      description: "Learn how to structure databases for scalable web applications",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
      comments: 12,
      likes: 35,
      isProfessorVerified: false,
      isFlagged: true,
      author: "Sarah Williams",
      tags: ["database", "backend"]
    },
    {
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts for beginners",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      comments: 22,
      likes: 56,
      isProfessorVerified: true,
      isFlagged: false,
      author: "David Chen",
      tags: ["ai", "programming"]
    },
    {
      title: "Mobile App Development Strategies",
      description: "Strategies for developing cross-platform mobile applications",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      comments: 9,
      likes: 28,
      isProfessorVerified: false,
      isFlagged: false,
      author: "Jennifer Kim",
      tags: ["mobile", "programming"]
    },
  ];

  const filters = ["All", "Verified", "Unverified", "Flagged", "Most Discussed", "Most Liked"];

  // Filter and search topics
  const filteredTopics = topics.filter(topic => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    let matchesFilter = true;
    if (activeFilter === "Verified") {
      matchesFilter = topic.isProfessorVerified === true;
    } else if (activeFilter === "Unverified") {
      matchesFilter = topic.isProfessorVerified === false;
    } else if (activeFilter === "Flagged") {
      matchesFilter = topic.isFlagged === true;
    } else if (activeFilter === "Most Discussed") {
      matchesFilter = topic.comments > 10;
    } else if (activeFilter === "Most Liked") {
      matchesFilter = topic.likes > 30;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-gray-50 rounded-lg">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search topics, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
              className="flex items-center space-x-1"
            >
              {filter === "All" && activeFilter !== "All" && <Filter size={14} />}
              {filter === "Flagged" && <Flag size={14} className="mr-1 text-red-500" />}
              <span>{filter}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, index) => (
            <TopicCard 
              key={index} 
              {...topic} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No topics found matching your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setActiveFilter(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopicGrid;